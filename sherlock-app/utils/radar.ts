export const CX = 150;
export const CY = 150;
export const R = 110;

export function radarAngle(i: number): number {
  return (-90 + i * 40) * Math.PI / 180;
}

export function radarPos(i: number, radius: number): { x: number; y: number } {
  const a = radarAngle(i);
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

export function computeRadarPoints(scores: Record<number, number>): string[] {
  const maxScore = Math.max(1, ...Object.values(scores));
  const pts: string[] = [];
  for (let i = 0; i < 9; i++) {
    const s = scores[i + 1] || 0;
    const norm = s / maxScore;
    const r = Math.max(R * 0.05, R * norm);
    const p = radarPos(i, r);
    pts.push(`${p.x},${p.y}`);
  }
  return pts;
}

export function computeArrow(scores: Record<number, number>): { x: number; y: number } {
  let wx = 0, wy = 0, total = 0;
  for (let i = 0; i < 9; i++) {
    const s = scores[i + 1] || 0;
    if (s > 0) {
      const p = radarPos(i, R * 0.7);
      wx += (p.x - CX) * s;
      wy += (p.y - CY) * s;
      total += s;
    }
  }
  if (total === 0) return { x: CX, y: CY };
  wx /= total;
  wy /= total;
  const dist = Math.sqrt(wx * wx + wy * wy);
  const scale = Math.min(dist * 2, R * 0.85) / (dist || 1);
  return { x: CX + wx * scale, y: CY + wy * scale };
}

export function getTopType(scores: Record<number, number>): number {
  let topType = 1, topScore = 0;
  for (let t = 1; t <= 9; t++) {
    if ((scores[t] || 0) > topScore) {
      topScore = scores[t] || 0;
      topType = t;
    }
  }
  return topType;
}
