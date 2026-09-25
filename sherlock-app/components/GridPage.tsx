// ═══════════════════════════════════════════════════════════════
//  GRID PAGE — the "compass": place a point on a 3×3 grid.
//  Horizontal axis: how one behaves with others; vertical axis: how one
//  reacts when things go wrong (labels per age band in quiz_v3 GRID_LABELS).
//  Each cell stands for one type, but no type is shown: one places oneself,
//  one doesn't aim at a type.
//
//  DRAG ONLY, like the sliders: the point moves only when it is grabbed.
//  It starts in the centre as an empty ring and counts only once moved
//  (the centre cell is a type too, so an untouched point must not count).
//  The position is continuous: between two cells is a valid answer.
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, PanResponder, Pressable, useWindowDimensions, Platform, AccessibilityInfo,
} from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { GRID_LABELS, type AgeBand } from '../constants/quiz_v3';
import { useT } from '../i18n';
import { hapticSelection } from '../utils/haptics';

interface Props {
  ageBand: AgeBand;
  point: { x: number; y: number } | null;
  skipped: boolean;
  onChange: (x: number, y: number) => void;
  onSkip: () => void;
  /** true while the point is being dragged (the screen stops scrolling). */
  onDragChange?: (dragging: boolean) => void;
}

const GRAB = 48;          // grab zone around the point (≥ 44pt)
const DOT = 26;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const cellOf = (v: number) => Math.min(2, Math.floor(v * 3));

