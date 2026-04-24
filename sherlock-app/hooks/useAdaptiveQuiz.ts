// ═══════════════════════════════════════════════════════════════
//  USE ADAPTIVE QUIZ V3 — moteur par pages
//
//  Flow :
//   1. select_subject   → 'enfant' (avec âge) | 'self'
//   2. age_picker       → si enfant
//   3. questions        → pages séquentielles :
//        a. Likert 1   (5 sliders -5..+5, types 1/3/5/7/9)
//        b. Likert 2   (5 sliders, types 2/4/6/8 + deeper)
//        c. Budget 3+  (5 steppers, 10 pts absolus, adaptatif)
//        d. Final      (3 steppers, 6 pts — si top1/top2 proches)
//        e. Wing       (2 sliders — détermine l'aile du top)
//   4. result
//
//  Le wing est géré comme une page interne (pas une phase séparée).
// ═══════════════════════════════════════════════════════════════

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  AgeBand, EnneaType, TypeWeights, QuizSubject, Statement, WingStatement,
  TYPES, ageToBand, getStatements, getWings, statementsByType, findStmt, pickStatement,
} from '../constants/quiz_v3';
import {
  auth, loadChildProfiles, saveChildProfiles,
  type ChildProfile, type ChildProfileEntry,
} from '../constants/firebase';

// Re-export for legacy imports
export type { AgeBand, EnneaType, QuizSubject } from '../constants/quiz_v3';

// ── Phases (même shape que v2) ────────────────────────────────────
export type AdaptivePhase =
  | 'select_subject'
  | 'age_picker'
  | 'questions'
  | 'result'
  | 'save_profile'
  | 'history';

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
  stmtIds: string[];  // 2 wing statement ids
  responses: Record<string, number>;
  topType: EnneaType;
  wings: [EnneaType, EnneaType];
}
export type Page = LikertPage | BudgetPage | FinalPage | WingPage;

// ── Résultat ──────────────────────────────────────────────────────
export interface AdaptiveResult {
  topType: EnneaType;
  topPercent: number;
  secondType: EnneaType;
  secondPercent: number;
  thirdType: EnneaType;
  thirdPercent: number;
  wingType: EnneaType | null;
  confidence: number;           // 0..100
  confidenceLabel: 'Très confiant' | 'Confiant' | 'Plutôt confiant' | 'À préciser';
  insight: string;
  allScores: { type: EnneaType; score: number; percent: number }[];
}

// ── Constantes ────────────────────────────────────────────────────
const MIN_PAGES = 3;
const MAX_PAGES = 5;
const TIEBREAK_GAP = 0.20;
const EARLY_STOP_PCT = 85;

const LIKERT_MULT = 0.3;
const BUDGET_WEIGHT = 0.3;
const FINAL_WEIGHT = 0.4;

const EMPTY_SCORES = (): Record<EnneaType, number> => ({
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
});

// ═══════════════════════════════════════════════════════════════
//  SCORING
// ═══════════════════════════════════════════════════════════════

