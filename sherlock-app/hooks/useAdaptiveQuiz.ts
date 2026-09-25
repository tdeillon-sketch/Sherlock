// ═══════════════════════════════════════════════════════════════
//  USE ADAPTIVE QUIZ V3 — moteur par pages
//
//  Flow :
//   1. select_subject   → 'enfant' (un seul test, 10 ans et plus) | 'self' | proche
//   2. questions        → pages séquentielles :
//        a. Likert 1   (5 sliders -5..+5, types 1/3/5/7/9)
//        b. Likert 2   (5 sliders, types 2/4/6/8 + deeper)
//        c. Budget 3+  (5 steppers, 10 pts absolus, adaptatif)
//        d. Final      (3 steppers, 6 pts — si top1/top2 proches)
//        e. Wing       (2 sliders — détermine l'aile du top)
//   4. result
//
//  Le wing est géré comme une page interne (pas une phase séparée).
// ═══════════════════════════════════════════════════════════════

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  AgeBand, EnneaType, TypeWeights, QuizSubject, Statement, WingStatement,
  TYPES, getStatements, getWings, statementsByType, findStmt, pickStatement,
  gridTypeWeights,
} from '../constants/quiz_v3';
import {
  auth, loadChildProfiles, updateChildProfiles, getUserData, saveSecondOpinion, onAuthChange,
  type ChildProfile, type ChildProfileEntry,
} from '../constants/firebase';

// Re-export for legacy imports
export type { AgeBand, EnneaType, QuizSubject } from '../constants/quiz_v3';

// ── Phases (même shape que v2) ────────────────────────────────────
export type AdaptivePhase =
  | 'select_subject'
  | 'proche_mode'       // sous-choix "un proche" : il répond / je le décris
  | 'questions'
  | 'result'
  | 'save_profile'
  | 'history'
  | 'second_intro'      // "second avis" : passe le tél à un proche
  | 'second_questions'  // round court (pool observé, types candidats)
  | 'second_result'     // accord / divergence
  | 'cross_intro'       // "regard croisé" : l'autre parent refait le test de l'enfant
  | 'cross_result';     // comparaison des deux regards + résultat combiné

// ── Page types ────────────────────────────────────────────────────
export interface LikertPage {
  kind: 'likert';
  stmtIds: string[];
  responses: Record<string, number>;  // -5..+5, default 0
}
export interface BudgetPage {
  kind: 'budget';
  stmtIds: string[];
  responses: Record<string, number>;
  budget: number;  // 10
}
export interface FinalPage {
  kind: 'final';
  stmtIds: string[];
  responses: Record<string, number>;
  budget: number;  // 6
}
export interface WingPage {
  kind: 'wing';
  stmtIds: string[];  // 2 statement ids, one per possible wing
  responses: Record<string, number>;
  topType: EnneaType;
  wings: [EnneaType, EnneaType];
  /** stmtId → the wing it stands for (dedicated wing statements, or a main-
   *  pool statement of the wing type when a band has no wing statements). */
  stmtWing: Record<string, EnneaType>;
}
/** 2D "compass": a point placed on a 3×3 grid (see GRID_CELLS in quiz_v3). */
export interface GridPage {
  kind: 'grid';
  stmtIds: string[];                 // always empty
  responses: Record<string, number>; // always empty
  point: { x: number; y: number } | null;  // 0..1, null until moved
  skipped: boolean;                  // "Je ne sais pas": no contribution
}
export type Page = LikertPage | BudgetPage | FinalPage | WingPage | GridPage;

// ── Résultat ──────────────────────────────────────────────────────
// Insight is emitted as a locale-agnostic KIND (not a pre-built sentence) so
// the UI (QuizResult) can render it in the active language via i18n keys.
export type InsightKind = 'composite' | 'wingMarked' | 'closeSecond' | 'clear' | 'veryMarked';

export interface AdaptiveResult {
  topType: EnneaType;
  topPercent: number;
  secondType: EnneaType;
  secondPercent: number;
  thirdType: EnneaType;
  thirdPercent: number;
  wingType: EnneaType;          // always set: one of the two neighbours of topType
  wingCertainty: number;        // 0..100, how clearly the answers point to that wing
  confidence: number;           // 0..100
  insightKind: InsightKind;
  allScores: { type: EnneaType; score: number; percent: number }[];
  /** true when the result combines two parents' views ("regard croisé") */
  combined?: boolean;
}

/** "Regard croisé": average the two parents' profiles (each normalised to
 *  its own positive total, so a parent who answers "loudly" doesn't weigh
 *  more). The wing: the one both chose, else the one of the parent whose
 *  type matches the combined type, else the neighbour that scores higher. */
