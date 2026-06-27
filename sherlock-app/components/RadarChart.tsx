import React from 'react';
import Svg, {
  Polygon, Line, Circle, Text as SvgText, Defs, RadialGradient, Stop,
} from 'react-native-svg';
import { CX, CY, R, radarPos, computeArrow, getTopType } from '../utils/radar';
import { colors } from '../constants/theme';
import { TYPES } from '../constants/data';

interface RadarChartProps {
  scores: Record<number, number>;
  size?: number;
}

const typeColor = (n: number): string => TYPES[n - 1]?.color ?? colors.accent;

export default function RadarChart({ scores, size = 280 }: RadarChartProps) {
  const topType = getTopType(scores);
  const maxScore = Math.max(1, ...Object.values(scores));
  const arrow = computeArrow(scores);

  // Concentric guide rings (4 levels, innermost faintly filled).
  const guideRadii = [R * 0.25, R * 0.5, R * 0.75, R];
  const guidePolygons = guideRadii.map((gr) =>
    Array.from({ length: 9 }, (_, i) => {
      const p = radarPos(i, gr);
      return `${p.x},${p.y}`;
    }).join(' '),
  );

  // Data shape.
  const dataPoints = Array.from({ length: 9 }, (_, i) => {
    const s = scores[i + 1] || 0;
    const norm = s / maxScore;
    const r = Math.max(R * 0.06, R * norm);
    return radarPos(i, r);
  });
  const dataStr = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');
  // Soft halo: the same shape pushed out slightly from the center.
  const haloStr = dataPoints
    .map((p) => `${CX + (p.x - CX) * 1.08},${CY + (p.y - CY) * 1.08}`)
    .join(' ');

  const spokes = Array.from({ length: 9 }, (_, i) => {
    const o = radarPos(i, R);
    return { x2: o.x, y2: o.y };
  });
  const labels = Array.from({ length: 9 }, (_, i) => {
    const p = radarPos(i, R + 18);
    return { x: p.x, y: p.y, num: i + 1 };
  });

  return (
    <Svg width={size} height={size} viewBox="0 0 300 300">
      <Defs>
        <RadialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={colors.accentLight} stopOpacity={0.5} />
          <Stop offset="100%" stopColor={colors.accent} stopOpacity={0.12} />
        </RadialGradient>
      </Defs>

      {/* Guide rings */}
      {guidePolygons.map((pts, idx) => (
        <Polygon
          key={`guide-${idx}`}
          points={pts}
          fill={idx === 0 ? colors.subtle05 : 'none'}
          stroke={colors.subtle12}
          strokeWidth={0.7}
        />
      ))}

      {/* Spokes */}
      {spokes.map((s, idx) => (
        <Line
          key={`spoke-${idx}`}
          x1={CX}
          y1={CY}
          x2={s.x2}
          y2={s.y2}
          stroke={colors.subtle06}
          strokeWidth={0.6}
        />
      ))}

      {/* Soft halo behind the shape (fake glow) */}
      <Polygon points={haloStr} fill={colors.accent} opacity={0.1} />

      {/* Data polygon with radial gradient fill */}
      <Polygon
        points={dataStr}
        fill="url(#radarFill)"
        stroke={colors.accent}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Vertices, colored by their type */}
      {dataPoints.map((p, i) => {
        const isTop = i + 1 === topType;
        return (
          <Circle
            key={`dot-${i}`}
            cx={p.x}
            cy={p.y}
            r={isTop ? 5.5 : 3.5}
            fill={typeColor(i + 1)}
            stroke={colors.bg}
            strokeWidth={isTop ? 2 : 1}
          />
        );
      })}

      {/* Labels */}
      {labels.map((l) => (
        <SvgText
          key={`label-${l.num}`}
          x={l.x}
          y={l.y}
          fill={l.num === topType ? colors.accentLight : colors.textDim}
          fontSize={l.num === topType ? 13 : 11}
          fontWeight={l.num === topType ? 'bold' : 'normal'}
          textAnchor="middle"
          alignmentBaseline="central"
        >
          {l.num}
        </SvgText>
      ))}

      {/* Arrow toward the weighted centroid */}
      <Line
        x1={CX}
        y1={CY}
        x2={arrow.x}
        y2={arrow.y}
        stroke={colors.accentLight}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.9}
      />
      <Circle cx={arrow.x} cy={arrow.y} r={4.5} fill={colors.accentLight} stroke={colors.bg} strokeWidth={1.5} />
    </Svg>
  );
}
