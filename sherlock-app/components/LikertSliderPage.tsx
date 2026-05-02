// ═══════════════════════════════════════════════════════════════
//  LIKERT SLIDER PAGE
//  Rend N lignes, chacune avec une affirmation + un slider -5..+5
//  (11 positions discrètes). Valeur par défaut : 0 (sans avis).
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent, GestureResponderEvent } from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import type { AgeBand } from '../constants/quiz_v3';
import { findStmt } from '../constants/quiz_v3';
import { useT, getStmtText } from '../i18n';

interface Props {
  stmtIds: string[];
  responses: Record<string, number>;
  ageBand: AgeBand;
  onChange: (stmtId: string, value: number) => void;
  subtitle?: string;
  hint?: string;
}

const MIN = -5;
const MAX = 5;
const STEPS = MAX - MIN; // 10

/** Une ligne = un slider pour un statement */
function SliderRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef<View>(null);

  const onLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const setFromX = (x: number) => {
    if (trackWidth <= 0) return;
    // Clamp x to [0, trackWidth]
    const clamped = Math.max(0, Math.min(trackWidth, x));
    // Map to [MIN, MAX]
    const ratio = clamped / trackWidth;
    const raw = MIN + ratio * STEPS;
    const snapped = Math.round(raw);
    const bounded = Math.max(MIN, Math.min(MAX, snapped));
    if (bounded !== value) onChange(bounded);
  };

  // Thumb position as percentage
  const thumbPct = ((value - MIN) / STEPS) * 100;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.sliderWrap}>
        <Text style={[styles.polarity, styles.polarityLeft]}>−</Text>

        <View
          ref={trackRef}
          onLayout={onLayout}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={(e: GestureResponderEvent) => {
            setFromX(e.nativeEvent.locationX);
          }}
          onResponderMove={(e: GestureResponderEvent) => {
            setFromX(e.nativeEvent.locationX);
          }}
          style={styles.track}
        >
          {/* Tick marks */}
          <View style={styles.ticks}>
            {Array.from({ length: STEPS + 1 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.tick,
                  i === STEPS / 2 && styles.tickCenter,
                ]}
              />
            ))}
          </View>

          {/* Thumb */}
          <View
            style={[
              styles.thumb,
              { left: `${thumbPct}%` },
              value > 0 && styles.thumbPos,
              value < 0 && styles.thumbNeg,
            ]}
          />
        </View>

        <Text style={[styles.polarity, styles.polarityRight]}>+</Text>
      </View>
    </View>
  );
}

export default function LikertSliderPage({
  stmtIds,
  responses,
  ageBand,
  onChange,
  subtitle,
  hint,
}: Props) {
  const { locale } = useT();
  return (
    <View style={styles.container}>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {hint && <Text style={styles.hint}>{hint}</Text>}

      {stmtIds.map((sid) => {
        const stmt = findStmt(sid, ageBand);
        if (!stmt) return null;
        return (
          <SliderRow
            key={sid}
            label={getStmtText(stmt as any, locale)}
            value={responses[sid] ?? 0}
            onChange={(v) => onChange(sid, v)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },

  subtitle: {
    fontFamily: fonts.serif, fontSize: 18, color: colors.text,
    marginBottom: spacing.xs, lineHeight: 24,
  },
  hint: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted,
    fontStyle: 'italic', marginBottom: spacing.md,
  },

  row: {
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  label: {
    fontFamily: fonts.serif, fontSize: 14,
    color: colors.text, lineHeight: 18,
    marginBottom: spacing.md,
  },
  sliderWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  polarity: {
    fontFamily: fonts.serif, fontSize: 22, fontWeight: '700',
    width: 18, textAlign: 'center',
  },
  polarityLeft: { color: colors.error },
  polarityRight: { color: colors.success },

  track: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    position: 'relative',
  },
  ticks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.subtle12,
  },
  tick: {
    width: 2, height: 6, backgroundColor: colors.subtle25,
  },
  tickCenter: {
    width: 3, height: 10, backgroundColor: colors.subtle55,
  },
  thumb: {
    position: 'absolute',
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: colors.accent,
    borderWidth: 2, borderColor: colors.bg,
    marginLeft: -11, // center on position
    top: 5,
  },
  thumbPos: { backgroundColor: colors.success },
  thumbNeg: { backgroundColor: colors.error },
});