export function combineResults(a: AdaptiveResult, b: AdaptiveResult): AdaptiveResult {
  // Unrounded shares (0..100) of each parent's positive total.
  const share = (r: AdaptiveResult, t: EnneaType) => {
    const pos = r.allScores.reduce((s, x) => s + Math.max(0, x.score), 0) || 1;
    return (100 * Math.max(0, r.allScores.find(s => s.type === t)?.score ?? 0)) / pos;
  };
  const types = [1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneaType[];
  const avg: Record<number, number> = {};
  types.forEach(t => { avg[t] = (share(a, t) + share(b, t)) / 2; });
  const agree = a.topType === b.topType;
  // On an exact tie, the type both parents found wins.
  const sorted = [...types].sort((x, y) =>
    (avg[y] - avg[x]) || (agree && x === a.topType ? -1 : agree && y === a.topType ? 1 : x - y));
  const total = types.reduce((s, t) => s + avg[t], 0) || 1;
  const allScores = sorted.map(t => ({ type: t, score: avg[t], percent: Math.round((avg[t] / total) * 100) }));
  const [t1, t2, t3] = sorted;
  const wings = TYPES[t1].wing as [EnneaType, EnneaType];
  let wingType: EnneaType;
  let wingCertainty: number;
  if (a.topType === t1 && b.topType === t1 && a.wingType === b.wingType) {
    wingType = a.wingType; wingCertainty = Math.round((a.wingCertainty + b.wingCertainty) / 2);
  } else if (a.topType === t1 && b.topType !== t1) {
    wingType = a.wingType; wingCertainty = Math.min(a.wingCertainty, 50);
  } else if (b.topType === t1 && a.topType !== t1) {
    wingType = b.wingType; wingCertainty = Math.min(b.wingCertainty, 50);
  } else {
    wingType = avg[wings[1]] > avg[wings[0]] ? wings[1] : wings[0]; wingCertainty = 20;
  }
  const confidence = Math.round(((a.confidence + b.confidence) / 2) * (agree ? 1 : 0.7));
  // Same thresholds as a single test's reading.
  let insightKind: InsightKind;
  if (confidence < 30) insightKind = 'composite';
  else if (!agree || confidence < 55) {
    insightKind = agree && t2 === wingType && wingCertainty >= WING_SURE_MIN ? 'wingMarked' : 'closeSecond';
  } else if (confidence < 75) insightKind = 'clear';
  else insightKind = 'veryMarked';
  return {
    topType: t1, topPercent: allScores[0].percent,
    secondType: t2, secondPercent: allScores[1].percent,
    thirdType: t3, thirdPercent: allScores[2].percent,
    wingType, wingCertainty, confidence,
    insightKind,
    allScores,
    combined: true,
  };
}

// ── Second avis (regard d'un proche sur le résultat "self") ────────
export interface SecondOpinionResult {
  selfTop: EnneaType;
  observerTop: EnneaType;
  agree: boolean;
  /** false when the close person left every answer neutral or negative:
   *  there is nothing to compare (not saved, neutral copy shown). */
  observerAnswered: boolean;
  candidates: { type: EnneaType; selfPercent: number; obsPercent: number }[];
}

/** What the second opinion is compared against: your self result, either
 *  the one just computed or the last one saved to your account. */
interface SecondSeed {
  selfTop: EnneaType;
  cands: EnneaType[];                     // your top 3 types
  selfScores: Record<number, number>;     // your raw scores per type
  selfQuizAt: string | null;
}

// ── Constantes ────────────────────────────────────────────────────
const MIN_PAGES = 3;
const MAX_PAGES = 5;
const TIEBREAK_GAP = 0.20;
const EARLY_STOP_PCT = 85;

const LIKERT_MULT = 0.3;
const BUDGET_WEIGHT = 0.3;
const FINAL_WEIGHT = 0.4;
// The grid counts a bit more than one strong (+5) Likert answer, spread over
// the cell under the point and its neighbours: about 20% of the winner's
// score in simulation. It can break a near tie, not overturn a clear lead.
// (Simulated best value: 1.5 was too discreet, 3.5 hurts when the point is
// placed approximately.)
const GRID_WEIGHT = 2.5;

const EMPTY_SCORES = (): Record<EnneaType, number> => ({
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
});

// ═══════════════════════════════════════════════════════════════
//  SCORING
// ═══════════════════════════════════════════════════════════════

function recomputeScoresFromPages(pages: Page[], ageBand: AgeBand, includeGrid = true): Record<EnneaType, number> {
  const scores = EMPTY_SCORES();
  for (const page of pages) {
    if (page.kind === 'wing') continue; // wings don't affect main scoring
    if (page.kind === 'grid') {
      if (includeGrid && page.point && !page.skipped) {
        const w = gridTypeWeights(page.point.x, page.point.y);
        for (let t = 1; t <= 9; t++) scores[t as EnneaType] += GRID_WEIGHT * w[t as EnneaType];
      }
      continue;
    }
    const mult = page.kind === 'likert' ? LIKERT_MULT
               : page.kind === 'final'  ? FINAL_WEIGHT
               : BUDGET_WEIGHT;
    for (const sid of page.stmtIds) {
      const v = page.responses[sid] ?? 0;
      if (v === 0) continue;
      const stmt = getStatements(ageBand).find(s => s.id === sid);
      if (!stmt) continue;
      scores[stmt.t] += v * mult;
    }
  }
  // Clamp to >= 0 once at the end (not inside the loop) so the total is
  // order-independent: a negative answer on an early page no longer silently
  // erases a later positive one for the same type.
  for (let t = 1; t <= 9; t++) {
    const k = t as EnneaType;
    if (scores[k] < 0) scores[k] = 0;
  }
  return scores;
}

// ═══════════════════════════════════════════════════════════════
//  CONFIDENCE
// ═══════════════════════════════════════════════════════════════

function sortedTypes(scores: Record<EnneaType, number>) {
  return (Object.keys(scores) as unknown as string[])
    .map(k => ({ type: Number(k) as EnneaType, score: scores[Number(k) as EnneaType] }))
    .sort((a, b) => b.score - a.score);
}

/** Same order, but ties are broken at random. Used only to BUILD pages: a
 *  stable sort over keys 1..9 used to favour low (odd) type numbers. */
function sortedTypesRandomTies(scores: Record<EnneaType, number>) {
  const jitter: Record<number, number> = {};
  for (let t = 1; t <= 9; t++) jitter[t] = Math.random();
  return sortedTypes(scores).sort((a, b) => (b.score - a.score) || (jitter[a.type] - jitter[b.type]));
}

function shuffled<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Answers that carry signal: non-zero statement answers (wing pages excluded,
 *  they don't feed the type score) + 1 for a placed grid point. The same
 *  count drives early stop and the displayed confidence. */
function countAnswered(pages: Page[]): number {
  let n = 0;
  for (const p of pages) {
    if (p.kind === 'wing') continue;
    if (p.kind === 'grid') { if (p.point && !p.skipped) n += 1; continue; }
    n += Object.values(p.responses).filter(v => v !== 0).length;
  }
  return n;
}

function computeConfidenceData(scores: Record<EnneaType, number>, answered: number) {
  const sorted = sortedTypes(scores);
  const totalPos = sorted.filter(s => s.score > 0).reduce((a, b) => a + b.score, 0);
  if (answered === 0 || totalPos === 0) {
    return { pct: 0, top: null as EnneaType | null, top2: null as EnneaType | null, sorted, gap: 0, dominance: 0 };
  }
  const [t1, t2] = sorted;
  const dominance = t1.score / totalPos;
  const gap = (t1.score - t2.score) / Math.max(t1.score, 0.001);
  const volume = Math.min(1, answered / 15);
  const zeroOrNeg = sorted.filter(s => s.score <= 0).length;
  const coveragePenalty = 1 - Math.max(0, zeroOrNeg - 4) * 0.05;
  const raw = (Math.min(1, dominance / 0.45) * 0.55 + Math.min(1, gap / 0.55) * 0.45) * volume * coveragePenalty;
  return {
    pct: Math.min(95, Math.round(raw * 100)),
    top: t1.type, top2: t2.type, sorted, gap, dominance,
  };
}

// ═══════════════════════════════════════════════════════════════
//  ADAPTIVE PAGE BUILDER
// ═══════════════════════════════════════════════════════════════

function pickStmtId(type: EnneaType, ageBand: AgeBand, used: Set<string>): string | null {
  const pool = statementsByType(type, ageBand).filter(s => !used.has(s.id));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)].id;
}

