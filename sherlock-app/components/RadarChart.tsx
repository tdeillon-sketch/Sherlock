import React from 'react';
import Svg, { Polygon, Line, Circle, Text as SvgText } from 'react-native-svg';
import { CX, CY, R, radarPos, computeArrow, getTopType } from '../utils/radar';

interface RadarChartProps {
  scores: Record<number, number>;
  size?: number;
}

export default function RadarChart({ scores, size = 280 }: RadarChartProps) {
  const topType = getTopType(scores);
  const maxScore = Math.max(1, ...Object.values(scores));
  const arrow = computeArrow(scores);

  // Build guide polygons at 0.33R, 0.66R, 1R
  const guideRadii = [R * 0.33, R * 0.66, R];
  const guidePolygons = guideRadii.map((gr) => {
    const pts = Array.from({ length: 9 }, (_, i) => {
      const p = radarPos(i, gr);
      return `${p.x},${p.y}`;
    }).join(' ');
    return pts;
  });

  // Build data polygon
  const dataPoints = Array.from({ length: 9 }, (_, i) => {
    const s = scores[i + 1] || 0;
    const norm = s / maxScore;
    const r = Math.max(R * 0.05, R * norm);
    return radarPos(i, r);
  });
  const dataPolygonStr = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Spokes
  const spokes = Array.from({ length: 9 }, (_, i) => {
    const outer = radarPos(i, R);
    return { x1: CX, y1: CY, x2: outer.x, y2: outer.y };
  });

  // Labels
  const labels = Array.from({ length: 9 }, (_, i) => {
    const p = radarPos(i, R + 18);
    return { x: p.x, y: p.y, num: i + 1 };
  });

  return (
    <Svg width={size} height={size} viewBox="0 0 300 300">
      {/* Guide polygons */}
      {guidePolygons.map((pts, idx) => (
        <Polygon
          key={`guide-${idx}`}
          points={pts}
          fill="transparent"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={0.8}
        />
      ))}

      {/* Spokes */}
      {spokes.map((s, idx) => (
        <Line
          key={`spoke-${idx}`}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={0.6}
        />
      ))}

      {/* Labels */}
      {labels.map((l) => (
        <SvgText
          key={`label-${l.num}`}
          x={l.x}
          y={l.y}
          fill={l.num === topType ? '#e8a06a' : '#667788'}
          fontSize={12}
          fontWeight={l.num === topType ? 'bold' : 'normal'}
          textAnchor="middle"
          alignmentBaseline="central"
        >
          {l.num}
        </SvgText>
      ))}

      {/* Data polygon */}
      <Polygon
        points={dataPolygonStr}
        fill="rgba(192,113,58,0.15)"
        stroke="#c0713a"
        strokeWidth={1.5}
      />

      {/* Data dots */}
      {dataPoints.map((p, i) => {
        const isTop = i + 1 === topType;
        return (
          <Circle
            key={`dot-${i}`}
            cx={p.x}
            cy={p.y}
            r={isTop ? 5 : 3}
            fill={isTop ? '#e8a06a' : '#c0713a'}
          />
        );
      })}

      {/* Arrow from center toward weighted centroid */}
      <Line
        x1={CX}
        y1={CY}
        x2={arrow.x}
        y2={arrow.y}
        stroke="#e8a06a"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx={arrow.x} cy={arrow.y} r={4} fill="#e8a06a" />
    </Svg>
  );
}
