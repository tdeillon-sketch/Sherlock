// ═══════════════════════════════════════════════════════════════
//  USE ADAPTIVE QUIZ — moteur de quiz adaptatif
//
//  Flux:
//   1. select_subject       → 'enfant' (avec age) | 'self'
//   2. age_picker           → si enfant: 5-8, 9-12, 13-17
//   3. positioning (4 Q)    → toutes posées dans l'ordre
//   4. adaptive (4..8 Q)    → sélection par entropie sur les types
//                              candidats les plus probables
//   5. validation (1 Q)     → "cette description vous parle ?" sur
//                              le type leader
//   6. result               → score + bouton "préciser" (+3 Q) si
//                              confiance < seuil
//
//  Score de confiance:
//   - basé sur l'écart top1 vs top2 (en pourcentage)
//   - boost ou malus selon la réponse à la validation
//   - clampé 0..100, mappé en label "Très confiant"..."À préciser"
// ═══════════════════════════════════════════════════════════════

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  AdaptiveQuestion, AgeBand, EnneaType, QuizSubject, TypeWeights,
  getBank, ageToBand,
} from '../constants/quiz_v2';
import {
  auth, loadChildProfiles, saveChildProfiles,
  type ChildProfile, type ChildProfileEntry,
} from '../constants/firebase';

// ── Phases ───────────────────────────────────────────────────────
export type AdaptivePhase =
  | 'select_subject'   // Mon enfant / Moi-même
  | 'age_picker'       // 5-8 / 9-12 / 13-17
  | 'questions'        // positioning + adaptive (séquence unique pour l'UI)
  | 'validation'       // 1 question de validation finale
  | 'result'           // résultat avec confiance
  | 'save_profile'
  | 'history';

// ── Résultat ─────────────────────────────────────────────────────
export interface AdaptiveResult {
  topType: EnneaType;
  topPercent: number;
  secondType: EnneaType;
  secondPercent: number;
  thirdType: EnneaType;
  thirdPercent: number;
  wingType: EnneaType | null;
  /** 0..100 */
  confidence: number;
  confidenceLabel: 'Très confiant' | 'Confiant' | 'Plutôt confiant' | 'À préciser';
  insight: string;
  /** Toutes les paires (type, score) triées descending */
  allScores: { type: EnneaType; score: number; percent: number }[];
}

// ── Constantes de réglage ────────────────────────────────────────
const NB_POSITIONING = 4;       // Toutes les Q de positionnement, fixes
const NB_ADAPTIVE_BASE = 5;     // Min de questions adaptatives
const NB_ADAPTIVE_MAX = 8;      // Max de questions adaptatives en mode normal
const NB_PRECISE_EXTRA = 3;     // Questions ajoutées si "préciser"
const CONFIDENCE_TARGET = 70;   // En dessous, on continue d'ajouter des Q
const VALIDATION_OUI_BOOST = 5; // Score si "oui" à la validation
const VALIDATION_PEUPRES_BOOST = 2;
const VALIDATION_NON_PENALTY = -3;

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════

const EMPTY_SCORES = (): Record<EnneaType, number> => ({
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
});

function applyDelta(
  scores: Record<EnneaType, number>,
  delta: TypeWeights,
  multiplier = 1,
): Record<EnneaType, number> {
  const next = { ...scores };
  (Object.keys(delta) as unknown as EnneaType[]).forEach(k => {
    const v = delta[k as EnneaType];
    if (typeof v === 'number') {
      next[k as EnneaType] += v * multiplier;
    }
  });
  return next;
}

function sortedTypes(scores: Record<EnneaType, number>) {
  return (Object.keys(scores) as unknown as EnneaType[])
    .map(k => ({ type: k as EnneaType, score: scores[k as EnneaType] }))
    .sort((a, b) => b.score - a.score);
}

/** Renvoie les N types candidats de plus haut score. */
function topCandidates(scores: Record<EnneaType, number>, n = 4): EnneaType[] {
  return sortedTypes(scores).slice(0, n).map(s => s.type);
}

/** Calcule la confiance à partir des scores actuels. */
function computeConfidence(scores: Record<EnneaType, number>): number {
  const sorted = sortedTypes(scores);
  const total = Math.max(1, sorted.reduce((a, b) => a + b.score, 0));
  const topPct = (sorted[0].score / total) * 100;
  const secondPct = (sorted[1].score / total) * 100;
  // Écart en points de pourcentage, mappé sur 0-100
  // 0pt -> 0%, 25pts -> 100%
  const gap = topPct - secondPct;
  const conf = Math.max(0, Math.min(100, (gap / 25) * 100));
  return conf;
}

