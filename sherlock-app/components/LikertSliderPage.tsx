// ═══════════════════════════════════════════════════════════════
//  LIKERT SLIDER PAGE
//  Rend N lignes, chacune avec une affirmation + un slider -5..+5
//  (11 positions discrètes). Valeur par défaut : 0 (sans avis).
// ═══════════════════════════════════════════════════════════════

import React, { useRef } from 'react';
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
 *  Drag handled by a PanResponder so the thumb can be grabbed and slid:
 *   - claims only HORIZONTAL gestures → the surrounding ScrollView still scrolls
 *     vertically, and won't steal the drag once it starts;
 *   - tracks the finger in absolute pageX against the measured track, so the
 *     value follows smoothly even if the finger drifts off the bar;
 *   - reads value/onChange/geometry via refs so the once-created responder
 *     always uses fresh data (no stale closure). */
function SliderRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const trackRef = useRef<View>(null);
  // Track geometry in window coords. X is stable across vertical scroll.
  const geom = useRef({ left: 0, width: 0 });
  const valueRef = useRef(value);
  valueRef.current = value;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const measure = () => {
    trackRef.current?.measureInWindow((x, _y, w) => {
      if (w > 0) geom.current = { left: x, width: w };
    });
  };

  const setFromPageX = (pageX: number) => {
    const { left, width } = geom.current;
    if (width <= 0) return;
    const ratio = Math.max(0, Math.min(1, (pageX - left) / width));
    const bounded = Math.max(MIN, Math.min(MAX, Math.round(MIN + ratio * STEPS)));
    if (bounded !== valueRef.current) {
      hapticSelection();
      onChangeRef.current(bounded);
    }
  };

  const pan = useRef(
    PanResponder.create({
      // A tap grants immediately (tap-to-position still works)…
      onStartShouldSetPanResponder: () => true,
      // …but a drag is only claimed when it's mostly horizontal, so vertical
      // scrolling of the page is preserved.
      onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dx) > Math.abs(g.dy) && Math.abs(g.dx) > 2,
      // Once we own the gesture, don't let the ScrollView reclaim it.
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => { measure(); setFromPageX(e.nativeEvent.pageX); },
      onPanResponderMove: (e) => setFromPageX(e.nativeEvent.pageX),
    }),
  ).current;

  // Thumb position as percentage
  const thumbPct = ((value - MIN) / STEPS) * 100;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.sliderWrap}>
        <Text style={[styles.polarity, styles.polarityLeft]}>−</Text>

        <View
          ref={trackRef}
          onLayout={measure}
          hitSlop={{ top: 12, bottom: 12 }}
          style={styles.track}
          {...pan.panHandlers}
        >
          {/* Tick marks */}
          <View style={styles.ticks} pointerEvents="none">
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
            pointerEvents="none"
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