function buildLikertForTypes(types: EnneaType[], ageBand: AgeBand, used: Set<string>): LikertPage {
  const ids: string[] = [];
  for (const t of types) {
    const id = pickStmtId(t, ageBand, used);
    if (id) { ids.push(id); used.add(id); }
  }
  const responses: Record<string, number> = {};
  ids.forEach(id => { responses[id] = 0; });
  return { kind: 'likert', stmtIds: ids, responses };
}

function buildLikertPage1(ageBand: AgeBand, used: Set<string>): LikertPage {
  const ids: string[] = [];
  for (const t of [1, 3, 5, 7, 9] as EnneaType[]) {
    const id = pickStmtId(t, ageBand, used);
    if (id) { ids.push(id); used.add(id); }
  }
  const responses: Record<string, number> = {};
  ids.forEach(id => { responses[id] = 0; });
  return { kind: 'likert', stmtIds: ids, responses };
}

function buildLikertPage2(ageBand: AgeBand, _scores: Record<EnneaType, number>, used: Set<string>): LikertPage {
  // One statement per even type. (There used to be an extra "deeper" item
  // for the leader after page 1, but only odd types could lead at that point,
  // which gave odd types a systematic head start.)
  const ids: string[] = [];
  for (const t of [2, 4, 6, 8] as EnneaType[]) {
    const id = pickStmtId(t, ageBand, used);
    if (id) { ids.push(id); used.add(id); }
  }
  const responses: Record<string, number> = {};
  ids.forEach(id => { responses[id] = 0; });
  return { kind: 'likert', stmtIds: ids, responses };
}

