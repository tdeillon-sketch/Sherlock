// ═══════════════════════════════════════════════════════════════
//  One-shot navigation intents for the Quiz tab.
//  "Ma famille" (Profils) asks the Quiz tab to open the second opinion.
//  A module flag rather than route params: the Quiz tab stays mounted, so a
//  param would stick and re-fire; this is consumed exactly once on focus.
// ═══════════════════════════════════════════════════════════════

let pendingSecondOpinion = false;

export function requestSecondOpinion(): void {
  pendingSecondOpinion = true;
}

export function consumeSecondOpinion(): boolean {
  const pending = pendingSecondOpinion;
  pendingSecondOpinion = false;
  return pending;
}
