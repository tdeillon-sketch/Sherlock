// ══════════════════════════════════════════
//  PALETTE UNIFIEE — 4 couleurs cles
//  Bleu fonce · Bleu moyen · Orange · Blanc
// ══════════════════════════════════════════

export const colors = {
  // ── 4 couleurs cles ──
  white: '#ffffff',
  bg: '#0d1f2d',           // bleu fonce (fond principal)
  surface: '#132f42',       // bleu moyen (cartes, surfaces)
  accent: '#c0713a',        // orange (actions, accents)

  // ── Declinaisons du fond ──
  bgLight: '#173a50',       // bleu un peu plus clair (hover, zones)
  bgNav: 'rgba(10,40,52,0.95)', // fond nav avec transparence

  // ── Declinaisons de l'accent ──
  accentLight: '#e8a06a',   // orange clair
  accentFill: 'rgba(192,113,58,0.15)',
  accentSoft: 'rgba(192,113,58,0.08)',
  accentMedium: 'rgba(192,113,58,0.2)',

  // ── Textes ──
  text: '#f0f0f0',          // texte principal (blanc chaud)
  textSoft: '#c8d8e8',      // texte secondaire
  textMuted: '#8899aa',     // texte discret
  textDim: '#667788',       // texte tres discret
  textFaint: '#556677',     // texte minimal

  // ── Bordures & transparences ──
  border: 'rgba(255,255,255,0.1)',
  borderLight: 'rgba(255,255,255,0.06)',
  cardBg: 'rgba(255,255,255,0.04)',
  subtle05: 'rgba(255,255,255,0.05)',
  subtle06: 'rgba(255,255,255,0.06)',
  subtle12: 'rgba(255,255,255,0.12)',
  subtle25: 'rgba(255,255,255,0.25)',
  subtle55: 'rgba(255,255,255,0.55)',

  // ── Teal (tab bar active) ──
  teal: '#50c8c8',
  tealMuted: 'rgba(80,180,180,0.45)',
  tealSoft: 'rgba(80,180,180,0.6)',
  tealFaint: 'rgba(80,180,180,0.35)',
  tealBorder: 'rgba(80,180,180,0.25)',
  tealLine: 'rgba(80,180,180,0.2)',

  // ── Feedback ──
  error: '#e94560',
  success: '#4caf50',
  successDark: '#2e7d32',
  successBg: 'rgba(76,175,80,0.12)',
  errorDark: '#c62828',
  errorLight: '#ef5350',
  errorBg: 'rgba(239,83,80,0.12)',
};

export const fonts = {
  serif: 'PlayfairDisplay',
  serifItalic: 'PlayfairDisplay-Italic',
  sans: 'Inter',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 28,
};
