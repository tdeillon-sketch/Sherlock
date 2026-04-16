import { useState, useCallback } from 'react';
import { QA_DB } from '../constants/data';

export function useQASearch() {
  const [results, setResults] = useState<typeof QA_DB>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback((query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) { setResults([]); setHasSearched(false); return; }

    setHasSearched(true);
    const words = q.split(/\s+/).filter(w => w.length > 2);

    const scored = QA_DB.map(item => {
      let score = 0;
      words.forEach(w => {
        item.tags.forEach(tag => {
          if (tag.includes(w) || w.includes(tag)) score += 3;
        });
      });
      const qLower = item.q.toLowerCase();
      words.forEach(w => { if (qLower.includes(w)) score += 2; });
      const aLower = item.a.toLowerCase();
      words.forEach(w => { if (aLower.includes(w)) score += 1; });
      if (qLower.includes(q) || aLower.includes(q)) score += 5;
      return { ...item, _score: score };
    });

    const filtered = scored
      .filter(item => item._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 5);

    setResults(filtered);
  }, []);

  return { results, hasSearched, search };
}