export default function GridPage({ ageBand, point, skipped, onChange, onSkip, onDragChange }: Props) {
  const { t, locale } = useT();
  const { width } = useWindowDimensions();
  const L = GRID_LABELS[ageBand];
  const en = locale === 'en';

  // Square grid; the row labels take a column on the left. Sized from the
  // measured row width (fallback: screen minus the two levels of padding,
  // the quiz's and this page's).
  const labelCol = 92;
  const [rowW, setRowW] = useState(0);
  const size = Math.max(160, Math.min(300, (rowW || width - spacing.md * 4) - labelCol - spacing.sm));

  // Local position while dragging (committed to the quiz on release only,
  // so the whole screen does not re-render at every move).
  const [pos, setPos] = useState<{ x: number; y: number }>(point ?? { x: 0.5, y: 0.5 });
  const [dragging, setDragging] = useState(false);
  const moved = useRef(false);
  const posRef = useRef(pos);
  posRef.current = pos;
  const start = useRef(pos);
  const sizeRef = useRef(size);
  sizeRef.current = size;
  const cbs = useRef({ onChange, onDragChange });
  cbs.current = { onChange, onDragChange };

  // Re-sync when the page changes (e.g. coming back with "Précédent").
  useEffect(() => { if (point) setPos(point); }, [point?.x, point?.y]);

  const pan = useRef(
    PanResponder.create({
      // Touching the point itself means "I want to move it": grab at once so
      // the page does not scroll instead. Anywhere else, the page scrolls.
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        start.current = posRef.current;
        moved.current = false;
        setDragging(true);
        cbs.current.onDragChange?.(true);
      },
      onPanResponderMove: (_e, g) => {
        const s = sizeRef.current;
        if (s <= 0) return;
        if (!moved.current && Math.abs(g.dx) + Math.abs(g.dy) < 3) return;
        moved.current = true;
        const next = { x: clamp01(start.current.x + g.dx / s), y: clamp01(start.current.y + g.dy / s) };
        const prev = posRef.current;
        if (cellOf(next.x) !== cellOf(prev.x) || cellOf(next.y) !== cellOf(prev.y)) hapticSelection();
        posRef.current = next;
        setPos(next);
      },
      onPanResponderRelease: () => finish(),
      onPanResponderTerminate: () => finish(),
    }),
  ).current;

  function finish() {
    setDragging(false);
    cbs.current.onDragChange?.(false);
    if (moved.current) cbs.current.onChange(posRef.current.x, posRef.current.y);
  }

  const placed = !!point;
  const yLabels = en ? L.yEn : L.y;
  const xLabels = en ? L.xEn : L.x;

  // Screen readers: move one cell at a time, and say where the point is.
  const step = (dx: number, dy: number) => {
    const nx = Math.max(0, Math.min(2, cellOf(posRef.current.x) + dx));
    const ny = Math.max(0, Math.min(2, cellOf(posRef.current.y) + dy));
    const next = { x: (nx + 0.5) / 3, y: (ny + 0.5) / 3 };
    posRef.current = next;
    setPos(next);
    onChange(next.x, next.y);
    AccessibilityInfo.announceForAccessibility(`${xLabels[nx]}, ${yLabels[ny]}`);
  };
  const A = {
    right: t('quizGrid.a11yRight'),
    left: t('quizGrid.a11yLeft'),
    up: t('quizGrid.a11yUp'),
    down: t('quizGrid.a11yDown'),
  };
  const valueText = placed || dragging
    ? `${xLabels[cellOf(pos.x)]}, ${yLabels[cellOf(pos.y)]}`
    : t('quizGrid.a11yNotPlaced');

  return (
    <View style={styles.wrap}>
      <Text style={styles.subtitle}>{en ? L.subtitleEn : L.subtitle}</Text>
      <Text style={styles.hint}>{t('quizGrid.dragHint')}</Text>

      <Text style={styles.axisTitle}>{en ? L.yTitleEn : L.yTitle}</Text>
      <View style={styles.gridRow} onLayout={(e) => setRowW(e.nativeEvent.layout.width)}>
        {/* Row labels (vertical axis) */}
        <View style={[styles.rowLabels, { width: labelCol, height: size }]}>
          {yLabels.map((lab, i) => (
            <View key={i} style={styles.rowLabelCell}>
              <Text style={styles.rowLabel} numberOfLines={4} adjustsFontSizeToFit minimumFontScale={0.8}>{lab}</Text>
            </View>
          ))}
        </View>

        {/* The grid */}
        <View
          style={[styles.grid, { width: size, height: size }]}
          accessible
          accessibilityRole="adjustable"
          accessibilityLabel={`${en ? L.xTitleEn : L.xTitle} ${en ? L.yTitleEn : L.yTitle}`}
          accessibilityHint={t('quizGrid.a11y')}
          accessibilityValue={{ text: valueText }}
          accessibilityActions={Platform.OS === 'ios'
            // iOS (Fabric) reads the action name aloud: it must be the translated text.
            // Swipe up/down on an adjustable element still sends increment/decrement.
            ? [{ name: A.right }, { name: A.left }, { name: A.up }, { name: A.down }]
            : [
                { name: 'increment', label: A.right },
                { name: 'decrement', label: A.left },
                { name: 'moveUp', label: A.up },
                { name: 'moveDown', label: A.down },
              ]}
          onAccessibilityAction={(e) => {
            const a = e.nativeEvent.actionName;
            if (a === 'increment' || a === A.right) step(1, 0);
            else if (a === 'decrement' || a === A.left) step(-1, 0);
            else if (a === 'moveUp' || a === A.up) step(0, -1);
            else if (a === 'moveDown' || a === A.down) step(0, 1);
          }}
        >
          {[1, 2].map((k) => (
            <View key={`v${k}`} pointerEvents="none" style={[styles.lineV, { left: (size * k) / 3 }]} />
          ))}
          {[1, 2].map((k) => (
            <View key={`h${k}`} pointerEvents="none" style={[styles.lineH, { top: (size * k) / 3 }]} />
          ))}

          {/* The point, inside its grab zone */}
          <View
            style={[
              styles.grab,
              { left: pos.x * size - GRAB / 2, top: pos.y * size - GRAB / 2 },
            ]}
            {...pan.panHandlers}
          >
            <View
              pointerEvents="none"
              style={[
                styles.dot,
                (placed || dragging) ? styles.dotPlaced : styles.dotGhost,
                dragging && styles.dotActive,
              ]}
            />
          </View>
        </View>
      </View>

      {/* Column labels (horizontal axis) */}
      <View style={[styles.colLabels, { marginLeft: labelCol + spacing.sm, width: size }]}>
        {xLabels.map((lab, i) => (
          <Text key={i} style={styles.colLabel}>{lab}</Text>
        ))}
      </View>
      <Text style={[styles.axisTitle, styles.axisTitleX]}>{en ? L.xTitleEn : L.xTitle}</Text>

      <Pressable
        onPress={onSkip}
        accessibilityRole="button"
        style={({ pressed }) => [styles.skip, pressed && { opacity: 0.6 }]}
      >
        <Text style={[styles.skipText, skipped && styles.skipTextOn]}>
          {skipped ? '✓ ' : ''}{t('quizGrid.skip')}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  subtitle: {
    fontFamily: fonts.serif, fontSize: 18, color: colors.text,
    marginBottom: spacing.xs, lineHeight: 24,
  },
  hint: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted,
    fontStyle: 'italic', marginBottom: spacing.md,
  },
  axisTitle: {
    fontFamily: fonts.sans, fontSize: 12, fontWeight: '700', color: colors.accentText,
    marginBottom: spacing.sm,
  },
  axisTitleX: { textAlign: 'center', marginTop: spacing.xs },
  gridRow: { flexDirection: 'row', gap: spacing.sm },
  rowLabels: { justifyContent: 'space-between' },
  rowLabelCell: { flex: 1, justifyContent: 'center' },
  rowLabel: { fontFamily: fonts.sans, fontSize: 11.5, lineHeight: 15, color: colors.textSoft, textAlign: 'right' },
  grid: {
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    position: 'relative',
  },
  lineV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: colors.border },
  lineH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: colors.border },
  grab: {
    position: 'absolute', width: GRAB, height: GRAB,
    alignItems: 'center', justifyContent: 'center',
  },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2 },
  dotGhost: { borderWidth: 2, borderColor: colors.accentLight, borderStyle: 'dashed', backgroundColor: 'transparent' },
  dotPlaced: { backgroundColor: colors.accent, borderWidth: 2, borderColor: colors.bg },
  dotActive: { transform: [{ scale: 1.2 }], borderColor: colors.white },
  colLabels: { flexDirection: 'row', marginTop: spacing.sm },
  colLabel: {
    flex: 1, fontFamily: fonts.sans, fontSize: 11.5, lineHeight: 15,
    color: colors.textSoft, textAlign: 'center', paddingHorizontal: 2,
  },
  skip: { alignSelf: 'center', minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.md, marginTop: spacing.sm },
  skipText: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, textDecorationLine: 'underline' },
  skipTextOn: { color: colors.accentText, textDecorationLine: 'none', fontWeight: '600' },
});