function buildBudgetPage(
  ageBand: AgeBand,
  scores: Record<EnneaType, number>,
  used: Set<string>,
): BudgetPage {
  const sorted = sortedTypesRandomTies(scores);
  const topTypes = sorted.slice(0, 4).filter(s => s.score > 0.1).map(s => s.type);
  const ids: string[] = [];
  // Pick 1 from each of top 3
  for (const t of topTypes.slice(0, 3)) {
    const id = pickStmtId(t, ageBand, used);
    if (id) { ids.push(id); used.add(id); }
  }
  // 1 emerging (outside top 3 but with positive signal)
  const emerging = sorted.find(s => !topTypes.slice(0, 3).includes(s.type) && s.score > 0.2);
  if (emerging) {
    const id = pickStmtId(emerging.type, ageBand, used);
    if (id) { ids.push(id); used.add(id); }
  }
  // Fill up to 5 with any type still missing signal (random order: the old
  // fixed 1..9 order always filled with the lowest type numbers)
  const allTypes: EnneaType[] = shuffled([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneaType[]);
  while (ids.length < 5) {
    const missing = allTypes.find(t =>
      !ids.some(id => {
        const stmt = getStatements(ageBand).find(s => s.id === id);
        return stmt?.t === t;
      })
      && statementsByType(t, ageBand).some(s => !used.has(s.id))
    );
    if (!missing) break;
    const id = pickStmtId(missing, ageBand, used);
    if (id) { ids.push(id); used.add(id); }
    else break;
  }
  const responses: Record<string, number> = {};
  ids.forEach(id => { responses[id] = 0; });
  return { kind: 'budget', stmtIds: ids, responses, budget: 10 };
}

function buildFinalPage(
  ageBand: AgeBand,
  scores: Record<EnneaType, number>,
  used: Set<string>,
): FinalPage {
  // Built when the top two are close: two fresh statements for EACH of the
  // top two (the confusion to resolve), plus the third only if it is close too.
  const sorted = sortedTypesRandomTies(scores).filter(s => s.score > 0);
  const [a, b, c] = sorted;
  const plan: EnneaType[] = [];
  if (a) plan.push(a.type, a.type);
  if (b) plan.push(b.type, b.type);
  if (c && b && c.score >= b.score * 0.8) plan.push(c.type);
  const ids: string[] = [];
  for (const t of plan) {
    const id = pickStmtId(t, ageBand, used);
    if (id) { ids.push(id); used.add(id); }
  }
  const order = shuffled(ids);
  const responses: Record<string, number> = {};
  order.forEach(id => { responses[id] = 0; });
  return { kind: 'final', stmtIds: order, responses, budget: 6 };
}

/** The last page: once the type is known, only its two neighbours can be
 *  its wing. Uses the band's dedicated wing statements ("a {top} coloured by
 *  {wing}"); if a band lacks one, both items come from the main pool of the
 *  two wing types so the pair stays comparable. Always returns 2 items. */
function buildWingPage(ageBand: AgeBand, topType: EnneaType, used: Set<string> = new Set()): WingPage {
  const wings = TYPES[topType].wing as [EnneaType, EnneaType];
  const wingStmts = getWings(ageBand);
  const s1 = wingStmts.find(w => w.wingOf === topType && w.wingType === wings[0]);
  const s2 = wingStmts.find(w => w.wingOf === topType && w.wingType === wings[1]);
  const stmtWing: Record<string, EnneaType> = {};
  let ids: string[];
  if (s1 && s2) {
    ids = [s1.id, s2.id];
    stmtWing[s1.id] = wings[0];
    stmtWing[s2.id] = wings[1];
  } else {
    ids = [];
    for (const w of wings) {
      const id = pickStmtId(w, ageBand, used) ?? statementsByType(w, ageBand)[0]?.id;
      if (id) { ids.push(id); stmtWing[id] = w; }
    }
  }
  const order = shuffled(ids);
  const responses: Record<string, number> = {};
  order.forEach(id => { responses[id] = 0; });
  return { kind: 'wing', stmtIds: order, responses, topType, wings, stmtWing };
}

function buildGridPage(): GridPage {
  return { kind: 'grid', stmtIds: [], responses: {}, point: null, skipped: false };
}

/**
 * "Second avis" — a SHORT observer round on the self-result's candidate types.
 * Two likert pages, one observed-adult statement per candidate type each.
 * Always uses the 'adulte-obs' pool (a close person rating statements about you).
 */
function buildSecondOpinionPages(candidates: EnneaType[]): LikertPage[] {
  const used = new Set<string>();
  const pages: LikertPage[] = [];
  for (let p = 0; p < 2; p++) {
    const ids: string[] = [];
    for (const t of candidates) {
      const id = pickStmtId(t, 'adulte-obs', used);
      if (id) { ids.push(id); used.add(id); }
    }
    const responses: Record<string, number> = {};
    ids.forEach(id => { responses[id] = 0; });
    pages.push({ kind: 'likert', stmtIds: ids, responses });
  }
  return pages;
}

/**
 * A budget/final page is only completable if its budget can actually be spent:
 * the user must reach Σ|v| === budget, and each statement caps at a per-page max
 * (mirrors BudgetStepperPage: 5 for budget, 6 for final). If the statement pool
 * ran dry and the page can't reach its budget, it would dead-end the quiz
 * (the "Next" button stays disabled forever). Likert/wing pages are always OK
 * (0 = "no opinion" is a valid answer).
 */
function isAnswerable(page: Page): boolean {
  if (page.kind === 'likert' || page.kind === 'wing' || page.kind === 'grid') return true;
  const perStmtMax = page.kind === 'final' ? 6 : 5;
  return page.stmtIds.length > 0 && page.stmtIds.length * perStmtMax >= page.budget;
}

/** Decide and build the next page. Returns null if quiz is done. */
function buildNextPage(
  pages: Page[],
  ageBand: AgeBand,
  scores: Record<EnneaType, number>,
): Page | null {
  // Statement pages only: the grid and the wing don't count toward the page
  // limits (MIN_PAGES / MAX_PAGES keep their meaning).
  const mainPages = pages.filter(p => p.kind !== 'wing' && p.kind !== 'grid');
  const hasWing = pages.some(p => p.kind === 'wing');
  const hasGrid = pages.some(p => p.kind === 'grid');
  const hasFinal = pages.some(p => p.kind === 'final');
  const pageIdx = mainPages.length;

  // Collect used ids
  const used = new Set<string>(pages.flatMap(p => p.stmtIds));

  // After wing page, we're done
  if (hasWing) return null;

  // Observed-adult mode ('adulte-obs'): 3 lighter intro pages (triplets of 3)
  // instead of 2 dense pages of 5, because the observed statements are longer.
  if (ageBand === 'adulte-obs') {
    const triplets: EnneaType[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    if (pageIdx < triplets.length) return buildLikertForTypes(triplets[pageIdx], ageBand, used);
  }

  // The compass (2D grid) right after the intro statements, before the
  // adaptive pages, so the budget page's top-3 already benefits from it.
  if (!hasGrid && pageIdx === (ageBand === 'adulte-obs' ? 3 : 2)) return buildGridPage();

  // Page 0 : Likert 1
  if (pageIdx === 0) return buildLikertPage1(ageBand, used);
  // Page 1 : Likert 2
  if (pageIdx === 1) return buildLikertPage2(ageBand, scores, used);

  // Adaptive budget pages.
  // Count NON-ZERO answers (not total slots) so the early-stop confidence uses
  // the same metric as the displayed result confidence in computeResult.
  const answered = countAnswered(pages);
  const c = computeConfidenceData(scores, answered);
  const atMax = pageIdx >= MAX_PAGES - 1; // -1 because we'll still add wing
  // Every run ends on the wing page (even with little signal: the leader
  // then comes from the scores as they are).
  const goToWing = (): WingPage => buildWingPage(ageBand, c.top ?? c.sorted[0].type, used);

  // Early stop: high confidence AND min pages → go to wing
  if (pageIdx >= MIN_PAGES && c.pct >= EARLY_STOP_PCT) {
    return goToWing();
  }

  // Respect the page cap BEFORE anything else can append more pages.
  // (Previously the tie-break below ran first and could loop indefinitely,
  //  generating "final" pages until the statement pool ran dry and the quiz
  //  dead-ended.)
  if (atMax) {
    return goToWing();
  }

  // If top1/top2 are close, do ONE final departage page (like the wing, it's a
  // single terminal-ish step). The `!hasFinal` guard prevents the old infinite
  // loop of repeated departage pages.
  if (pageIdx >= 3 && c.gap < TIEBREAK_GAP && c.top && !hasFinal) {
    const finalPage = buildFinalPage(ageBand, scores, used);
    // If the pool is too depleted to build a completable final page, skip it.
    return isAnswerable(finalPage) ? finalPage : goToWing();
  }

  // Otherwise standard budget page (with the same defensive guard).
  const budgetPage = buildBudgetPage(ageBand, scores, used);
  return isAnswerable(budgetPage) ? budgetPage : goToWing();
}

// ═══════════════════════════════════════════════════════════════
//  WING DETECTION
// ═══════════════════════════════════════════════════════════════

/** Below this certainty the wing is shown as "probable". */
export const WING_SURE_MIN = 35;

/** Always returns one of the two neighbours of `top`.
 *  The statement rated higher on the wing page wins (as the page promises).
 *  Certainty blends that answer with how each wing type scored in the main
 *  quiz: s(w) = 0.75 × answer (−1..1) + 0.25 × score relative to top. When
 *  the main quiz disagrees with the answer, certainty drops to 0. */
function computeWing(
  pages: Page[],
  top: EnneaType,
  scores: Record<EnneaType, number>,
): { wing: EnneaType; certainty: number } {
  const wings = TYPES[top].wing as [EnneaType, EnneaType];
  const wingPage = pages.find(p => p.kind === 'wing' && p.topType === top) as WingPage | undefined;
  const answerOf = (w: EnneaType) => {
    if (!wingPage) return 0;
    const id = Object.keys(wingPage.stmtWing ?? {}).find(k => wingPage.stmtWing[k] === w);
    return id ? (wingPage.responses[id] ?? 0) / 5 : 0;
  };
  const prior = (w: EnneaType) => Math.min(1, Math.max(0, scores[w]) / Math.max(scores[top], 0.001));
  const s = (w: EnneaType) => 0.75 * answerOf(w) + 0.25 * prior(w);
  const [w1, w2] = wings;
  const a1 = answerOf(w1), a2 = answerOf(w2);
  const s1 = s(w1), s2 = s(w2);
  let wing: EnneaType;
  if (a1 !== a2) wing = a1 > a2 ? w1 : w2;
  else if (s1 !== s2) wing = s1 > s2 ? w1 : w2;
  else wing = scores[w2] > scores[w1] ? w2 : w1;
  const other = wing === w1 ? w2 : w1;
  const certainty = Math.max(0, Math.min(100, Math.round((100 * (s(wing) - s(other))) / 0.75)));
  return { wing, certainty };
}

// ═══════════════════════════════════════════════════════════════
//  RESULT BUILDER
// ═══════════════════════════════════════════════════════════════

function computeResult(scores: Record<EnneaType, number>, pages: Page[], ageBand: AgeBand): AdaptiveResult {
  const answered = countAnswered(pages);
  const c = computeConfidenceData(scores, answered);
  const sorted = c.sorted;
  const totalPos = sorted.filter(s => s.score > 0).reduce((a, b) => a + b.score, 0) || 1;

  const allScores = sorted.map(s => ({
    type: s.type,
    score: s.score,
    percent: Math.round((Math.max(0, s.score) / totalPos) * 100),
  }));

  const [t1, t2, t3] = sorted;
  const top = t1.type;
  const wingInfo = computeWing(pages, top, scores);

  // Locale-agnostic insight kind — the UI turns this into a localized sentence.
  let insightKind: InsightKind;
  if (c.pct < 30) {
    insightKind = 'composite';
  } else if (c.pct < 55) {
    insightKind = t2.type === wingInfo.wing && wingInfo.certainty >= WING_SURE_MIN ? 'wingMarked' : 'closeSecond';
  } else if (c.pct < 75) {
    insightKind = 'clear';
  } else {
    insightKind = 'veryMarked';
  }

  return {
    topType: t1.type, topPercent: Math.round((Math.max(0, t1.score) / totalPos) * 100),
    secondType: t2.type, secondPercent: Math.round((Math.max(0, t2.score) / totalPos) * 100),
    thirdType: t3.type, thirdPercent: Math.round((Math.max(0, t3.score) / totalPos) * 100),
    wingType: wingInfo.wing,
    wingCertainty: wingInfo.certainty,
    confidence: c.pct,
    insightKind,
    allScores,
  };
}

// ═══════════════════════════════════════════════════════════════
//  HOOK
// ═══════════════════════════════════════════════════════════════

export function useAdaptiveQuiz() {
  const [phase, setPhase] = useState<AdaptivePhase>('select_subject');
  const [subject, setSubject] = useState<QuizSubject | null>(null);
  const [ageBand, setAgeBand] = useState<AgeBand | null>(null);

  const [pages, setPages] = useState<Page[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [result, setResult] = useState<AdaptiveResult | null>(null);

  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [profilesLoaded, setProfilesLoaded] = useState(false);

  // Second avis (regard d'un proche)
  const [secondPages, setSecondPages] = useState<Page[]>([]);
  const [secondPageIndex, setSecondPageIndex] = useState(0);
  const [secondResult, setSecondResult] = useState<SecondOpinionResult | null>(null);
  const [secondSeed, setSecondSeed] = useState<SecondSeed | null>(null);

  // "Regard croisé" (child): the first parent's result, the other parent's
  // test runs next, then both are compared and combined.
  const [crossBase, setCrossBase] = useState<AdaptiveResult | null>(null);
  const [crossOther, setCrossOther] = useState<AdaptiveResult | null>(null);
  const [crossCombined, setCrossCombined] = useState<AdaptiveResult | null>(null);
  // Scores to show / save instead of the live page scores (combined result).
  const [scoresOverride, setScoresOverride] = useState<Record<number, number> | null>(null);
  // Guards against saving the same round twice (double tap on the last page).
  const secondSavedRef = useRef<SecondSeed | null>(null);

  // The family follows the signed-in account: reloaded whenever the uid
  // changes (sign-in to an existing account, sign-out, deletion).
  useEffect(() => onAuthChange((user) => {
    const uid = user?.uid;
    if (!uid) { setChildProfiles([]); setProfilesLoaded(true); return; }
    loadChildProfiles(uid)
      .then(list => { if (auth.currentUser?.uid === uid) setChildProfiles(list); })
      .catch(() => {})
      .finally(() => setProfilesLoaded(true));
  }), []);

  // Compute scores from all pages
  const scores = useMemo(() => {
    if (!ageBand) return EMPTY_SCORES();
    return recomputeScoresFromPages(pages, ageBand);
  }, [pages, ageBand]);

  // What the radar shows: everything, except the grid point WHILE it is being
  // placed (moving it would otherwise reveal which type each area stands
  // for). As soon as the grid page is left, the radar includes it.
  const radarScores = useMemo(() => {
    if (!ageBand) return EMPTY_SCORES();
    if (scoresOverride && phase !== 'questions') return scoresOverride as Record<EnneaType, number>;
    const onGrid = phase === 'questions' && pages[pageIndex]?.kind === 'grid';
    return onGrid ? recomputeScoresFromPages(pages, ageBand, false) : scores;
  }, [pages, pageIndex, ageBand, phase, scores, scoresOverride]);

  const currentPage = pages[pageIndex] ?? null;
  // Statement pages stop at MAX_PAGES - 1, then the grid and the wing.
  const totalPagesEstimate = MAX_PAGES + 1;

  // ── Transitions ──
  const selectSubject = useCallback((s: QuizSubject) => {
    setSubject(s);
    // enfant → one child pool (10+) ; self / proche-self → adult pool (1st
    // person) ; proche-obs → observed pool. The child's exact age is asked
    // only when the profile is saved.
    setAgeBand(s === 'enfant' ? 'enfant' : s === 'proche-obs' ? 'adulte-obs' : 'adulte');
    setPhase('questions');
  }, []);

  // "Un proche" → sous-choix (il répond / je le décris)
  const goToProcheMode = useCallback(() => { setSubject(null); setPhase('proche_mode'); }, []);


  // Init first page when entering 'questions'
  useEffect(() => {
    if (phase === 'questions' && ageBand && pages.length === 0) {
      const firstPage = ageBand === 'adulte-obs'
        ? buildLikertForTypes([1, 2, 3], ageBand, new Set())
        : buildLikertPage1(ageBand, new Set());
      setPages([firstPage]);
      setPageIndex(0);
    }
  }, [phase, ageBand, pages.length]);

  // ── Respond to a statement ──
  const updateResponse = useCallback((stmtId: string, value: number) => {
    setPages(prev => {
      const next = [...prev];
      const page = { ...next[pageIndex] };
      page.responses = { ...page.responses, [stmtId]: value };
      next[pageIndex] = page as Page;
      return next;
    });
  }, [pageIndex]);

  // ── Place the point on the grid page (committed on release) ──
  const updateGridPoint = useCallback((x: number, y: number) => {
    setPages(prev => {
      const next = [...prev];
      const page = next[pageIndex];
      if (!page || page.kind !== 'grid') return prev;
      const r = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 100) / 100;
      next[pageIndex] = { ...page, point: { x: r(x), y: r(y) }, skipped: false };
      return next;
    });
  }, [pageIndex]);

  // "Je ne sais pas" on the grid: no contribution, the quiz goes on.
  const skipGrid = useCallback(() => {
    setPages(prev => {
      const next = [...prev];
      const page = next[pageIndex];
      if (!page || page.kind !== 'grid') return prev;
      next[pageIndex] = { ...page, point: null, skipped: true };
      return next;
    });
  }, [pageIndex]);

  // ── Validate current page and build next ──
  const advancePage = useCallback(() => {
    if (!ageBand || !currentPage) return;
    const leader = sortedTypes(scores)[0].type;

    // Coming back after "Précédent": pages ahead already exist, just move on.
    // A wing page built for another leader (answers changed meanwhile) is
    // rebuilt for the current one before being shown.
    if (pageIndex < pages.length - 1) {
      const ahead = pages[pageIndex + 1];
      if (ahead.kind === 'wing' && ahead.topType !== leader) {
        const used = new Set<string>(pages.filter(p => p !== ahead).flatMap(p => p.stmtIds));
        const rebuilt = buildWingPage(ageBand, leader, used);
        setPages(prev => prev.map((p, i) => (i === pageIndex + 1 ? rebuilt : p)));
      }
      setPageIndex(pageIndex + 1);
      return;
    }

    // On the wing page: finish, unless the leader changed since it was built.
    if (currentPage.kind === 'wing') {
      if (currentPage.topType !== leader) {
        const used = new Set<string>(pages.filter(p => p !== currentPage).flatMap(p => p.stmtIds));
        const rebuilt = buildWingPage(ageBand, leader, used);
        setPages(prev => prev.map((p, i) => (i === pageIndex ? rebuilt : p)));
        return;
      }
      finish(computeResult(scores, pages, ageBand));
      return;
    }

    // Build next page based on updated scores
    const nextPage = buildNextPage(pages, ageBand, scores);
    if (!nextPage) {
      finish(computeResult(scores, pages, ageBand));
      return;
    }
    setPages(prev => [...prev, nextPage]);
    setPageIndex(prev => prev + 1);

    // End of a test: normal result, or the other parent's view to compare.
    function finish(r: AdaptiveResult) {
      if (crossBase) {
        setCrossOther(r);
        setCrossCombined(combineResults(crossBase, r));
        setResult(r);
        setPhase('cross_result');
        return;
      }
      setResult(r);
      setPhase('result');
    }
  }, [ageBand, currentPage, pages, pageIndex, scores, crossBase]);

  // ── Go back one page ──
  const goToPrevPage = useCallback(() => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  }, [pageIndex]);

  // ── Validate current page (same as advancePage, exposed for clarity) ──
  const canAdvance = useMemo(() => {
    if (!currentPage) return false;
    if (currentPage.kind === 'likert') {
      // Always valid — 0 = no opinion, default
      return true;
    }
    if (currentPage.kind === 'wing') {
      // The two wings must be told apart: the two sliders can't be equal.
      const [a, b] = currentPage.stmtIds;
      return (currentPage.responses[a] ?? 0) !== (currentPage.responses[b] ?? 0);
    }
    if (currentPage.kind === 'grid') {
      return !!currentPage.point || currentPage.skipped;
    }
    if (currentPage.kind === 'budget' || currentPage.kind === 'final') {
      // Σ|v| must equal budget
      const used = currentPage.stmtIds.reduce((s, id) => s + Math.abs(currentPage.responses[id] ?? 0), 0);
      return used === currentPage.budget;
    }
    return false;
  }, [currentPage]);

  // ── Reset ──
  const reset = useCallback(() => {
    setPhase('select_subject');
    setSubject(null);
    setAgeBand(null);
    setPages([]);
    setPageIndex(0);
    setResult(null);
    setSecondPages([]);
    setSecondPageIndex(0);
    setSecondResult(null);
    setSecondSeed(null);
    setCrossBase(null);
    setCrossOther(null);
    setCrossCombined(null);
    setScoresOverride(null);
  }, []);

  // ── Regard croisé (child): the other parent takes the same test ──
  const startCross = useCallback(() => {
    if (!result || result.combined) return;
    setCrossBase(result);
    setPhase('cross_intro');
  }, [result]);
  const beginCross = useCallback(() => {
    setPages([]);
    setPageIndex(0);
    setResult(null);
    setScoresOverride(null);
    setPhase('questions');
  }, []);
  const cancelCross = useCallback(() => {
    setCrossBase(null);
    setPhase('result');
  }, []);
  // Leaving the other parent's test halfway: back to the first parent's
  // result (same object, so it is not auto-saved a second time).
  const abortCross = useCallback(() => {
    if (!crossBase) return;
    const sc: Record<number, number> = {};
    crossBase.allScores.forEach(s => { sc[s.type] = s.score; });
    setScoresOverride(sc);
    setResult(crossBase);
    setCrossBase(null);
    setCrossOther(null);
    setCrossCombined(null);
    setPages([]);
    setPageIndex(0);
    setPhase('result');
  }, [crossBase]);
  // Keep the combined view: it becomes the result shown and saved.
  const keepCombined = useCallback(() => {
    if (!crossCombined) return;
    const sc: Record<number, number> = {};
    crossCombined.allScores.forEach(s => { sc[s.type] = s.score; });
    setScoresOverride(sc);
    setResult(crossCombined);
    setCrossBase(null);
    setPhase('save_profile');
  }, [crossCombined]);

  const restartSameSubject = useCallback(() => {
    setPages([]);
    setPageIndex(0);
    setResult(null);
    setCrossBase(null);
    setCrossOther(null);
    setCrossCombined(null);
    setScoresOverride(null);
    setPhase('questions');
  }, []);

  // The save screen lists the family saved on the account: reload it (the
  // user may just have signed in to an existing account).
  const goToSaveProfile = useCallback(() => setPhase('save_profile'), []);
  // Every way into the save screen (result, combined view) reloads the family
  // saved on the account (the user may just have signed in to it).
  useEffect(() => {
    if (phase !== 'save_profile') return;
    const uid = auth.currentUser?.uid;
    if (uid) loadChildProfiles(uid).then(setChildProfiles).catch(() => {});
  }, [phase]);
  const goToHistory = useCallback(() => setPhase('history'), []);
  const backToResult = useCallback(() => { if (result) setPhase('result'); }, [result]);

  // ── Second avis (regard d'un proche sur le résultat "self") ──
  const launchSecond = useCallback((seed: SecondSeed) => {
    setSecondSeed(seed);
    setSecondPages(buildSecondOpinionPages(seed.cands));
    setSecondPageIndex(0);
    setSecondResult(null);
    setPhase('second_intro');
  }, []);

  // Right after your own quiz.
  const startSecondOpinion = useCallback(() => {
    if (!result) return;
    const selfScores: Record<number, number> = {};
    result.allScores.forEach(s => { selfScores[s.type] = s.score; });
    launchSecond({
      selfTop: result.topType,
      cands: [result.topType, result.secondType, result.thirdType],
      selfScores,
      selfQuizAt: null,
    });
  }, [result, launchSecond]);

  // From "Ma famille", later: based on the last self quiz saved to the
  // account. 'none' = no self quiz yet (take it first), 'error' = can't read.
  const startSecondOpinionFromSaved = useCallback(async (): Promise<'ok' | 'none' | 'error'> => {
    const uid = auth.currentUser?.uid;
    if (!uid) return 'error';
    let data;
    try { data = await getUserData(uid); } catch { return 'error'; }
    const selfResults = (data?.quizResults ?? []).filter(r => r.mode === 'adulte');
    const last = selfResults.length ? selfResults[selfResults.length - 1] : null;
    if (!last || !TYPES[last.topType as EnneaType]) return 'none';
    const top = last.topType as EnneaType;
    const raw = last.scores ?? {};
    const order = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneaType[])
      .sort((a, b) => Number(raw[b] ?? 0) - Number(raw[a] ?? 0));
    let cands = [top, ...order.filter(t => t !== top)].slice(0, 3) as EnneaType[];
    const hasScores = order.some(t => Number(raw[t] ?? 0) !== 0);
    if (!hasScores) cands = [top, ...TYPES[top].wing] as EnneaType[];
    const selfScores: Record<number, number> = {};
    ([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneaType[]).forEach(t => { selfScores[t] = Number(raw[t] ?? 0); });
    // Leave any quiz in progress: the second opinion replaces the screen.
    setPages([]);
    setPageIndex(0);
    setResult(null);
    setSubject('self');
    launchSecond({ selfTop: top, cands, selfScores, selfQuizAt: last.completedAt ?? null });
    return 'ok';
  }, [launchSecond]);

  // "Plus tard", back or "Terminé": back to your result if there is one on
  // screen, otherwise (launched from Ma famille) back to the quiz start.
  const exitSecondOpinion = useCallback(() => {
    if (result) setPhase('result');
    else reset();
  }, [result, reset]);

  const beginSecondQuestions = useCallback(() => setPhase('second_questions'), []);

  const updateSecondResponse = useCallback((stmtId: string, value: number) => {
    setSecondPages(prev => {
      const next = [...prev];
      const page = { ...next[secondPageIndex] };
      page.responses = { ...page.responses, [stmtId]: value };
      next[secondPageIndex] = page as Page;
      return next;
    });
  }, [secondPageIndex]);

  const advanceSecondPage = useCallback(() => {
    if (secondPageIndex < secondPages.length - 1) {
      setSecondPageIndex(i => i + 1);
      return;
    }
    const seed = secondSeed;
    if (!seed) return;
    const cands = seed.cands;
    const obs: Record<number, number> = {};
    cands.forEach(t => { obs[t] = 0; });
    for (const pg of secondPages) {
      for (const sid of pg.stmtIds) {
        const v = pg.responses[sid] ?? 0;
        const stmt = getStatements('adulte-obs').find(s => s.id === sid);
        if (stmt && obs[stmt.t] !== undefined) obs[stmt.t] += v;
      }
    }
    const obsPositive = cands.reduce((a, t) => a + Math.max(0, obs[t]), 0);
    const observerAnswered = obsPositive > 0;
    const obsTotal = obsPositive || 1;
    const observerTop = cands.slice().sort((a, b) => obs[b] - obs[a])[0];
    // Renormalize the self score over the SAME 3 candidates so the "you vs them"
    // bars share a denominator (else self% is over 9 types, obs% over 3 → misleading).
    const selfRaw: Record<number, number> = {};
    cands.forEach(t => { selfRaw[t] = seed.selfScores[t] ?? 0; });
    const selfTotal = cands.reduce((a, t) => a + Math.max(0, selfRaw[t]), 0) || 1;
    const candidates = cands.map(t => ({
      type: t,
      selfPercent: Math.round((Math.max(0, selfRaw[t]) / selfTotal) * 100),
      obsPercent: Math.round((Math.max(0, obs[t]) / obsTotal) * 100),
    }));
    const agree = observerTop === seed.selfTop;
    setSecondResult({ selfTop: seed.selfTop, observerTop, agree, observerAnswered, candidates });
    setPhase('second_result');

    // Keep it with the account (shown on your line in "Ma famille").
    const uid = auth.currentUser?.uid;
    if (uid && observerAnswered && secondSavedRef.current !== seed) {
      secondSavedRef.current = seed;
      saveSecondOpinion(uid, {
        date: new Date().toISOString(),
        selfTop: seed.selfTop,
        observerTop,
        agree,
        candidates,
        selfQuizAt: seed.selfQuizAt,
      }).catch(() => {});
    }
  }, [secondPages, secondPageIndex, secondSeed]);

  const secondCurrentPage = secondPages[secondPageIndex] ?? null;

  const saveChildResult = useCallback(async (
    childName: string,
    age?: number,
    existingProfileId?: string,
  ) => {
    const uid = auth.currentUser?.uid;
    if (!uid || !subject || !result) return;
    const entry: ChildProfileEntry = {
      date: new Date().toISOString(),
      mode: subject === 'enfant' ? (ageBand ?? 'enfant') : 'adulte',
      topType: result.topType,
      topPercent: result.topPercent,
      secondType: result.secondType,
      secondPercent: result.secondPercent,
      wingType: result.wingType,
      wingCertainty: result.wingCertainty,
      scores: scoresOverride ?? scores,
      ...(result.combined ? { raters: 2 } : {}),
    };
    const newProfile: ChildProfile = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: childName.trim() || 'Sans nom',
      age: age !== undefined && Number.isFinite(age) ? age : undefined,
      kind: subject === 'enfant' ? 'child' : 'adult',
      history: [entry],
    };
    // Built on what is saved on the account right now, in a transaction
    // (never on a stale list; fails offline instead of overwriting). Errors
    // go up to the save screen.
    // Safe to replay (transaction retries): the same profile or history
    // entry is never added twice. On failure the family list is reloaded so
    // the save screen shows what is really on the account.
    const reload = () => loadChildProfiles(uid).then(setChildProfiles).catch(() => {});
    const updated = await updateChildProfiles(uid, (current) => {
      if (existingProfileId) {
        if (!current.some(p => p.id === existingProfileId)) {
          // Deleted meanwhile (e.g. on another phone): say so, don't pretend.
          throw Object.assign(new Error('profile-missing'), { code: 'profile-missing' });
        }
        return current.map(p =>
          p.id === existingProfileId
            ? {
                ...p,
                // A newly typed age keeps the profile current.
                ...(age !== undefined && Number.isFinite(age) ? { age } : {}),
                history: p.history.some(h => h.date === entry.date) ? p.history : [...p.history, entry],
              }
            : p);
      }
      return current.some(p => p.id === newProfile.id) ? current : [...current, newProfile];
    }).catch((e) => { reload(); throw e; });
    setChildProfiles(updated);
  }, [subject, ageBand, result, scores, scoresOverride]);

  // Delete a saved child profile (from the history screen).
  const deleteChildProfile = useCallback(async (id: string) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const updated = await updateChildProfiles(uid, (current) => current.filter(p => p.id !== id)).catch(() => null);
    if (updated) setChildProfiles(updated);
  }, []);

  // stepIndex for the progress bar: count of answered pages (roughly)
  const stepIndex = pageIndex + 1;

  return {
    // State
    phase,
    subject,
    ageBand,
    currentPage,
    scores,
    pageIndex,
    stepIndex,
    estimatedTotal: totalPagesEstimate,
    result,
    radarScores,
    childProfiles,
    profilesLoaded,
    canAdvance,

    // Transitions
    selectSubject,
    goToProcheMode,

    // Page actions
    updateResponse,
    updateGridPoint,
    skipGrid,
    advancePage,
    goToPrevPage,

    // Result actions
    reset,
    restartSameSubject,
    goToSaveProfile,
    goToHistory,
    backToResult,
    saveChildResult,
    deleteChildProfile,

    // Regard croisé (enfant)
    crossBase, crossOther, crossCombined,
    startCross, beginCross, cancelCross, abortCross, keepCombined,

    // Second avis (regard d'un proche)
    startSecondOpinion,
    startSecondOpinionFromSaved,
    exitSecondOpinion,
    beginSecondQuestions,
    updateSecondResponse,
    advanceSecondPage,
    secondCurrentPage,
    secondPageIndex,
    secondTotal: secondPages.length,
    secondResult,
  };
}