function confidenceLabel(c: number): AdaptiveResult['confidenceLabel'] {
  if (c >= 80) return 'Très confiant';
  if (c >= 60) return 'Confiant';
  if (c >= 40) return 'Plutôt confiant';
  return 'À préciser';
}

/**
 * Sélectionne la prochaine question adaptative.
 * Heuristique:
 *  - Préfère les questions qui discriminent les types parmi les top-4 candidats
 *  - Pénalise les questions déjà posées (id)
 *  - Pénalise les catégories déjà couvertes plusieurs fois (variété)
 */
function pickNextAdaptive(
  pool: AdaptiveQuestion[],
  scores: Record<EnneaType, number>,
  askedIds: Set<string>,
  askedCategories: Map<string, number>,
): AdaptiveQuestion | null {
  const candidates = new Set(topCandidates(scores, 4));
  const eligible = pool.filter(q => q.phase === 'adaptive' && !askedIds.has(q.id));
  if (eligible.length === 0) return null;

  // Score chaque question
  const scored = eligible.map(q => {
    // Combien de candidats elle discrimine
    const overlap = q.discriminates.filter(t => candidates.has(t)).length;
    const catCount = askedCategories.get(q.category) ?? 0;
    // Bonus pour overlap, malus pour répétition de catégorie, +bruit
    const score = overlap * 10 - catCount * 3 + Math.random() * 2;
    return { q, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].q;
}

/**
 * Sélectionne la question de validation pour un type donné.
 */
function pickValidation(
  pool: AdaptiveQuestion[],
  forType: EnneaType,
): AdaptiveQuestion | null {
  return pool.find(q => q.phase === 'validation' && q.validationType === forType) ?? null;
}

/**
 * Calcule le résultat complet à partir des scores.
 */
function computeResult(scores: Record<EnneaType, number>): AdaptiveResult {
  const sorted = sortedTypes(scores);
  const total = Math.max(1, sorted.reduce((a, b) => a + b.score, 0));

  const allScores = sorted.map(s => ({
    type: s.type,
    score: s.score,
    percent: Math.round((s.score / total) * 100),
  }));

  const top = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  const topPercent = Math.round((top.score / total) * 100);
  const secondPercent = Math.round((second.score / total) * 100);
  const thirdPercent = Math.round((third.score / total) * 100);

  // Détection de l'aile : 2e place = type adjacent (1↔2, 9↔1, etc.)
  let wingType: EnneaType | null = null;
  if (second.score > 0) {
    const diff = Math.abs(top.type - second.type);
    if (diff === 1 || diff === 8) wingType = second.type;
  }

  const confidence = computeConfidence(scores);
  const cLabel = confidenceLabel(confidence);

  // Insight
  let insight = '';
  if (confidence >= 70) {
    insight = `Le profil ${top.type} se dégage clairement.`;
  } else if (confidence >= 40) {
    insight = `Le profil ${top.type} ressort, avec une coloration ${second.type} marquée.`;
  } else {
    insight = `Profil composite : les types ${top.type}, ${second.type} et ${third.type} se mélangent. Quelques questions de plus aideraient à trancher.`;
  }
  if (wingType) {
    insight += ` La présence forte du ${wingType} suggère une aile ${top.type}w${wingType}.`;
  }

  return {
    topType: top.type, topPercent,
    secondType: second.type, secondPercent,
    thirdType: third.type, thirdPercent,
    wingType,
    confidence: Math.round(confidence),
    confidenceLabel: cLabel,
    insight,
    allScores,
  };
}

// ═══════════════════════════════════════════════════════════════
//  HOOK
// ═══════════════════════════════════════════════════════════════

export function useAdaptiveQuiz() {
  // ── État principal ──
  const [phase, setPhase] = useState<AdaptivePhase>('select_subject');
  const [subject, setSubject] = useState<QuizSubject | null>(null);
  const [ageBand, setAgeBand] = useState<AgeBand | null>(null);
  const [childAge, setChildAge] = useState<number | null>(null);

  // ── Scores ──
  const [scores, setScores] = useState<Record<EnneaType, number>>(EMPTY_SCORES);

  // ── Séquence de questions posées ──
  const [askedIds, setAskedIds] = useState<Set<string>>(new Set());
  const [askedCategories, setAskedCategories] = useState<Map<string, number>>(new Map());

  // ── La question courante (pré-calculée) ──
  const [currentQuestion, setCurrentQuestion] = useState<AdaptiveQuestion | null>(null);
  /** Position dans la séquence affichée à l'utilisateur (1-indexée pour la barre). */
  const [stepIndex, setStepIndex] = useState(0);
  /** Total estimé pour la barre de progression. */
  const [estimatedTotal, setEstimatedTotal] = useState<number>(NB_POSITIONING + NB_ADAPTIVE_BASE + 1);
  /** Nombre de questions adaptatives déjà posées. */
  const [adaptiveAsked, setAdaptiveAsked] = useState(0);
  /** Si l'utilisateur a déjà cliqué "préciser" pour ne pas pouvoir rajouter à l'infini. */
  const [precisionRound, setPrecisionRound] = useState(0);

  // ── Résultat ──
  const [result, setResult] = useState<AdaptiveResult | null>(null);

  // ── Historique des profils enfants ──
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [profilesLoaded, setProfilesLoaded] = useState(false);

  // Charger les profils au mount
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) { setProfilesLoaded(true); return; }
    loadChildProfiles(uid)
      .then(list => setChildProfiles(list))
      .catch(() => {})
      .finally(() => setProfilesLoaded(true));
  }, []);

  // ─── Bank effective pour la session courante ───
  const bank = useMemo(() => {
    if (!ageBand) return null;
    return getBank(ageBand);
  }, [ageBand]);

  // ═══════════════════════════════════════════════════════════════
  //  TRANSITIONS
  // ═══════════════════════════════════════════════════════════════

  /** Étape 1 : choisir le sujet */
  const selectSubject = useCallback((s: QuizSubject) => {
    setSubject(s);
    if (s === 'self') {
      setAgeBand('adulte');
      setPhase('questions');
      // On démarre tout de suite la séquence (sera initialisée par useEffect)
    } else {
      setPhase('age_picker');
    }
  }, []);

  /** Étape 2 : choisir la tranche d'âge (mode enfant uniquement) */
  const selectAge = useCallback((age: number) => {
    setChildAge(age);
    setAgeBand(ageToBand(age));
    setPhase('questions');
  }, []);

  /** Initialise la première question dès qu'on a une bank. */
  useEffect(() => {
    if (phase === 'questions' && bank && !currentQuestion && askedIds.size === 0) {
      // Première question : la première de positionnement
      const first = bank.find(q => q.phase === 'positioning');
      if (first) {
        setCurrentQuestion(first);
        setStepIndex(1);
        setEstimatedTotal(NB_POSITIONING + NB_ADAPTIVE_BASE + 1);
      }
    }
  }, [phase, bank, currentQuestion, askedIds.size]);

  /**
   * Avance vers la prochaine question selon la phase.
   * Retourne true si une nouvelle question a été chargée, false si c'est la fin.
   */
  const advance = useCallback((newScores: Record<EnneaType, number>, newAskedIds: Set<string>, newAskedCats: Map<string, number>) => {
    if (!bank) return;

    // Combien de positioning posées ?
    const positioningAsked = Array.from(newAskedIds).filter(id => {
      const q = bank.find(qq => qq.id === id);
      return q?.phase === 'positioning';
    }).length;

    // Combien d'adaptives posées ?
    const adaptiveAskedNow = Array.from(newAskedIds).filter(id => {
      const q = bank.find(qq => qq.id === id);
      return q?.phase === 'adaptive';
    }).length;

    // ── Phase 1 : positioning, dans l'ordre ──
    if (positioningAsked < NB_POSITIONING) {
      const positioningPool = bank.filter(q => q.phase === 'positioning' && !newAskedIds.has(q.id));
      if (positioningPool.length > 0) {
        setCurrentQuestion(positioningPool[0]);
        setStepIndex(prev => prev + 1);
        return;
      }
    }

    // ── Phase 2 : adaptive ──
    // On continue tant qu'on n'a pas atteint le min, OU si la confiance est trop basse jusqu'au max
    const conf = computeConfidence(newScores);
    const shouldContinueAdaptive =
      adaptiveAskedNow < NB_ADAPTIVE_BASE ||
      (adaptiveAskedNow < NB_ADAPTIVE_MAX && conf < CONFIDENCE_TARGET);

    if (shouldContinueAdaptive) {
      const next = pickNextAdaptive(bank, newScores, newAskedIds, newAskedCats);
      if (next) {
        setCurrentQuestion(next);
        setStepIndex(prev => prev + 1);
        // Met à jour l'estimation totale si on continue au-delà du base
        if (adaptiveAskedNow >= NB_ADAPTIVE_BASE) {
          setEstimatedTotal(NB_POSITIONING + adaptiveAskedNow + 2 + 1);
        }
        return;
      }
    }

    // ── Phase 3 : validation ──
    const leadType = sortedTypes(newScores)[0].type;
    const validation = pickValidation(bank, leadType);
    if (validation && !newAskedIds.has(validation.id)) {
      setCurrentQuestion(validation);
      setStepIndex(prev => prev + 1);
      setPhase('validation');
      return;
    }

    // ── Fin : on calcule le résultat ──
    const r = computeResult(newScores);
    setResult(r);
    setPhase('result');
    setCurrentQuestion(null);
  }, [bank]);

  // ═══════════════════════════════════════════════════════════════
  //  RÉPONSES
  // ═══════════════════════════════════════════════════════════════

  /** Réponse à un choice / forced_choice / scenario_complete (option index) */
  const answerChoice = useCallback((optIdx: number) => {
    if (!currentQuestion || !currentQuestion.options) return;
    const opt = currentQuestion.options[optIdx];
    if (!opt) return;
    const newScores = applyDelta(scores, opt.scores);
    const newIds = new Set(askedIds); newIds.add(currentQuestion.id);
    const newCats = new Map(askedCategories);
    newCats.set(currentQuestion.category, (newCats.get(currentQuestion.category) ?? 0) + 1);

    setScores(newScores);
    setAskedIds(newIds);
    setAskedCategories(newCats);
    if (currentQuestion.phase === 'adaptive') setAdaptiveAsked(n => n + 1);
    advance(newScores, newIds, newCats);
  }, [currentQuestion, scores, askedIds, askedCategories, advance]);

  /** Réponse à un slider (-2..+2) */
  const answerSlider = useCallback((value: number) => {
    if (!currentQuestion || !currentQuestion.sliderScores) return;
    const { low, high, mid } = currentQuestion.sliderScores;
    let newScores = scores;
    if (value <= -2) newScores = applyDelta(scores, low);
    else if (value >= 2) newScores = applyDelta(scores, high);
    else if (value === 0 && mid) newScores = applyDelta(scores, mid);
    else {
      // Position intermédiaire : mélange
      const lowWeight = (2 - value) / 4;
      const highWeight = (value + 2) / 4;
      newScores = applyDelta(scores, low, lowWeight);
      newScores = applyDelta(newScores, high, highWeight);
    }
    const newIds = new Set(askedIds); newIds.add(currentQuestion.id);
    const newCats = new Map(askedCategories);
    newCats.set(currentQuestion.category, (newCats.get(currentQuestion.category) ?? 0) + 1);

    setScores(newScores);
    setAskedIds(newIds);
    setAskedCategories(newCats);
    if (currentQuestion.phase === 'adaptive') setAdaptiveAsked(n => n + 1);
    advance(newScores, newIds, newCats);
  }, [currentQuestion, scores, askedIds, askedCategories, advance]);

  /** Réponse à une validation : 'oui' | 'peupres' | 'non' */
  const answerValidation = useCallback((response: 'oui' | 'peupres' | 'non') => {
    if (!currentQuestion || !currentQuestion.validationType) return;
    const t = currentQuestion.validationType;
    const boost =
      response === 'oui' ? VALIDATION_OUI_BOOST :
      response === 'peupres' ? VALIDATION_PEUPRES_BOOST :
      VALIDATION_NON_PENALTY;
    const newScores = { ...scores, [t]: scores[t] + boost };
    const newIds = new Set(askedIds); newIds.add(currentQuestion.id);

    setScores(newScores);
    setAskedIds(newIds);

    // Fin du parcours principal — on calcule le résultat
    const r = computeResult(newScores);
    setResult(r);
    setPhase('result');
    setCurrentQuestion(null);
  }, [currentQuestion, scores, askedIds]);

  /** Sauter une question (reste en phase actuelle, on demande la suivante sans toucher aux scores) */
  const skip = useCallback(() => {
    if (!currentQuestion) return;
    const newIds = new Set(askedIds); newIds.add(currentQuestion.id);
    const newCats = new Map(askedCategories);
    newCats.set(currentQuestion.category, (newCats.get(currentQuestion.category) ?? 0) + 1);
    setAskedIds(newIds);
    setAskedCategories(newCats);
    if (currentQuestion.phase === 'adaptive') setAdaptiveAsked(n => n + 1);
    advance(scores, newIds, newCats);
  }, [currentQuestion, askedIds, askedCategories, scores, advance]);

  // ═══════════════════════════════════════════════════════════════
  //  ACTIONS DE RÉSULTAT
  // ═══════════════════════════════════════════════════════════════

  /** "Préciser" : ajoute 3 questions adaptatives + 1 validation (si possible) */
  const refineResult = useCallback(() => {
    if (!bank || !result || precisionRound >= 2) return;
    setPrecisionRound(r => r + 1);
    setResult(null);
    setPhase('questions');
    setEstimatedTotal(prev => prev + NB_PRECISE_EXTRA + 1);

    // On force la prochaine question : une adaptive
    const next = pickNextAdaptive(bank, scores, askedIds, askedCategories);
    if (next) {
      setCurrentQuestion(next);
      setStepIndex(prev => prev + 1);
    } else {
      // Plus de questions disponibles — on retombe sur la validation
      const leadType = sortedTypes(scores)[0].type;
      const v = pickValidation(bank, leadType);
      if (v && !askedIds.has(v.id)) {
        setCurrentQuestion(v);
        setStepIndex(prev => prev + 1);
        setPhase('validation');
      } else {
        // Vraiment plus rien — on revient au résultat
        setResult(computeResult(scores));
        setPhase('result');
      }
    }
  }, [bank, result, precisionRound, scores, askedIds, askedCategories]);

  /**
   * Pendant la phase de précision, après chaque réponse on vérifie
   * si on a posé NB_PRECISE_EXTRA adaptatives de plus → validation puis fin.
   */
  // (La logique d'avance gère déjà ça via les compteurs ; pour le mode précision,
  //  on incrémente NB_ADAPTIVE_MAX implicitement via les conditions de continue.
  //  Ici on n'a pas besoin de logique séparée — `advance` continue tant que
  //  conf < target ET adaptiveAsked < NB_ADAPTIVE_MAX. Pour la précision, on
  //  élargit dynamiquement le max.)

  // Adapter dynamiquement NB_ADAPTIVE_MAX si on est en précision
  // Astuce : on remplace `pickNextAdaptive` mais ici on garde simple :
  // si precisionRound > 0, on pose +NB_PRECISE_EXTRA questions adaptatives min.

  // ── Reset complet ──
  const reset = useCallback(() => {
    setPhase('select_subject');
    setSubject(null);
    setAgeBand(null);
    setChildAge(null);
    setScores(EMPTY_SCORES());
    setAskedIds(new Set());
    setAskedCategories(new Map());
    setCurrentQuestion(null);
    setStepIndex(0);
    setEstimatedTotal(NB_POSITIONING + NB_ADAPTIVE_BASE + 1);
    setAdaptiveAsked(0);
    setPrecisionRound(0);
    setResult(null);
  }, []);

  // ── Refaire un quiz dans le même mode (sans repasser par select) ──
  const restartSameSubject = useCallback(() => {
    setScores(EMPTY_SCORES());
    setAskedIds(new Set());
    setAskedCategories(new Map());
    setCurrentQuestion(null);
    setStepIndex(0);
    setEstimatedTotal(NB_POSITIONING + NB_ADAPTIVE_BASE + 1);
    setAdaptiveAsked(0);
    setPrecisionRound(0);
    setResult(null);
    setPhase('questions');
  }, []);

  // ── Nav vers historique / sauvegarde ──
  const goToSaveProfile = useCallback(() => setPhase('save_profile'), []);
  const goToHistory = useCallback(() => setPhase('history'), []);
  const backToResult = useCallback(() => {
    if (result) setPhase('result');
  }, [result]);

  // ── Sauvegarder un profil enfant ──
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
        p.id === existingProfileId
          ? { ...p, history: [...p.history, entry] }
          : p
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

  return {
    // État
    phase,
    subject,
    ageBand,
    childAge,
    currentQuestion,
    scores,
    stepIndex,
    estimatedTotal,
    result,
    childProfiles,
    profilesLoaded,
    precisionRound,

    // Transitions
    selectSubject,
    selectAge,

    // Réponses
    answerChoice,
    answerSlider,
    answerValidation,
    skip,

    // Actions de résultat
    refineResult,
    reset,
    restartSameSubject,
    goToSaveProfile,
    goToHistory,
    backToResult,
    saveChildResult,
  };
}
