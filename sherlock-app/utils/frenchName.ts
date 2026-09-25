// French elision before a first name: "le profil d'Emma", "de Lucas".
// Vowels and h (Hugo, Hélène take "d'"); y is left out (Yanis, Yann take "de").
// Passed to FR templates as {{deName}}; EN templates simply ignore it.
export function deName(name: string): string {
  const n = name.trim();
  return /^[aeiouhàâäéèêëîïôöùûüœæ]/i.test(n) ? `d'${n}` : `de ${n}`;
}
