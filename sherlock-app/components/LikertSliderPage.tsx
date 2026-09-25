// ═══════════════════════════════════════════════════════════════
//  LIKERT SLIDER PAGE
//  Rend N lignes, chacune avec une affirmation + un slider -5..+5
//  (11 positions discrètes). Valeur par défaut : 0 (sans avis).
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import type { AgeBand } from '../constants/quiz_v3';
import { findStmt } from '../constants/quiz_v3';
import { useT, getStmtText } from '../i18n';
import { hapticSelection } from '../utils/haptics';

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

/** Une ligne = un slider pour un statement.
 *  DRAG ONLY: the value changes only when the thumb itself is grabbed and
 *  slid. Taps on the track do nothing (they used to jump the value, a very
 *  frequent mis-touch while scrolling).
 *   - the pan handlers live on a 44×44 grab zone centred on the thumb;
 *   - a gesture is claimed only once it moves mostly HORIZONTALLY, so a
 *     vertical swipe starting anywhere (even on the thumb) scrolls the page;
 *   - the drag is relative (start value + dx), so grabbing the zone off-centre
 *     never makes the value jump;
 *   - screen readers get an "adjustable" control (swipe up/down = ±1). */
function SliderRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [trackW, setTrackW] = useState(0);
  const [active, setActive] = useState(false);
  const trackWRef = useRef(0);
  const valueRef = useRef(value);
  valueRef.current = value;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const startValue = useRef(value);

  const commit = (v: number) => {
    const bounded = Math.max(MIN, Math.min(MAX, Math.round(v)));
    if (bounded !== valueRef.current) {
      hapticSelection();
      valueRef.current = bounded;
      onChangeRef.current(bounded);
    }
  };

  const pan = useRef(
    PanResponder.create({
      // A tap does nothing: only a real drag of the thumb moves the value.
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dx) > 3 && Math.abs(g.dx) > Math.abs(g.dy),
      // Once we own the gesture, don't let the ScrollView reclaim it.
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => { startValue.current = valueRef.current; setActive(true); },
      onPanResponderMove: (_e, g) => {
        const w = trackWRef.current;
        if (w > 0) commit(startValue.current + (g.dx / w) * STEPS);
      },
      onPanResponderRelease: () => setActive(false),
      onPanResponderTerminate: () => setActive(false),
    }),
  ).current;

  const ratio = (value - MIN) / STEPS;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.sliderWrap}>
        <Text style={[styles.polarity, styles.polarityLeft]}>−</Text>

        <View
          style={styles.rail}
          accessible
          accessibilityRole="adjustable"
          accessibilityLabel={label}
          accessibilityValue={{ min: MIN, max: MAX, now: value, text: String(value) }}
          accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
          onAccessibilityAction={(e) => {
            if (e.nativeEvent.actionName === 'increment') commit(valueRef.current + 1);
            if (e.nativeEvent.actionName === 'decrement') commit(valueRef.current - 1);
          }}
        >
          {/* Tick marks (passive: touching the track does nothing) */}
          <View
            style={styles.ticks}
            pointerEvents="none"
            onLayout={(e) => {
              const w = e.nativeEvent.layout.width;
              trackWRef.current = w;
              setTrackW(w);
            }}
          >
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

          {/* Grab zone 44×44, centred on the thumb: the only draggable part */}
          {trackW > 0 && (
            <View
              style={[styles.grab, { left: ratio * trackW }]}
              {...pan.panHandlers}
            >
              <View
                pointerEvents="none"
                style={[
                  styles.thumb,
                  value > 0 && styles.thumbPos,
                  value < 0 && styles.thumbNeg,
                  active && styles.thumbActive,
                ]}
              />
            </View>
          )}
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
  const { t, locale } = useT();
  return (
    <View style={styles.container}>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {hint && <Text style={styles.hint}>{hint}</Text>}

      {/* Verbal scale anchors so the slider direction is unambiguous. */}
      <View style={styles.scaleLegend}>
        <Text style={styles.scaleLegendText}>← {t('quiz.scaleLeft')}</Text>
        <Text style={styles.scaleLegendText}>{t('quiz.scaleRight')} →</Text>
      </View>

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

  scaleLegend: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: spacing.sm, paddingHorizontal: spacing.xs,
  },
  scaleLegendText: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '600',
    color: colors.textMuted, letterSpacing: 0.3,
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
    marginBottom: spacing.sm,
  },
  sliderWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  polarity: {
    fontFamily: fonts.serif, fontSize: 22, fontWeight: '700',
    width: 18, textAlign: 'center',
  },
  polarityLeft: { color: colors.error },
  polarityRight: { color: colors.success },

  // 44pt tall rail; the tick bar is inset by half the grab zone so the thumb
  // (and its 44pt zone) stays inside the rail even at -5 / +5.
  rail: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    position: 'relative',
  },
  ticks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 6,
    marginHorizontal: 22,
    borderRadius: 3,
    backgroundColor: colors.subtle12,
  },
  tick: {
    width: 2, height: 6, backgroundColor: colors.subtle25,
  },
  tickCenter: {
    width: 3, height: 10, backgroundColor: colors.subtle55,
  },
  grab: {
    position: 'absolute',
    top: 0,
    width: 44, height: 44,
    alignItems: 'center', justifyContent: 'center',
  },
  thumb: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: colors.accent,
    borderWidth: 2, borderColor: colors.bg,
  },
  thumbActive: {
    transform: [{ scale: 1.2 }],
    borderColor: colors.white,
  },
  thumbPos: { backgroundColor: colors.success },
  thumbNeg: { backgroundColor: colors.error },
});
