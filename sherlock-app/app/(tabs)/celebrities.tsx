import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet,
  Animated, useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import {
  FICHES, TYPE_NAMES, TYPE_COLORS, FUN_FACTS,
  type EnqueteCase, type CitationCase, type FauxAmisCase, type DetailCase,
} from '../../constants/dossiers';
import {
  RANKS_EN, TYPE_NAMES_EN, FICHES_EN, CASES_EN, FUN_FACTS_EN,
  type EnqueteCaseEn, type CitationCaseEn, type FauxAmisCaseEn, type DetailCaseEn,
} from '../../i18n/dossiers_en';
import { useDossier, getRankInfo } from '../../hooks/useDossier';
import { trackScreen } from '../../constants/firebase';
import { useT, type Locale } from '../../i18n';

// ── Locale-aware lookups (field-level fallback) ──
// In EN, prefer the EN translation; if a field is missing, fall back to FR.

function getFicheLocalized(id: string, locale: Locale) {
  const fr = FICHES.find(f => f.id === id);
  if (!fr) return null;
  const en = locale === 'en' ? FICHES_EN[id] : null;
  return {
    ...fr,
    name:        en?.name        ?? fr.name,
    quote:       en?.quote       ?? fr.quote,
    quoteSource: en?.quoteSource ?? fr.quoteSource,
    coreFear:    en?.coreFear    ?? fr.coreFear,
    coreDesire:  en?.coreDesire  ?? fr.coreDesire,
    whyThisType: en?.whyThisType ?? fr.whyThisType,
  };
}

function getTypeName(typeNum: number, locale: Locale): string {
  if (locale === 'en' && TYPE_NAMES_EN[typeNum]) return TYPE_NAMES_EN[typeNum];
  return TYPE_NAMES[typeNum];
}

function getRankTitle(title: string, id: number, locale: Locale): string {
  if (locale === 'en' && RANKS_EN[id]) return RANKS_EN[id];
  return title;
}

function getCaseLocalized<C extends EnqueteCase | CitationCase | FauxAmisCase | DetailCase>(
  cas: C,
  locale: Locale,
): C {
  if (locale !== 'en') return cas;
  const en = CASES_EN[cas.id];
  if (!en) return cas;
  if (cas.format === 'enquete') {
    const eEn = en as EnqueteCaseEn;
    return {
      ...cas,
      indices: eEn.indices ?? cas.indices,
      explanation: eEn.explanation ?? cas.explanation,
    } as C;
  }
  if (cas.format === 'citation') {
    const cEn = en as CitationCaseEn;
    return {
      ...cas,
      quote: cEn.quote ?? cas.quote,
      author: cEn.author ?? cas.author,
      explanation: cEn.explanation ?? cas.explanation,
    } as C;
  }
  if (cas.format === 'faux_amis') {
    const fEn = en as FauxAmisCaseEn;
    return {
      ...cas,
      descA: fEn.descA ?? cas.descA,
      descB: fEn.descB ?? cas.descB,
      keyDiff: fEn.keyDiff ?? cas.keyDiff,
    } as C;
  }
  if (cas.format === 'detail') {
    const dEn = en as DetailCaseEn;
    return {
      ...cas,
      scene: dEn.scene ?? cas.scene,
      keyDetail: dEn.keyDetail ?? cas.keyDetail,
      explanation: dEn.explanation ?? cas.explanation,
    } as C;
  }
  return cas;
}

function getFunFactLocalized(id: string, locale: Locale): string | undefined {
  if (locale === 'en' && FUN_FACTS_EN[id]) return FUN_FACTS_EN[id];
  return FUN_FACTS[id];
}

// ─────────────────────────────────────────────
//  Petits composants réutilisables
// ─────────────────────────────────────────────

function TypeBadge({ typeNum, size = 'md' }: { typeNum: number; size?: 'sm' | 'md' }) {
  const { locale } = useT();
  const color = TYPE_COLORS[typeNum] ?? colors.accent;
  const isSmall = size === 'sm';
  return (
    <View style={[styles.typeBadge, { backgroundColor: color + '33', borderColor: color }, isSmall && styles.typeBadgeSm]}>
      <Text style={[styles.typeBadgeNum, { color }, isSmall && styles.typeBadgeNumSm]}>{typeNum}</Text>
      {!isSmall && <Text style={[styles.typeBadgeName, { color }]} numberOfLines={1}>{getTypeName(typeNum, locale)}</Text>}
    </View>
  );
}

function XpChip({ value }: { value: number }) {
  const scale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 120, friction: 6 }).start();
  }, []);
  return (
    <Animated.View style={[styles.xpChip, { transform: [{ scale }] }]}>
      <Text style={styles.xpChipText}>+{value} XP</Text>
    </Animated.View>
  );
}

// ── Rank + XP progression card (hero block at the top of the hub).
//
// Now gets more visual weight (bigger emoji, serif title, thicker bar,
// explicit "next rank" preview) because the hub only has 2 play cards,
// leaving room for progression to shine. ──
function SherlockBar({ xp }: { xp: number }) {
  const { t, locale } = useT();
  const info = getRankInfo(xp);
  const animWidth = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animWidth, { toValue: info.progress, duration: 800, useNativeDriver: false }).start();
  }, [info.progress]);

  const xpToNext = info.next ? info.next.xpRequired - xp : 0;
  const currentTitle = getRankTitle(info.current.title, info.current.id, locale);
  const nextTitle = info.next ? getRankTitle(info.next.title, info.next.id, locale) : '';

  return (
    <View style={styles.sherlockBarWrap}>
      <View style={styles.sherlockBarHeader}>
        <View style={styles.sherlockBarRankRow}>
          <Text style={styles.sherlockBarEmoji}>{info.current.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.sherlockBarRankLabel}>{t('dossiers.rankCurrent')}</Text>
            <Text style={styles.sherlockBarRankName}>{currentTitle}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.sherlockBarXPLabel}>{t('dossiers.rankXp')}</Text>
            <Text style={styles.sherlockBarXPValue}>{xp}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sherlockBarTrack}>
        <Animated.View
          style={[styles.sherlockBarFill, {
            width: animWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
          }]}
        />
      </View>

      <View style={styles.sherlockBarFooter}>
        {info.next ? (
          <Text style={styles.sherlockBarNext}>
            <Text style={{ color: colors.accent, fontWeight: '700' }}>{xpToNext} XP</Text>
            {` ${t('dossiers.rankUntil')} `}
            <Text style={{ color: colors.text }}>{info.next.emoji} {nextTitle}</Text>
          </Text>
        ) : (
          <Text style={styles.sherlockBarNext}>{t('dossiers.rankMax')}</Text>
        )}
      </View>
    </View>
  );
}