function recomputeScoresFromPages(pages: Page[], ageBand: AgeBand): Record<EnneaType, number> {
  const scores = EMPTY_SCORES();
  for (const page of pages) {
    if (page.kind === 'wing') continue; // wings don't affect main scoring
    const mult = page.kind === 'likert' ? LIKERT_MULT
               : page.kind === 'final'  ? FINAL_WEIGHT
               : BUDGET_WEIGHT;
    for (const sid of page.stmtIds) {
      const v = page.responses[sid] ?? 0;
      if (v === 0) continue;
      const stmt = getStatements(ageBand).find(s => s.id === sid);
      if (!stmt) continue;
      scores[stmt.t] += v * mult;
      if (scores[stmt.t] < 0) scores[stmt.t] = 0;
    }
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

function confidenceLabel(c: number): AdaptiveResult['confidenceLabel'] {
  if (c >= 80) return 'Très confiant';
  if (c >= 60) return 'Confiant';
  if (c >= 40) return 'Plutôt confiant';
  return 'À préciser';
}

// ═══════════════════════════════════════════════════════════════
//  ADAPTIVE PAGE BUILDER
// ═══════════════════════════════════════════════════════════════

function pickStmtId(type: EnneaType, ageBand: AgeBand, used: Set<string>): string | null {
  const pool = statementsByType(type, ageBand).filter(s => !used.has(s.id));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)].id;
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

function buildLikertPage2(ageBand: AgeBand, scores: Record<EnneaType, number>, used: Set<string>): LikertPage {
  const ids: string[] = [];
  for (const t of [2, 4, 6, 8] as EnneaType[]) {
    const id = pickStmtId(t, ageBand, used);
    if (id) { ids.push(id); used.add(id); }
  }
  const topType = sortedTypes(scores)[0]?.type ?? 5;
  const extra = pickStmtId(topType, ageBand, used);
  if (extra) { ids.push(extra); used.add(extra); }
  const responses: Record<string, number> = {};
  ids.forEach(id => { responses[id] = 0; });
  return { kind: 'likert', stmtIds: ids, responses };
}

function buildBudgetPage(
  ageBand: AgeBand,
  scores: Record<EnneaType, number>,
  used: Set<string>,
): BudgetPage {
  const sorted = sortedTypes(scores);
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
  // Fill up to 5 with any type still missing signal
  const allTypes: EnneaType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
  const sorted = sortedTypes(scores);
  const finalists = sorted.slice(0, 3).filter(s => s.score > 0).map(s => s.type);
  const ids: string[] = [];
  for (const t of finalists) {
    const id = pickStmtId(t, ageBand, used);
    if (id) { ids.push(id); used.add(id); }
  }
  const responses: Record<string, number> = {};
  ids.forEach(id => { responses[id] = 0; });
  return { kind: 'final', stmtIds: ids, responses, budget: 6 };
}

function buildWingPage(ageBand: AgeBand, topType: EnneaType): WingPage {
  const typeInfo = TYPES[topType];
  const wings = typeInfo.wing;
  const wingStmts = getWings(ageBand);
  const s1 = wingStmts.find(w => w.wingOf === topType && w.wingType === wings[0]);
  const s2 = wingStmts.find(w => w.wingOf === topType && w.wingType === wings[1]);
  const ids = [s1?.id, s2?.id].filter(Boolean) as string[];
  const responses: Record<string, number> = {};
  ids.forEach(id => { responses[id] = 0; });
  return { kind: 'wing', stmtIds: ids, responses, topType, wings: [wings[0], wings[1]] };
}

/** Decide and build the next page. Returns null if quiz is done. */
function buildNextPage(
  pages: Page[],
  ageBand: AgeBand,
  scores: Record<EnneaType, number>,
): Page | null {
  const mainPages = pages.filter(p => p.kind !== 'wing');
  const hasWing = pages.some(p => p.kind === 'wing');
  const pageIdx = mainPages.length;

  // Collect used ids
  const used = new Set<string>(pages.flatMap(p => p.stmtIds));

  // After wing page, we're done
  if (hasWing) return null;

  // Page 0 : Likert 1
  if (pageIdx === 0) return buildLikertPage1(ageBand, used);
  // Page 1 : Likert 2
  if (pageIdx === 1) return buildLikertPage2(ageBand, scores, used);

  // Adaptive budget pages
  const c = computeConfidenceData(scores, pages.flatMap(p => Object.keys(p.responses)).length);
  const atMax = pageIdx >= MAX_PAGES - 1; // -1 because we'll still add wing

  // Early stop: high confidence AND min pages
  if (pageIdx >= MIN_PAGES && c.pct >= EARLY_STOP_PCT) {
    // Instead of stopping, go to wing page
    return c.top ? buildWingPage(ageBand, c.top) : null;
  }

  // If top1/top2 close and we've done enough budget pages → final departage
  if (pageIdx >= 3 && c.gap < TIEBREAK_GAP && c.top) {
    return buildFinalPage(ageBand, scores, used);
  }

  // If we've hit max main pages, go to wing
  if (atMax) {
    return c.top ? buildWingPage(ageBand, c.top) : null;
  }

  // Otherwise standard budget page
  return buildBudgetPage(ageBand, scores, used);
}

// ═══════════════════════════════════════════════════════════════
//  WING DETECTION
// ═══════════════════════════════════════════════════════════════

function computeWing(pages: Page[], ageBand: AgeBand): { wing: EnneaType | null; indeterminate: boolean } {
  const wingPage = pages.find(p => p.kind === 'wing') as WingPage | undefined;
  if (!wingPage || wingPage.stmtIds.length < 2) return { wing: null, indeterminate: true };
  const [id1, id2] = wingPage.stmtIds;
  const s1 = findStmt(id1, ageBand) as WingStatement | undefined;
  const s2 = findStmt(id2, ageBand) as WingStatement | undefined;
  if (!s1 || !s2) return { wing: null, indeterminate: true };
  const v1 = (wingPage.responses[id1] ?? 0) * LIKERT_MULT;
  const v2 = (wingPage.responses[id2] ?? 0) * LIKERT_MULT;
  if (Math.abs(v1 - v2) < 0.25) return { wing: null, indeterminate: true };
  return { wing: v1 > v2 ? s1.wingType : s2.wingType, indeterminate: false };
}

// ═══════════════════════════════════════════════════════════════
//  RESULT BUILDER
// ═══════════════════════════════════════════════════════════════

function computeResult(scores: Record<EnneaType, number>, pages: Page[], ageBand: AgeBand): AdaptiveResult {
  const answered = pages.flatMap(p => Object.values(p.responses)).filter(v => v !== 0).length;
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
  const wingInfo = computeWing(pages, ageBand);

  let insight: string;
  if (c.pct < 30) {
    insight = `Profil composite — plusieurs types cohabitent (${t1.type}, ${t2.type}, ${t3.type}).`;
  } else if (c.pct < 55) {
    const typeInfo = TYPES[top];
    if (typeInfo.wing.includes(t2.type)) {
      insight = `Le Type ${top} ressort avec une aile ${t2.type} marquée.`;
    } else {
      insight = `Le Type ${top} est en tête mais le Type ${t2.type} n'est pas loin.`;
    }
  } else if (c.pct < 75) {
    insight = `Le Type ${top} ressort clairement (${TYPES[top].nick}).`;
  } else {
    insight = `Profil très marqué : Type ${top} (${TYPES[top].nick}).`;
  }
  if (wingInfo.wing) insight += ` Aile détectée : ${top}w${wingInfo.wing}.`;

  return {
    topType: t1.type, topPercent: Math.round((Math.max(0, t1.score) / totalPos) * 100),
    secondType: t2.type, secondPercent: Math.round((Math.max(0, t2.score) / totalPos) * 100),
    thirdType: t3.type, thirdPercent: Math.round((Math.max(0, t3.score) / totalPos) * 100),
    wingType: wingInfo.wing,
    confidence: c.pct,
    confidenceLabel: confidenceLabel(c.pct),
    insight,
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
  const [childAge, setChildAge] = useState<number | null>(null);

  const [pages, setPages] = useState<Page[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [result, setResult] = useState<AdaptiveResult | null>(null);

  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [profilesLoaded, setProfilesLoaded] = useState(false);

  // Load profiles on mount
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) { setProfilesLoaded(true); return; }
    loadChildProfiles(uid)
      .then(list => setChildProfiles(list))
      .catch(() => {})
      .finally(() => setProfilesLoaded(true));
  }, []);

  // Compute scores from all pages
  const scores = useMemo(() => {
    if (!ageBand) return EMPTY_SCORES();
    return recomputeScoresFromPages(pages, ageBand);
  }, [pages, ageBand]);

  const currentPage = pages[pageIndex] ?? null;
  const totalPagesEstimate = 4; // approx for UI progress

  // ── Transitions ──
  const selectSubject = useCallback((s: QuizSubject) => {
    setSubject(s);
    if (s === 'self') {
      setAgeBand('adulte');
      setPhase('questions');
    } else {
      setPhase('age_picker');
    }
  }, []);

  const selectAge = useCallback((age: number) => {
    setChildAge(age);
    setAgeBand(ageToBand(age));
    setPhase('questions');
  }, []);

  // Init first page when entering 'questions'
  useEffect(() => {
    if (phase === 'questions' && ageBand && pages.length === 0) {
      const firstPage = buildLikertPage1(ageBand, new Set());
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

  // ── Validate current page and build next ──
  const advancePage = useCallback(() => {
    if (!ageBand || !currentPage) return;
    // Build next page based on updated scores
    const nextPage = buildNextPage(pages, ageBand, scores);
    if (!nextPage) {
      // Done — compute result
      const r = computeResult(scores, pages, ageBand);
      setResult(r);
      setPhase('result');
      return;
    }
    setPages(prev => [...prev, nextPage]);
    setPageIndex(prev => prev + 1);
  }, [ageBand, currentPage, pages, scores]);

  // ── Go back one page ──
  const goToPrevPage = useCallback(() => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  }, [pageIndex]);

  // ── Validate current page (same as advancePage, exposed for clarity) ──
  const canAdvance = useMemo(() => {
    if (!currentPage) return false;
    if (currentPage.kind === 'likert' || currentPage.kind === 'wing') {
      // Always valid — 0 = no opinion, default
      return true;
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
    setChildAge(null);
    setPages([]);
    setPageIndex(0);
    setResult(null);
  }, []);

  const restartSameSubject = useCallback(() => {
    setPages([]);
    setPageIndex(0);
    setResult(null);
    setPhase('questions');
  }, []);

  const goToSaveProfile = useCallback(() => setPhase('save_profile'), []);
  const goToHistory = useCallback(() => setPhase('history'), []);
  const backToResult = useCallback(() => { if (result) setPhase('result'); }, [result]);

  const saveChildResult = useCallback(async (
    childName: string,
    age?: number,
    existingProfileId?: string,
  ) => {
    const uid = auth.currentUser?.uid;
    if (!uid || !subject || !result) return;
    const entry: ChildProfileEntry = {
      date: new Date().toISOString(),
      mode: subject === 'self' ? 'adulte' : (ageBand ?? 'enfant'),
      topType: result.topType,
      topPercent: result.topPercent,
      secondType: result.secondType,
      secondPercent: result.secondPercent,
      wingType: result.wingType,
      scores,
    };
    let updated: ChildProfile[];
    if (existingProfileId) {
      updated = childProfiles.map(p =>
        p.id === existingProfileId ? { ...p, history: [...p.history, entry] } : p
      );
    } else {
      const newProfile: ChildProfile = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        name: childName.trim() || 'Sans nom',
        age,
        history: [entry],
      };
      updated = [...childProfiles, newProfile];
    }
    setChildProfiles(updated);
    await saveChildProfiles(uid, updated).catch(() => {});
  }, [subject, ageBand, result, scores, childProfiles]);

  // stepIndex for the progress bar: count of answered pages (roughly)
  const stepIndex = pageIndex + 1;

  return {
    // State
    phase,
    subject,
    ageBand,
    childAge,
    currentPage,
    scores,
    pageIndex,
    stepIndex,
    estimatedTotal: totalPagesEstimate,
    result,
    childProfiles,
    profilesLoaded,
    canAdvance,

    // Transitions
    selectSubject,
    selectAge,

    // Page actions
    updateResponse,
    advancePage,
    goToPrevPage,

    // Result actions
    reset,
    restartSameSubject,
    goToSaveProfile,
    goToHistory,
    backToResult,
    saveChildResult,
  };
}