// ── Simple "celebration" overlay with bouncing emojis (cheap confetti) ──
function CelebrationBurst() {
  const items = ['🎉', '✨', '⭐', '🎊', '💫'];
  const anims = useRef(items.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(60, anims.map(a =>
      Animated.spring(a, { toValue: 1, useNativeDriver: true, tension: 80, friction: 5 })
    )).start();
  }, []);

  return (
    <View style={styles.celebrationRow} pointerEvents="none">
      {items.map((emoji, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.celebrationEmoji,
            {
              transform: [
                { scale: anims[i] },
                {
                  translateY: anims[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [40, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {emoji}
        </Animated.Text>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────
//  Écrans de jeu (inchangés sauf en-tête)
// ─────────────────────────────────────────────

function EnqueteScreen({ cas, playState, onRevealNext, onSubmit }: {
  cas: EnqueteCase; playState: any; onRevealNext: () => void; onSubmit: (type: number) => void;
}) {
  const { t, locale } = useT();
  const localCas = getCaseLocalized(cas, locale);
  const canRevealMore = playState.revealedIndices < localCas.indices.length;
  const answered = playState.answered;

  return (
    <View style={styles.playCard}>
      <View style={styles.playFormatTag}>
        <Text style={styles.playFormatText}>{t('dossiers.formatEnquete')}</Text>
        <Text style={styles.playXpHint}>
          {t('dossiers.xpIfCorrect', { n: localCas.xpValues[Math.min(playState.revealedIndices - 1, localCas.xpValues.length - 1)] })}
        </Text>
      </View>

      {localCas.indices.slice(0, playState.revealedIndices).map((indice, idx) => (
        <View key={idx} style={[styles.indiceRow, idx === playState.revealedIndices - 1 && styles.indiceRowNew]}>
          <Text style={styles.indiceNum}>#{idx + 1}</Text>
          <Text style={styles.indiceText}>{indice}</Text>
        </View>
      ))}

      {!answered && canRevealMore && (
        <Pressable onPress={onRevealNext} style={({ pressed }) => [styles.revealBtn, pressed && styles.revealBtnPressed]}>
          <Text style={styles.revealBtnText}>
            {t('dossiers.nextIndice', { n: localCas.xpValues[playState.revealedIndices] ?? 0 })}
          </Text>
        </Pressable>
      )}

      {!answered && (
        <>
          <Text style={styles.playPrompt}>{t('dossiers.promptType')}</Text>
          <TypeGrid onSelect={onSubmit} disabled={false} correct={null} selected={null} />
        </>
      )}
    </View>
  );
}

function CitationScreen({ cas, playState, onSubmit }: {
  cas: CitationCase; playState: any; onSubmit: (type: number) => void;
}) {
  const { t, locale } = useT();
  const localCas = getCaseLocalized(cas, locale);
  const answered = playState.answered;
  const stableOptions = [cas.answer, ...cas.wrongOptions].sort((a, b) => {
    const seed = cas.id.charCodeAt(0);
    return (a * seed) % 9 - (b * seed) % 9;
  });

  return (
    <View style={styles.playCard}>
      <View style={styles.playFormatTag}>
        <Text style={styles.playFormatText}>{t('dossiers.formatCitation')}</Text>
        <Text style={styles.playXpHint}>{t('dossiers.citationXp')}</Text>
      </View>

      <View style={styles.quoteBlock}>
        <Text style={styles.quoteText}>"{localCas.quote}"</Text>
        <Text style={styles.quoteAuthor}>— {localCas.author}</Text>
      </View>

      <Text style={styles.playPrompt}>{t('dossiers.promptCitationType')}</Text>

      <View style={styles.citationOptions}>
        {stableOptions.map(typeNum => {
          const isCorrect = typeNum === cas.answer;
          return (
            <Pressable
              key={typeNum}
              onPress={() => !answered && onSubmit(typeNum)}
              disabled={answered}
              style={({ pressed }) => [
                styles.citationOption,
                answered && isCorrect && styles.optCorrect,
                answered && !isCorrect && styles.optWrong,
                pressed && !answered && styles.optPressed,
              ]}
            >
              <TypeBadge typeNum={typeNum} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function TypeGrid({ onSelect, disabled, correct, selected }: {
  onSelect: (t: number) => void; disabled: boolean; correct: number | null; selected: number | null;
}) {
  const { locale } = useT();
  return (
    <View style={styles.typeGrid}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(typeNum => {
        const isCorrect = correct !== null && typeNum === correct;
        const isWrong = selected !== null && typeNum === selected && typeNum !== correct;
        return (
          <Pressable
            key={typeNum}
            onPress={() => !disabled && onSelect(typeNum)}
            disabled={disabled}
            style={({ pressed }) => [
              styles.typeGridBtn,
              isCorrect && styles.optCorrect,
              isWrong && styles.optWrong,
              pressed && !disabled && styles.optPressed,
            ]}
          >
            <Text style={[styles.typeGridNum, isCorrect && styles.textCorrect, isWrong && styles.textWrong]}>{typeNum}</Text>
            <Text style={[styles.typeGridName, isCorrect && styles.textCorrect]} numberOfLines={1}>
              {getTypeName(typeNum, locale)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// Big bicolored choice button for the faux_amis question type.
// Replaces the previous tiny TypeBadge button so the user clearly sees the
// type number AND its name, with a generous tap surface.
function FauxAmisChoiceBtn({
  typeNum, selected, disabled, onPress,
}: {
  typeNum: number;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  const { locale } = useT();
  const color = TYPE_COLORS[typeNum] ?? colors.accent;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.fauxAmisChoiceBtn,
        { borderColor: color, backgroundColor: color + '14' },
        selected && { backgroundColor: color + '33', borderWidth: 2 },
        pressed && !disabled && styles.optPressed,
      ]}
    >
      <View style={[styles.fauxAmisChoiceNum, { backgroundColor: color }]}>
        <Text style={styles.fauxAmisChoiceNumText}>{typeNum}</Text>
      </View>
      <Text
        style={[styles.fauxAmisChoiceName, { color }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        {getTypeName(typeNum, locale)}
      </Text>
    </Pressable>
  );
}

function FauxAmisScreen({ cas, playState, onSubmit }: {
  cas: FauxAmisCase; playState: any; onSubmit: (side: 'a' | 'b', type: number) => void;
}) {
  const { t, locale } = useT();
  const localCas = getCaseLocalized(cas, locale);
  const { fauxAmisAnswers, answered } = playState;
  const correctA = answered && fauxAmisAnswers.a === cas.typeA;
  const correctB = answered && fauxAmisAnswers.b === cas.typeB;

  return (
    <View style={styles.playCard}>
      <View style={styles.playFormatTag}>
        <Text style={styles.playFormatText}>{t('dossiers.formatFauxAmis')}</Text>
        <Text style={styles.playXpHint}>{t('dossiers.xpFlat', { n: cas.xp })}</Text>
      </View>
      <Text style={styles.fauxAmisIntro}>
        {t('dossiers.fauxAmisIntro')}
      </Text>

      <View style={[styles.fauxAmisBlock, answered && correctA && styles.fauxAmisBlockCorrect, answered && !correctA && styles.fauxAmisBlockWrong]}>
        <Text style={styles.fauxAmisLabel}>{t('dossiers.fauxAmisProfileA')}</Text>
        <Text style={styles.fauxAmisDesc}>{localCas.descA}</Text>
        {!answered || fauxAmisAnswers.a === null ? (
          <View style={styles.fauxAmisTypes}>
            {[cas.typeA, cas.typeB].sort().map(t => (
              <FauxAmisChoiceBtn
                key={t}
                typeNum={t}
                selected={fauxAmisAnswers.a === t}
                disabled={answered || fauxAmisAnswers.a !== null}
                onPress={() => !answered && fauxAmisAnswers.a === null && onSubmit('a', t)}
              />
            ))}
          </View>
        ) : (
          <TypeBadge typeNum={fauxAmisAnswers.a} />
        )}
      </View>

      <View style={[styles.fauxAmisBlock, answered && correctB && styles.fauxAmisBlockCorrect, answered && !correctB && styles.fauxAmisBlockWrong]}>
        <Text style={styles.fauxAmisLabel}>{t('dossiers.fauxAmisProfileB')}</Text>
        <Text style={styles.fauxAmisDesc}>{localCas.descB}</Text>
        {!answered || fauxAmisAnswers.b === null ? (
          <View style={styles.fauxAmisTypes}>
            {[cas.typeA, cas.typeB].sort().map(t => (
              <FauxAmisChoiceBtn
                key={t}
                typeNum={t}
                selected={fauxAmisAnswers.b === t}
                disabled={answered || fauxAmisAnswers.b !== null}
                onPress={() => !answered && fauxAmisAnswers.b === null && onSubmit('b', t)}
              />
            ))}
          </View>
        ) : (
          <TypeBadge typeNum={fauxAmisAnswers.b} />
        )}
      </View>

      {answered && (
        <View style={styles.keyDiffBox}>
          <Text style={styles.keyDiffLabel}>{t('dossiers.keyDiffLabel')}</Text>
          <Text style={styles.keyDiffText}>{localCas.keyDiff}</Text>
        </View>
      )}
    </View>
  );
}

function DetailScreen({ cas, playState, onSubmit }: {
  cas: DetailCase; playState: any; onSubmit: (type: number) => void;
}) {
  const { t, locale } = useT();
  const localCas = getCaseLocalized(cas, locale);
  const answered = playState.answered;
  return (
    <View style={styles.playCard}>
      <View style={styles.playFormatTag}>
        <Text style={styles.playFormatText}>{t('dossiers.formatDetail')}</Text>
        <Text style={styles.playXpHint}>{t('dossiers.xpFlat', { n: cas.xp })}</Text>
      </View>

      <View style={styles.sceneBlock}>
        <Text style={styles.sceneText}>{localCas.scene}</Text>
      </View>

      <Text style={styles.playPrompt}>{t('dossiers.promptDetailType')}</Text>

      {!answered ? (
        <TypeGrid onSelect={onSubmit} disabled={false} correct={null} selected={null} />
      ) : (
        <View style={styles.detailReveal}>
          <Text style={styles.detailKeyLabel}>{t('dossiers.detailKeyLabel')}</Text>
          <Text style={styles.detailKeyText}>{localCas.keyDetail}</Text>
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────
//  RevealScreen — enrichi avec fun fact + combo
// ─────────────────────────────────────────────

function RevealScreen({ playState, onNext, onViewFiche, onBack, onQuit }: {
  playState: any;
  onNext: () => void;
  onViewFiche: (id: string) => void;
  onBack: () => void;
  onQuit: () => void;
}) {
  const { t, locale } = useT();
  const c = playState.currentCase;
  const ficheId = (c as any).ficheId as string | undefined;
  const fiche = ficheId ? getFicheLocalized(ficheId, locale) : null;
  const answerType = c.format === 'faux_amis' ? null : (c as any).answer as number;
  const funFact = ficheId ? getFunFactLocalized(ficheId, locale) : null;

  // Locale-aware case content for the explanation/keyDiff body
  const localC = getCaseLocalized(c, locale);
  const explanationOrKeyDiff = (localC as any).explanation ?? (localC as any).keyDiff;

  const mode = playState.mode as 'entrainement' | 'daily';
  // Combo banner shows during the daily mission (which is the only mode that
  // now accumulates a combo with a bonus payout at the end).
  const showCombo = mode === 'daily' && playState.comboCount >= 2;
  const isLastInDaily = mode === 'daily' && playState.casesPlayedInSession + 1 >= 3;
  const nextLabel = isLastInDaily ? t('dossiers.seeSummary') : t('dossiers.nextCase');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.screenHeader}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>
          {mode === 'daily' ? t('dossiers.headerDaily') : t('dossiers.headerTraining')}
        </Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView style={styles.revealScroll} contentContainerStyle={styles.revealContent}>
        {/* Big result */}
        <View style={[styles.revealResult, playState.correct ? styles.revealCorrect : styles.revealWrong]}>
          {playState.correct && <CelebrationBurst />}
          <Text style={styles.revealResultIconBig}>{playState.correct ? '✓' : '✗'}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.revealResultLabel}>
              {playState.correct ? t('dossiers.revealCorrect') : t('dossiers.revealWrong')}
            </Text>
            {playState.xpEarned > 0 && <XpChip value={playState.xpEarned} />}
          </View>
        </View>

        {/* Combo indicator (daily mission only — the combo bonus lives there) */}
        {showCombo && (
          <View style={styles.comboBanner}>
            <Text style={styles.comboBannerText}>
              {playState.comboCount >= 3
                ? t('dossiers.comboBannerBonus', { n: playState.comboCount })
                : t('dossiers.comboBanner', { n: playState.comboCount })}
            </Text>
          </View>
        )}

        {answerType && (
          <View style={styles.revealTypeRow}>
            <TypeBadge typeNum={answerType} />
            <Text style={styles.revealTypeName}>{getTypeName(answerType, locale)}</Text>
          </View>
        )}

        <View style={styles.revealExplanation}>
          <Text style={styles.revealExplanationText}>{explanationOrKeyDiff}</Text>
        </View>

        {/* Did you know? */}
        {funFact && (
          <View style={styles.funFactCard}>
            <Text style={styles.funFactLabel}>{t('dossiers.funFactLabel')}</Text>
            <Text style={styles.funFactText}>{funFact}</Text>
          </View>
        )}

        {/* Suspect file unlocked */}
        {fiche && playState.correct && (
          <Pressable onPress={() => onViewFiche(fiche.id)} style={styles.ficheUnlockCard}>
            <View style={[styles.ficheUnlockDot, { backgroundColor: TYPE_COLORS[fiche.type] }]} />
            <View style={styles.ficheUnlockInfo}>
              <Text style={styles.ficheUnlockLabel}>{t('dossiers.ficheUnlockLabel')}</Text>
              <Text style={styles.ficheUnlockName}>{fiche.name}</Text>
            </View>
            <Text style={styles.ficheUnlockArrow}>›</Text>
          </Pressable>
        )}

        {/* Buttons */}
        <Pressable onPress={onNext} style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.85 }]}>
          <Text style={styles.nextBtnText}>{nextLabel}</Text>
        </Pressable>

        {mode === 'entrainement' && (
          <Pressable onPress={onQuit} style={styles.quitBtn}>
            <Text style={styles.quitBtnText}>{t('dossiers.quitTraining')}</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────
//  SessionSummary — bilan de fin de Mission du jour (3 cas)
// ─────────────────────────────────────────────

// Shown at the end of the daily mission (3 cases).
// Daily is one-shot per day — no "refaire" button; user is invited to come
// back tomorrow, or to keep playing in Entrainement.
function SessionSummaryScreen({ summary, onHome, onEntrainement }: {
  summary: any; onHome: () => void; onEntrainement: () => void;
}) {
  const { t } = useT();
  const allCorrect = summary.correct === summary.cases;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.screenHeader}>
        <View style={{ width: 44 }} />
        <Text style={styles.screenTitle}>{t('dossiers.headerDaily')}</Text>
        <View style={{ width: 44 }} />
      </View>
      <ScrollView contentContainerStyle={styles.summaryContent}>
        {allCorrect && <CelebrationBurst />}
        <Text style={styles.summaryEmoji}>{allCorrect ? '🏆' : '✓'}</Text>
        <Text style={styles.summaryTitle}>
          {allCorrect ? t('dossiers.summaryTitleAll') : t('dossiers.summaryTitle')}
        </Text>
        <Text style={styles.summaryScore}>{t('dossiers.summaryScore', { correct: summary.correct, total: summary.cases })}</Text>

        <View style={styles.summaryStats}>
          <View style={styles.summaryStatRow}>
            <Text style={styles.summaryStatLabel}>{t('dossiers.summaryXpEarned')}</Text>
            <Text style={styles.summaryStatValue}>+{summary.xpTotal} XP</Text>
          </View>
          {summary.comboBonus > 0 && (
            <View style={styles.summaryStatRow}>
              <Text style={styles.summaryStatLabel}>{t('dossiers.summaryComboBonus')}</Text>
              <Text style={[styles.summaryStatValue, { color: colors.accent }]}>+{summary.comboBonus} XP</Text>
            </View>
          )}
          <View style={styles.summaryStatRow}>
            <Text style={styles.summaryStatLabel}>{t('dossiers.summaryBestCombo')}</Text>
            <Text style={styles.summaryStatValue}>× {summary.bestCombo}</Text>
          </View>
          <View style={styles.summaryStatRow}>
            <Text style={styles.summaryStatLabel}>{t('dossiers.summaryStreak')}</Text>
            <Text style={[styles.summaryStatValue, { color: colors.accent }]}>{t('dossiers.summaryStreakValue')}</Text>
          </View>
        </View>

        <Text style={styles.summaryTomorrow}>
          {t('dossiers.summaryTomorrow')}
        </Text>

        <Pressable onPress={onEntrainement} style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.85 }]}>
          <Text style={styles.nextBtnText}>{t('dossiers.summaryContinueTraining')}</Text>
        </Pressable>
        <Pressable onPress={onHome} style={styles.quitBtn}>
          <Text style={styles.quitBtnText}>{t('dossiers.summaryHome')}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────
//  Pokédex Collection
// ─────────────────────────────────────────────

function CollectionScreen({ unlockedFiches, onFiche, onBack }: {
  unlockedFiches: string[]; onFiche: (id: string) => void; onBack: () => void;
}) {
  const { t, locale } = useT();
  const { width } = useWindowDimensions();
  const cols = width >= 768 ? 6 : 4;
  const cellSize = (width - spacing.md * 2 - (cols - 1) * spacing.sm) / cols;
  const remaining = FICHES.length - unlockedFiches.length;

  return (
    <ScrollView style={styles.collectionScroll} contentContainerStyle={styles.collectionContent}>
      <View style={styles.screenHeader}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>{t('dossiers.pokedexHeaderTitle')}</Text>
        <Text style={styles.collectionCount}>{unlockedFiches.length}/{FICHES.length}</Text>
      </View>

      {/* Progress hint */}
      <View style={styles.pokedexHint}>
        <View style={styles.pokedexHintBar}>
          <View
            style={[
              styles.pokedexHintFill,
              { width: `${(unlockedFiches.length / FICHES.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.pokedexHintText}>
          {unlockedFiches.length === FICHES.length
            ? t('dossiers.pokedexComplete')
            : (remaining > 1
                ? t('dossiers.pokedexRemainingPlural', { n: remaining })
                : t('dossiers.pokedexRemaining', { n: remaining }))}
        </Text>
      </View>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(typeNum => {
        const typeFiches = FICHES.filter(f => f.type === typeNum);
        const typeUnlocked = typeFiches.filter(f => unlockedFiches.includes(f.id)).length;
        return (
          <View key={typeNum} style={styles.collectionTypeGroup}>
            <View style={styles.collectionTypeHeader}>
              <View style={[styles.collectionTypeDot, { backgroundColor: TYPE_COLORS[typeNum] }]} />
              <Text style={styles.collectionTypeLabel}>
                {t('dossiers.pokedexTypeLabel', { n: typeNum, name: getTypeName(typeNum, locale) })}
              </Text>
              <Text style={styles.collectionTypeCount}>{typeUnlocked}/{typeFiches.length}</Text>
            </View>

            <View style={styles.pokedexGrid}>
              {typeFiches.map(fiche => {
                const unlocked = unlockedFiches.includes(fiche.id);
                const localFiche = unlocked ? getFicheLocalized(fiche.id, locale) : null;
                const displayName = localFiche?.name ?? fiche.name;
                return (
                  <Pressable
                    key={fiche.id}
                    onPress={() => unlocked && onFiche(fiche.id)}
                    disabled={!unlocked}
                    style={[
                      styles.pokedexCell,
                      { width: cellSize, height: cellSize },
                      unlocked
                        ? { borderColor: TYPE_COLORS[typeNum], backgroundColor: TYPE_COLORS[typeNum] + '22' }
                        : styles.pokedexCellLocked,
                    ]}
                  >
                    {unlocked ? (
                      <>
                        <Text style={[styles.pokedexInitial, { color: TYPE_COLORS[typeNum] }]}>
                          {displayName.charAt(0)}
                        </Text>
                        <Text style={styles.pokedexName} numberOfLines={1}>{displayName}</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.pokedexLockEmoji}>🔒</Text>
                        <Text style={styles.pokedexLockText}>???</Text>
                      </>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
//  Fiche détail
// ─────────────────────────────────────────────

function FicheScreen({ ficheId, onBack }: { ficheId: string; onBack: () => void }) {
  const { t, locale } = useT();
  const fiche = getFicheLocalized(ficheId, locale);
  if (!fiche) return null;
  const typeColor = TYPE_COLORS[fiche.type];
  const funFact = getFunFactLocalized(fiche.id, locale);

  return (
    <ScrollView style={styles.ficheScroll} contentContainerStyle={styles.ficheContent}>
      <View style={styles.screenHeader}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>{t('dossiers.ficheTitle')}</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={[styles.ficheHero, { borderColor: typeColor }]}>
        <View style={[styles.ficheAvatar, { backgroundColor: typeColor + '33' }]}>
          <Text style={[styles.ficheAvatarLetter, { color: typeColor }]}>
            {fiche.name.charAt(0)}
          </Text>
        </View>
        <Text style={styles.ficheName}>{fiche.name}</Text>
        <TypeBadge typeNum={fiche.type} />
      </View>

      <View style={styles.ficheQuoteBlock}>
        <Text style={styles.ficheQuote}>"{fiche.quote}"</Text>
        <Text style={styles.ficheQuoteSource}>— {fiche.quoteSource}</Text>
      </View>

      <View style={styles.ficheInfoCard}>
        <View style={styles.ficheInfoRow}>
          <Text style={styles.ficheInfoLabel}>{t('dossiers.ficheCoreFear')}</Text>
          <Text style={styles.ficheInfoValue}>{fiche.coreFear}</Text>
        </View>
        <View style={styles.ficheInfoDivider} />
        <View style={styles.ficheInfoRow}>
          <Text style={styles.ficheInfoLabel}>{t('dossiers.ficheCoreDesire')}</Text>
          <Text style={styles.ficheInfoValue}>{fiche.coreDesire}</Text>
        </View>
      </View>

      <View style={styles.ficheWhyCard}>
        <Text style={styles.ficheWhyLabel}>{t('dossiers.ficheWhy')}</Text>
        <Text style={styles.ficheWhyText}>{fiche.whyThisType}</Text>
      </View>

      {funFact && (
        <View style={styles.funFactCard}>
          <Text style={styles.funFactLabel}>{t('dossiers.funFactLabel')}</Text>
          <Text style={styles.funFactText}>{funFact}</Text>
        </View>
      )}
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
//  HUB — Mission du jour (3 cas) + Entraînement + Pokédex
//  (Le mode "rapide" a été fusionné dans la Mission du jour : simplification
//   demandée pour ne garder qu'un rituel quotidien + un mode libre.)
// ─────────────────────────────────────────────

function HubScreen({
  progress, isDailyAvailable, onStartDaily, onStartEntrainement, onCollection,
}: {
  progress: any;
  isDailyAvailable: boolean;
  onStartDaily: () => void;
  onStartEntrainement: () => void;
  onCollection: () => void;
}) {
  const { t } = useT();
  return (
    <ScrollView style={styles.hubScroll} contentContainerStyle={styles.hubContent}>
      {/* Hero */}
      <View style={styles.hubHero}>
        <Text style={styles.hubHeroTitle}>{t('dossiers.hubTitle')}</Text>
        <Text style={styles.hubHeroSub}>{t('dossiers.hubSubtitle')}</Text>
      </View>

      {/* Sherlock rank card — XP progression + next rank preview */}
      <SherlockBar xp={progress.totalXP} />

      {/* Streak (if active) */}
      {progress.streak > 0 && (
        <View style={styles.streakWrap}>
          <Text style={styles.streakIcon}>🔥</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.streakNumber}>
              {progress.streak > 1
                ? t('dossiers.streakDays', { n: progress.streak })
                : t('dossiers.streakDay', { n: progress.streak })}
            </Text>
            <Text style={styles.streakSub}>
              {isDailyAvailable
                ? t('dossiers.streakActive')
                : t('dossiers.streakDone')}
            </Text>
          </View>
        </View>
      )}

      {/* Daily mission — NOW the 3-case ritual (ex "Mode rapide" fused in).
          Combo ×3 = bonus XP, streak +1 once the mission is attempted. */}
      <Pressable
        onPress={onStartDaily}
        disabled={!isDailyAvailable}
        style={({ pressed }) => [
          styles.modeCard,
          styles.modeDaily,
          pressed && isDailyAvailable && { opacity: 0.85 },
          !isDailyAvailable && styles.modeCardDone,
        ]}
      >
        <LinearGradient
          colors={isDailyAvailable ? [colors.accent, '#e8a06a'] : ['#3a4a52', '#2a3a42']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.modeGradient}
        >
          <View style={styles.modeRow}>
            <Text style={styles.modeEmoji}>🎯</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.modeTitle}>{t('dossiers.dailyTitle')}</Text>
              <Text style={styles.modeDesc}>
                {isDailyAvailable
                  ? t('dossiers.dailyDescAvailable')
                  : t('dossiers.dailyDescDone')}
              </Text>
              {isDailyAvailable && progress.bestCombo > 0 && (
                <Text style={[styles.modeStat, { color: colors.white }]}>
                  {t('dossiers.dailyBestCombo', { n: progress.bestCombo })}
                </Text>
              )}
            </View>
            {isDailyAvailable && <Text style={styles.modeChevron}>→</Text>}
          </View>
        </LinearGradient>
      </Pressable>

      {/* Training mode */}
      <Pressable
        onPress={onStartEntrainement}
        style={({ pressed }) => [styles.modeCard, pressed && { opacity: 0.85 }]}
      >
        <View style={styles.modeBody}>
          <View style={styles.modeRow}>
            <View style={[styles.modeIconBox, { backgroundColor: '#5b8a9a22', borderColor: '#5b8a9a55' }]}>
              <Text style={styles.modeEmoji}>🎓</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.modeTitle}>{t('dossiers.trainingTitle')}</Text>
              <Text style={styles.modeDesc}>{t('dossiers.trainingDesc')}</Text>
            </View>
            <Text style={[styles.modeChevron, { color: '#5b8a9a' }]}>→</Text>
          </View>
        </View>
      </Pressable>

      {/* Casebook shortcut */}
      <Pressable
        onPress={onCollection}
        style={({ pressed }) => [styles.modeCard, pressed && { opacity: 0.85 }]}
      >
        <View style={styles.modeBody}>
          <View style={styles.modeRow}>
            <View style={[styles.modeIconBox, { backgroundColor: '#d4a03c22', borderColor: '#d4a03c55' }]}>
              <Text style={styles.modeEmoji}>📔</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.modeTitle}>{t('dossiers.pokedexTitle')}</Text>
              <Text style={styles.modeDesc}>
                {t('dossiers.pokedexDesc', { unlocked: progress.unlockedFiches.length, total: FICHES.length })}
              </Text>
            </View>
            <Text style={[styles.modeChevron, { color: '#d4a03c' }]}>→</Text>
          </View>
        </View>
      </Pressable>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
//  PlayingScreen — header simplifié + combo pendant la mission du jour
// ─────────────────────────────────────────────

function PlayingScreen({ playState, onRevealNext, onSubmit, onFauxAmis, onConfirm, onBack }: {
  playState: any;
  onRevealNext: () => void;
  onSubmit: (v: number) => void;
  onFauxAmis: (side: 'a' | 'b', t: number) => void;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const { t } = useT();
  const c = playState.currentCase;
  const mode = playState.mode as 'entrainement' | 'daily';

  // Daily shows "Case X / 3" progress (the mission is a 3-case session).
  // Training is continuous so we just show the static title.
  const headerTitle = mode === 'daily'
    ? t('dossiers.headerDailyCase', { n: playState.casesPlayedInSession + 1 })
    : t('dossiers.headerTraining');

  return (
    <View style={styles.playingContainer}>
      <View style={styles.playingHeader}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.playingTitle} numberOfLines={1}>{headerTitle}</Text>
        {mode === 'daily' && playState.comboCount > 0 ? (
          <Text style={styles.playingCombo}>🔥 ×{playState.comboCount}</Text>
        ) : (
          <View style={{ width: 44 }} />
        )}
      </View>

      <ScrollView style={styles.playScroll} contentContainerStyle={styles.playScrollContent}>
        {c.format === 'enquete' && (
          <EnqueteScreen cas={c} playState={playState} onRevealNext={onRevealNext} onSubmit={onSubmit} />
        )}
        {c.format === 'citation' && (
          <CitationScreen cas={c} playState={playState} onSubmit={onSubmit} />
        )}
        {c.format === 'faux_amis' && (
          <FauxAmisScreen cas={c} playState={playState} onSubmit={onFauxAmis} />
        )}
        {c.format === 'detail' && (
          <DetailScreen cas={c} playState={playState} onSubmit={onSubmit} />
        )}

        {playState.answered && (
          <Pressable onPress={onConfirm} style={({ pressed }) => [styles.confirmBtn, pressed && { opacity: 0.85 }]}>
            <Text style={styles.confirmBtnText}>{t('dossiers.seeResult')}</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────
//  EXPORT PRINCIPAL
// ─────────────────────────────────────────────

export default function CelebritiesScreen() {
  const { t } = useT();
  useEffect(() => { trackScreen('celebrities').catch(() => {}); }, []);
  const {
    screen, progress, playState, sessionSummary, selectedFicheId, loading,
    openCollection, openFiche, goBack, goHub,
    startEntrainement, startDaily, isDailyAvailable,
    revealNextIndice, submitAnswer, submitFauxAmis, confirmAndReveal, nextCase, quitSession,
  } = useDossier();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{t('dossiers.loading')}</Text>
      </View>
    );
  }

  if (screen === 'hub') {
    return (
      <View style={styles.container}>
        <HubScreen
          progress={progress}
          isDailyAvailable={isDailyAvailable()}
          onStartDaily={startDaily}
          onStartEntrainement={startEntrainement}
          onCollection={openCollection}
        />
      </View>
    );
  }

  if (screen === 'playing' && playState) {
    return (
      <View style={styles.container}>
        <PlayingScreen
          playState={playState}
          onRevealNext={revealNextIndice}
          onSubmit={submitAnswer}
          onFauxAmis={submitFauxAmis}
          onConfirm={confirmAndReveal}
          onBack={goBack}
        />
      </View>
    );
  }

  if (screen === 'reveal' && playState) {
    return (
      <View style={styles.container}>
        <RevealScreen
          playState={playState}
          onNext={nextCase}
          onViewFiche={openFiche}
          onBack={goBack}
          onQuit={quitSession}
        />
      </View>
    );
  }

  if (screen === 'session_summary' && sessionSummary) {
    return (
      <View style={styles.container}>
        <SessionSummaryScreen
          summary={sessionSummary}
          onHome={goHub}
          onEntrainement={startEntrainement}
        />
      </View>
    );
  }

  if (screen === 'collection') {
    return (
      <View style={styles.container}>
        <CollectionScreen
          unlockedFiches={progress.unlockedFiches}
          onFiche={openFiche}
          onBack={goBack}
        />
      </View>
    );
  }

  if (screen === 'fiche' && selectedFicheId) {
    return (
      <View style={styles.container}>
        <FicheScreen ficheId={selectedFicheId} onBack={goBack} />
      </View>
    );
  }

  return <View style={styles.container} />;
}

// ─────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  loadingContainer: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted },

  // ── Hub ──
  hubScroll: { flex: 1 },
  hubContent: { paddingTop: spacing.xxl + spacing.sm, paddingHorizontal: spacing.md, paddingBottom: spacing.xxl + spacing.xl, gap: spacing.md },
  hubHero: { paddingHorizontal: spacing.sm, marginBottom: spacing.sm },
  hubHeroTitle: { fontFamily: fonts.serif, fontSize: 28, color: colors.text, marginBottom: 4 },
  hubHeroSub: { fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted },

  // ── Sherlock rank card (enlarged from the thin bar it used to be) ──
  sherlockBarWrap: {
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  sherlockBarHeader: { marginBottom: 2 },
  sherlockBarRankRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
  },
  sherlockBarEmoji: { fontSize: 36 },
  sherlockBarRankLabel: {
    fontFamily: fonts.sans, fontSize: 10, fontWeight: '700',
    color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase',
  },
  sherlockBarRankName: {
    fontFamily: fonts.serif, fontSize: 20, color: colors.text, marginTop: 2,
  },
  sherlockBarXPLabel: {
    fontFamily: fonts.sans, fontSize: 10, fontWeight: '700',
    color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase',
  },
  sherlockBarXPValue: {
    fontFamily: fonts.serif, fontSize: 20, color: colors.accent, marginTop: 2, fontWeight: '700',
  },
  sherlockBarTrack: {
    height: 8, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden',
  },
  sherlockBarFill: { height: 8, backgroundColor: colors.accent, borderRadius: 4 },
  sherlockBarFooter: { alignItems: 'center' },
  sherlockBarNext: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted,
  },

  // Streak
  streakWrap: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.accentFill, borderRadius: radius.md,
    padding: spacing.md, borderWidth: 1, borderColor: colors.accent,
  },
  streakIcon: { fontSize: 28 },
  streakNumber: { fontFamily: fonts.serif, fontSize: 16, color: colors.accent, fontWeight: '700' },
  streakSub: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 2 },

  // Mode cards
  modeCard: { borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  modeCardDone: { opacity: 0.6 },
  modeBody: { backgroundColor: colors.surface, padding: spacing.md },
  modeDaily: { borderColor: 'transparent' },
  modeGradient: { padding: spacing.md },
  modeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  modeIconBox: {
    width: 48, height: 48, borderRadius: 24, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  modeEmoji: { fontSize: 24 },
  modeTitle: { fontFamily: fonts.serif, fontSize: 18, color: colors.text, marginBottom: 2 },
  modeDesc: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, lineHeight: 18 },
  modeStat: { fontFamily: fonts.sans, fontSize: 11, color: colors.accent, marginTop: 4, fontWeight: '600' },
  modeChevron: { fontSize: 22, fontWeight: '300', color: colors.textMuted, paddingHorizontal: spacing.sm },

  // ── Generic screen header ──
  screenHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: spacing.xxl + spacing.sm, paddingHorizontal: spacing.md, paddingBottom: spacing.sm,
  },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  backBtnText: { fontFamily: fonts.sans, fontSize: 28, color: colors.text, lineHeight: 32 },
  screenTitle: { fontFamily: fonts.serif, fontSize: 16, color: colors.text, flex: 1, textAlign: 'center' },

  // ── Playing ──
  playingContainer: { flex: 1, backgroundColor: colors.bg },
  playingHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: spacing.xxl + spacing.sm, paddingHorizontal: spacing.md, paddingBottom: spacing.sm,
  },
  playingTitle: { fontFamily: fonts.serif, fontSize: 16, color: colors.text, flex: 1, textAlign: 'center' },
  playingCombo: {
    width: 60, textAlign: 'right', fontFamily: fonts.sans, fontSize: 14,
    fontWeight: '700', color: colors.accent,
  },
  playScroll: { flex: 1 },
  playScrollContent: { padding: spacing.md, paddingBottom: spacing.xxl + spacing.xl, gap: spacing.md },

  playCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.md,
  },
  playFormatTag: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  playFormatText: { fontFamily: fonts.sans, fontSize: 13, fontWeight: '700', color: colors.accent },
  playXpHint: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted },
  playPrompt: { fontFamily: fonts.serif, fontSize: 18, color: colors.text, marginVertical: spacing.sm },

  // Indices
  indiceRow: {
    flexDirection: 'row', gap: spacing.md, padding: spacing.md,
    backgroundColor: colors.bg, borderRadius: radius.sm,
  },
  indiceRowNew: { borderLeftWidth: 3, borderLeftColor: colors.accent },
  indiceNum: { fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', color: colors.accent, width: 24 },
  indiceText: { flex: 1, fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textSoft },
  revealBtn: {
    backgroundColor: colors.bg, padding: spacing.md, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.border, alignItems: 'center',
  },
  revealBtnPressed: { backgroundColor: colors.bgLight },
  revealBtnText: { fontFamily: fonts.sans, fontSize: 13, color: colors.textSoft, fontWeight: '600' },

  // Citation
  quoteBlock: { padding: spacing.md, backgroundColor: colors.bg, borderRadius: radius.sm, borderLeftWidth: 3, borderLeftColor: colors.accent },
  quoteText: { fontFamily: fonts.serifItalic, fontSize: 16, lineHeight: 24, color: colors.text },
  quoteAuthor: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: spacing.sm },
  citationOptions: { gap: spacing.sm },
  citationOption: {
    padding: spacing.sm, backgroundColor: colors.bg, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.border, alignItems: 'flex-start',
  },

  // Type grid
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  typeGridBtn: {
    width: '31%', padding: spacing.sm, alignItems: 'center', backgroundColor: colors.bg,
    borderRadius: radius.sm, borderWidth: 1, borderColor: colors.border,
  },
  typeGridNum: { fontFamily: fonts.sans, fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 2 },
  typeGridName: { fontFamily: fonts.sans, fontSize: 10, color: colors.textMuted },

  // Type badge
  typeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.sm,
    paddingVertical: 4, borderRadius: radius.sm, borderWidth: 1,
  },
  typeBadgeSm: { paddingHorizontal: 6, paddingVertical: 3 },
  typeBadgeNum: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '700' },
  typeBadgeNumSm: { fontSize: 12 },
  typeBadgeName: { fontFamily: fonts.sans, fontSize: 12, fontWeight: '600' },

  // Faux amis
  fauxAmisIntro: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, lineHeight: 19 },
  fauxAmisBlock: { padding: spacing.md, backgroundColor: colors.bg, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  fauxAmisBlockCorrect: { borderColor: colors.success, backgroundColor: 'rgba(76,175,80,0.08)' },
  fauxAmisBlockWrong: { borderColor: colors.error, backgroundColor: 'rgba(233,69,96,0.08)' },
  fauxAmisLabel: { fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', color: colors.accent, letterSpacing: 0.5 },
  fauxAmisDesc: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textSoft },
  fauxAmisTypes: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  fauxAmisTypeBtn: { padding: spacing.xs, borderRadius: radius.sm },
  fauxAmisTypeBtnSelected: { backgroundColor: colors.accentFill },
  // Big choice button (Option A — pastille colorée + nom du type).
  // With the articles stripped from TYPE_NAMES the labels now fit on a
  // single line at a comfortable size; adjustsFontSizeToFit on the <Text>
  // is the belt-and-suspenders for the longest name ("Perfectionniste"
  // at 15 chars) on narrow screens.
  fauxAmisChoiceBtn: {
    flex: 1,
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: spacing.md, paddingHorizontal: spacing.sm,
    borderRadius: radius.md, borderWidth: 1,
    minHeight: 60,
  },
  fauxAmisChoiceNum: {
    width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center',
  },
  fauxAmisChoiceNumText: {
    fontFamily: fonts.sans, fontSize: 17, fontWeight: '800', color: colors.white,
  },
  fauxAmisChoiceName: {
    flex: 1,
    fontFamily: fonts.sans, fontSize: 15, fontWeight: '700',
  },
  keyDiffBox: { padding: spacing.md, backgroundColor: colors.accentFill, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.accent },
  keyDiffLabel: { fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', color: colors.accent, marginBottom: spacing.xs },
  keyDiffText: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 19, color: colors.textSoft },

  // Detail
  sceneBlock: { padding: spacing.md, backgroundColor: colors.bg, borderRadius: radius.sm, borderLeftWidth: 3, borderLeftColor: colors.accent },
  sceneText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textSoft, fontStyle: 'italic' },
  detailReveal: { padding: spacing.md, backgroundColor: colors.accentFill, borderRadius: radius.sm },
  detailKeyLabel: { fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', color: colors.accent, marginBottom: spacing.xs },
  detailKeyText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.text },

  // Common
  optCorrect: { backgroundColor: 'rgba(76,175,80,0.15)', borderColor: colors.success },
  optWrong: { backgroundColor: 'rgba(233,69,96,0.15)', borderColor: colors.error },
  optPressed: { opacity: 0.7 },
  textCorrect: { color: colors.success },
  textWrong: { color: colors.error },

  confirmBtn: {
    backgroundColor: colors.accent, padding: spacing.md, borderRadius: radius.md, alignItems: 'center', marginTop: spacing.md,
  },
  confirmBtnText: { fontFamily: fonts.sans, fontSize: 16, fontWeight: '700', color: colors.white },

  // Reveal
  revealScroll: { flex: 1 },
  revealContent: { padding: spacing.md, paddingBottom: spacing.xxl + spacing.xl, gap: spacing.md },
  revealResult: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    padding: spacing.lg, borderRadius: radius.lg, position: 'relative',
  },
  revealCorrect: { backgroundColor: 'rgba(76,175,80,0.12)', borderWidth: 1.5, borderColor: colors.success },
  revealWrong: { backgroundColor: 'rgba(233,69,96,0.10)', borderWidth: 1.5, borderColor: colors.error },
  revealResultIconBig: { fontSize: 44, fontWeight: '700' as any, color: colors.text },
  revealResultLabel: { fontFamily: fonts.serif, fontSize: 22, color: colors.text, marginBottom: spacing.xs },

  comboBanner: {
    backgroundColor: '#e07b5422', borderWidth: 1, borderColor: '#e07b54',
    padding: spacing.sm, borderRadius: radius.sm, alignItems: 'center',
  },
  comboBannerText: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '700', color: '#e07b54' },

  revealTypeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.sm },
  revealTypeName: { fontFamily: fonts.serif, fontSize: 18, color: colors.text },
  revealExplanation: {
    padding: spacing.md, backgroundColor: colors.surface, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.border,
  },
  revealExplanationText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.textSoft },

  funFactCard: {
    padding: spacing.md, backgroundColor: '#d4a03c1a',
    borderWidth: 1, borderColor: '#d4a03c66', borderRadius: radius.md,
  },
  funFactLabel: { fontFamily: fonts.sans, fontSize: 12, fontWeight: '700', color: '#d4a03c', marginBottom: spacing.xs, letterSpacing: 0.5 },
  funFactText: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.textSoft, fontStyle: 'italic' },

  ficheUnlockCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    padding: spacing.md, backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.accent,
  },
  ficheUnlockDot: { width: 16, height: 16, borderRadius: 8 },
  ficheUnlockInfo: { flex: 1 },
  ficheUnlockLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.accent, fontWeight: '700', letterSpacing: 0.5 },
  ficheUnlockName: { fontFamily: fonts.serif, fontSize: 16, color: colors.text, marginTop: 2 },
  ficheUnlockArrow: { fontFamily: fonts.sans, fontSize: 22, color: colors.accent },

  nextBtn: {
    backgroundColor: colors.accent, padding: spacing.md, borderRadius: radius.md, alignItems: 'center', marginTop: spacing.sm,
  },
  nextBtnText: { fontFamily: fonts.sans, fontSize: 16, fontWeight: '700', color: colors.white },

  quitBtn: {
    padding: spacing.md, alignItems: 'center', marginTop: spacing.xs,
  },
  quitBtnText: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },

  // XP chip
  xpChip: {
    backgroundColor: colors.accent, paddingHorizontal: spacing.sm, paddingVertical: 4,
    borderRadius: radius.full, alignSelf: 'flex-start',
  },
  xpChipText: { fontFamily: fonts.sans, fontSize: 12, fontWeight: '700', color: colors.white },

  // Celebration
  celebrationRow: {
    position: 'absolute', top: -10, right: 12, flexDirection: 'row', gap: 4,
  },
  celebrationEmoji: { fontSize: 24 },

  // ── Session summary ──
  summaryContent: { padding: spacing.lg, paddingBottom: spacing.xxl + spacing.xl, alignItems: 'center', gap: spacing.md },
  summaryEmoji: { fontSize: 64, marginTop: spacing.lg },
  summaryTitle: { fontFamily: fonts.serif, fontSize: 28, color: colors.text },
  summaryScore: { fontFamily: fonts.sans, fontSize: 16, color: colors.textSoft },
  summaryStats: {
    width: '100%', backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.sm,
  },
  summaryStatRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryStatLabel: { fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted },
  summaryStatValue: { fontFamily: fonts.sans, fontSize: 16, fontWeight: '700', color: colors.text },
  summaryTomorrow: {
    fontFamily: fonts.sans, fontSize: 13, lineHeight: 19, color: colors.textMuted,
    textAlign: 'center', fontStyle: 'italic', paddingHorizontal: spacing.md, marginTop: spacing.xs,
  },

  // ── Pokédex ──
  collectionScroll: { flex: 1 },
  collectionContent: { paddingBottom: spacing.xxl + spacing.xl },
  collectionCount: { width: 60, textAlign: 'right', fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },

  pokedexHint: {
    marginHorizontal: spacing.md, padding: spacing.md, backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md,
  },
  pokedexHintBar: { height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden', marginBottom: spacing.xs },
  pokedexHintFill: { height: 6, backgroundColor: colors.accent, borderRadius: 3 },
  pokedexHintText: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, textAlign: 'center' },

  collectionTypeGroup: { paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  collectionTypeHeader: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  collectionTypeDot: { width: 10, height: 10, borderRadius: 5 },
  collectionTypeLabel: { flex: 1, fontFamily: fonts.sans, fontSize: 13, fontWeight: '700', color: colors.text },
  collectionTypeCount: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted },

  pokedexGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  pokedexCell: {
    borderRadius: radius.md, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center',
    padding: 4,
  },
  pokedexCellLocked: { backgroundColor: colors.surface, borderColor: colors.border, opacity: 0.5 },
  pokedexInitial: { fontFamily: fonts.serif, fontSize: 28, fontWeight: '700' as any, marginBottom: 4 },
  pokedexName: { fontFamily: fonts.sans, fontSize: 9, color: colors.textSoft, textAlign: 'center' },
  pokedexLockEmoji: { fontSize: 18, marginBottom: 4 },
  pokedexLockText: { fontFamily: fonts.sans, fontSize: 10, color: colors.textMuted },

  // ── Fiche ──
  ficheScroll: { flex: 1 },
  ficheContent: { paddingBottom: spacing.xxl + spacing.xl },
  ficheHero: {
    margin: spacing.md, padding: spacing.lg, alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 2,
  },
  ficheAvatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  ficheAvatarLetter: { fontFamily: fonts.serif, fontSize: 36, fontWeight: '700' as any },
  ficheName: { fontFamily: fonts.serif, fontSize: 22, color: colors.text },
  ficheQuoteBlock: {
    marginHorizontal: spacing.md, marginBottom: spacing.md, padding: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.md, borderLeftWidth: 3, borderLeftColor: colors.accent,
  },
  ficheQuote: { fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 23, color: colors.text },
  ficheQuoteSource: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, marginTop: spacing.sm },
  ficheInfoCard: {
    marginHorizontal: spacing.md, marginBottom: spacing.md, padding: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
  },
  ficheInfoRow: { gap: spacing.xs },
  ficheInfoLabel: { fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', color: colors.accent, letterSpacing: 0.5 },
  ficheInfoValue: { fontFamily: fonts.sans, fontSize: 14, color: colors.textSoft },
  ficheInfoDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  ficheWhyCard: {
    marginHorizontal: spacing.md, padding: spacing.md, marginBottom: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
  },
  ficheWhyLabel: { fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', color: colors.accent, letterSpacing: 0.5, marginBottom: spacing.sm },
  ficheWhyText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.textSoft },
});
