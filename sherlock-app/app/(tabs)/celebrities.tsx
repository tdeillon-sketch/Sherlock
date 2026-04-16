import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet,
  Animated, useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import {
  DOSSIERS, FICHES, RANKS, TYPE_NAMES, TYPE_COLORS,
  type Dossier, type DossierCase, type EnqueteCase,
  type CitationCase, type FauxAmisCase, type DetailCase,
} from '../../constants/dossiers';
import { useDossier, getRankInfo, getDossierCompletion } from '../../hooks/useDossier';

// ─────────────────────────────────────────────
//  Petits composants réutilisables
// ─────────────────────────────────────────────

function TypeBadge({ typeNum, size = 'md' }: { typeNum: number; size?: 'sm' | 'md' }) {
  const color = TYPE_COLORS[typeNum] ?? colors.accent;
  const isSmall = size === 'sm';
  return (
    <View style={[styles.typeBadge, { backgroundColor: color + '33', borderColor: color }, isSmall && styles.typeBadgeSm]}>
      <Text style={[styles.typeBadgeNum, { color }, isSmall && styles.typeBadgeNumSm]}>{typeNum}</Text>
      {!isSmall && <Text style={[styles.typeBadgeName, { color }]} numberOfLines={1}>{TYPE_NAMES[typeNum]}</Text>}
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

function RankBadge({ xp, compact }: { xp: number; compact?: boolean }) {
  const info = getRankInfo(xp);
  return (
    <View style={[styles.rankBadge, compact && styles.rankBadgeCompact]}>
      <Text style={styles.rankEmoji}>{info.current.emoji}</Text>
      {!compact && <Text style={styles.rankTitle}>{info.current.title}</Text>}
    </View>
  );
}

function XPBar({ xp }: { xp: number }) {
  const info = getRankInfo(xp);
  const animWidth = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animWidth, { toValue: info.progress, duration: 800, useNativeDriver: false }).start();
  }, [info.progress]);

  return (
    <View style={styles.xpBarContainer}>
      <View style={styles.xpBarRow}>
        <Text style={styles.xpBarLabel}>{info.current.title}</Text>
        {info.next && <Text style={styles.xpBarLabel}>{info.next.title}</Text>}
      </View>
      <View style={styles.xpBarTrack}>
        <Animated.View
          style={[styles.xpBarFill, {
            width: animWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
          }]}
        />
      </View>
      <Text style={styles.xpTotal}>{xp} XP{info.next ? ` · ${info.next.xpRequired - xp} XP pour ${info.next.emoji}` : ' · Rang maximum !'}</Text>
    </View>
  );
}

function DossierCard({ dossier, completedCases, onPress }: {
  dossier: Dossier; completedCases: string[]; onPress: () => void;
}) {
  const completion = getDossierCompletion(dossier.id, completedCases);
  const total = dossier.cases.length;
  const done = Math.round(completion * total);
  const pct = Math.round(completion * 100);
  const isComplete = completion >= 1;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.dossierCard, pressed && styles.dossierCardPressed]}
    >
      <View style={styles.dossierCardTop}>
        <View style={[styles.dossierEmojiBg, { backgroundColor: dossier.color + '22' }]}>
          <Text style={styles.dossierEmoji}>{dossier.emoji}</Text>
        </View>
        <View style={styles.dossierCardInfo}>
          <Text style={styles.dossierCardTitle}>{dossier.title}</Text>
          <Text style={styles.dossierCardDesc}>{dossier.desc}</Text>
        </View>
        {isComplete && <Text style={styles.completedStar}>✓</Text>}
      </View>
      <View style={styles.dossierProgress}>
        <View style={styles.dossierProgressTrack}>
          <View style={[styles.dossierProgressFill, { width: `${pct}%`, backgroundColor: dossier.color }]} />
        </View>
        <Text style={styles.dossierProgressText}>{done}/{total}</Text>
      </View>
    </Pressable>
  );
}

function CaseRow({ cas, done, onPress }: {
  cas: DossierCase; done: boolean; onPress: () => void;
}) {
  const formatIcon = cas.format === 'enquete' ? '🔍'
    : cas.format === 'citation' ? '💬'
    : cas.format === 'faux_amis' ? '⚔️'
    : '👁️';
  const formatLabel = cas.format === 'enquete' ? 'Enquête'
    : cas.format === 'citation' ? 'Citation'
    : cas.format === 'faux_amis' ? 'Faux amis'
    : 'Le détail';

  let title = '';
  if (cas.format === 'enquete' || cas.format === 'citation' || cas.format === 'detail') {
    const fiche = FICHES.find(f => f.id === (cas as any).ficheId);
    title = fiche ? fiche.name : `Cas ${cas.id}`;
  } else if (cas.format === 'faux_amis') {
    title = `Type ${cas.typeA} vs Type ${cas.typeB}`;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.caseRow, done && styles.caseRowDone, pressed && styles.caseRowPressed]}
    >
      <Text style={styles.caseFormatIcon}>{done ? '✓' : formatIcon}</Text>
      <View style={styles.caseRowInfo}>
        <Text style={styles.caseRowTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.caseRowFormat}>{formatLabel}</Text>
      </View>
      {!done && <Text style={styles.caseChevron}>›</Text>}
    </Pressable>
  );
}

// ─────────────────────────────────────────────
//  Écrans de jeu
// ─────────────────────────────────────────────

function EnqueteScreen({ cas, playState, onRevealNext, onSubmit }: {
  cas: EnqueteCase;
  playState: any;
  onRevealNext: () => void;
  onSubmit: (type: number) => void;
}) {
  const canRevealMore = playState.revealedIndices < cas.indices.length;
  const answered = playState.answered;

  return (
    <View style={styles.playCard}>
      <View style={styles.playFormatTag}>
        <Text style={styles.playFormatText}>🔍 Enquête progressive</Text>
        <Text style={styles.playXpHint}>
          {cas.xpValues[Math.min(playState.revealedIndices - 1, cas.xpValues.length - 1)]} XP si correct
        </Text>
      </View>

      {/* Indices révélés */}
      {cas.indices.slice(0, playState.revealedIndices).map((indice, idx) => (
        <View key={idx} style={[styles.indiceRow, idx === playState.revealedIndices - 1 && styles.indiceRowNew]}>
          <Text style={styles.indiceNum}>#{idx + 1}</Text>
          <Text style={styles.indiceText}>{indice}</Text>
        </View>
      ))}

      {/* Bouton révéler indice suivant */}
      {!answered && canRevealMore && (
        <Pressable onPress={onRevealNext} style={({ pressed }) => [styles.revealBtn, pressed && styles.revealBtnPressed]}>
          <Text style={styles.revealBtnText}>
            Indice suivant (-{cas.xpValues[playState.revealedIndices] ?? 0} XP)
          </Text>
        </Pressable>
      )}

      {/* Grille des types */}
      {!answered && (
        <>
          <Text style={styles.playPrompt}>Quel est ce type ?</Text>
          <TypeGrid onSelect={onSubmit} disabled={false} correct={null} selected={null} />
        </>
      )}
    </View>
  );
}

function CitationScreen({ cas, playState, onSubmit }: {
  cas: CitationCase;
  playState: any;
  onSubmit: (type: number) => void;
}) {
  const answered = playState.answered;
  const options = [...cas.wrongOptions, cas.answer].sort(() => 0.5 - Math.random());
  // stable sort based on cas id to avoid re-randomizing
  const stableOptions = [cas.answer, ...cas.wrongOptions].sort((a, b) => {
    const seed = cas.id.charCodeAt(0);
    return (a * seed) % 9 - (b * seed) % 9;
  });

  return (
    <View style={styles.playCard}>
      <View style={styles.playFormatTag}>
        <Text style={styles.playFormatText}>💬 Citation révélatrice</Text>
        <Text style={styles.playXpHint}>300 XP</Text>
      </View>

      <View style={styles.quoteBlock}>
        <Text style={styles.quoteText}>"{cas.quote}"</Text>
        <Text style={styles.quoteAuthor}>— {cas.author}</Text>
      </View>

      <Text style={styles.playPrompt}>Quel type a dit cela ?</Text>

      <View style={styles.citationOptions}>
        {stableOptions.map(typeNum => {
          const isSelected = answered && (playState.answered);
          const isCorrect = typeNum === cas.answer;
          const isWrong = answered && typeNum !== cas.answer;
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
  onSelect: (t: number) => void;
  disabled: boolean;
  correct: number | null;
  selected: number | null;
}) {
  return (
    <View style={styles.typeGrid}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(t => {
        const isCorrect = correct !== null && t === correct;
        const isWrong = selected !== null && t === selected && t !== correct;
        return (
          <Pressable
            key={t}
            onPress={() => !disabled && onSelect(t)}
            disabled={disabled}
            style={({ pressed }) => [
              styles.typeGridBtn,
              isCorrect && styles.optCorrect,
              isWrong && styles.optWrong,
              pressed && !disabled && styles.optPressed,
            ]}
          >
            <Text style={[styles.typeGridNum, isCorrect && styles.textCorrect, isWrong && styles.textWrong]}>{t}</Text>
            <Text style={[styles.typeGridName, isCorrect && styles.textCorrect]} numberOfLines={1}>
              {TYPE_NAMES[t]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function FauxAmisScreen({ cas, playState, onSubmit }: {
  cas: FauxAmisCase;
  playState: any;
  onSubmit: (side: 'a' | 'b', type: number) => void;
}) {
  const { fauxAmisAnswers, answered } = playState;
  const correctA = answered && fauxAmisAnswers.a === cas.typeA;
  const correctB = answered && fauxAmisAnswers.b === cas.typeB;

  return (
    <View style={styles.playCard}>
      <View style={styles.playFormatTag}>
        <Text style={styles.playFormatText}>⚔️ Faux amis</Text>
        <Text style={styles.playXpHint}>{cas.xp} XP</Text>
      </View>
      <Text style={styles.fauxAmisIntro}>
        Ces deux profils sont souvent confondus. Associez chaque description au bon type.
      </Text>

      {/* Description A */}
      <View style={[styles.fauxAmisBlock, answered && correctA && styles.fauxAmisBlockCorrect, answered && !correctA && styles.fauxAmisBlockWrong]}>
        <Text style={styles.fauxAmisLabel}>Profil A</Text>
        <Text style={styles.fauxAmisDesc}>{cas.descA}</Text>
        {!answered || fauxAmisAnswers.a === null ? (
          <View style={styles.fauxAmisTypes}>
            {[cas.typeA, cas.typeB].sort().map(t => (
              <Pressable
                key={t}
                onPress={() => !answered && fauxAmisAnswers.a === null && onSubmit('a', t)}
                disabled={answered || fauxAmisAnswers.a !== null}
                style={({ pressed }) => [
                  styles.fauxAmisTypeBtn,
                  fauxAmisAnswers.a === t && styles.fauxAmisTypeBtnSelected,
                  pressed && styles.optPressed,
                ]}
              >
                <TypeBadge typeNum={t} size="sm" />
              </Pressable>
            ))}
          </View>
        ) : (
          <TypeBadge typeNum={fauxAmisAnswers.a} />
        )}
      </View>

      {/* Description B */}
      <View style={[styles.fauxAmisBlock, answered && correctB && styles.fauxAmisBlockCorrect, answered && !correctB && styles.fauxAmisBlockWrong]}>
        <Text style={styles.fauxAmisLabel}>Profil B</Text>
        <Text style={styles.fauxAmisDesc}>{cas.descB}</Text>
        {!answered || fauxAmisAnswers.b === null ? (
          <View style={styles.fauxAmisTypes}>
            {[cas.typeA, cas.typeB].sort().map(t => (
              <Pressable
                key={t}
                onPress={() => !answered && fauxAmisAnswers.b === null && onSubmit('b', t)}
                disabled={answered || fauxAmisAnswers.b !== null}
                style={({ pressed }) => [
                  styles.fauxAmisTypeBtn,
                  fauxAmisAnswers.b === t && styles.fauxAmisTypeBtnSelected,
                  pressed && styles.optPressed,
                ]}
              >
                <TypeBadge typeNum={t} size="sm" />
              </Pressable>
            ))}
          </View>
        ) : (
          <TypeBadge typeNum={fauxAmisAnswers.b} />
        )}
      </View>

      {answered && (
        <View style={styles.keyDiffBox}>
          <Text style={styles.keyDiffLabel}>La nuance clé</Text>
          <Text style={styles.keyDiffText}>{cas.keyDiff}</Text>
        </View>
      )}
    </View>
  );
}

function DetailScreen({ cas, playState, onSubmit }: {
  cas: DetailCase;
  playState: any;
  onSubmit: (type: number) => void;
}) {
  const answered = playState.answered;
  return (
    <View style={styles.playCard}>
      <View style={styles.playFormatTag}>
        <Text style={styles.playFormatText}>👁️ Le détail qui tue</Text>
        <Text style={styles.playXpHint}>{cas.xp} XP</Text>
      </View>

      <View style={styles.sceneBlock}>
        <Text style={styles.sceneText}>{cas.scene}</Text>
      </View>

      <Text style={styles.playPrompt}>Quel type se cache derrière ce comportement ?</Text>

      {!answered ? (
        <TypeGrid
          onSelect={onSubmit}
          disabled={false}
          correct={null}
          selected={null}
        />
      ) : (
        <View style={styles.detailReveal}>
          <Text style={styles.detailKeyLabel}>Le détail révélateur</Text>
          <Text style={styles.detailKeyText}>{cas.keyDetail}</Text>
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────
//  Écran Révélation (après réponse)
// ─────────────────────────────────────────────

function RevealScreen({ playState, onNext, onViewFiche, onBack }: {
  playState: any;
  onNext: () => void;
  onViewFiche: (id: string) => void;
  onBack: () => void;
}) {
  const c = playState.currentCase;
  const isLast = playState.caseIndex >= playState.dossier.cases.length - 1;
  const ficheId = (c as any).ficheId as string | undefined;
  const fiche = ficheId ? FICHES.find(f => f.id === ficheId) : null;
  const answerType = c.format === 'faux_amis' ? null : (c as any).answer as number;

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.screenHeader}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>
          {playState.dossier.emoji} {playState.dossier.title}
        </Text>
        <Text style={{ width: 44, textAlign: 'right', fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, alignSelf: 'center' }}>
          {playState.caseIndex + 1}/{playState.dossier.cases.length}
        </Text>
      </View>
    <ScrollView style={styles.revealScroll} contentContainerStyle={styles.revealContent}>
      {/* Résultat */}
      <View style={[styles.revealResult, playState.correct ? styles.revealCorrect : styles.revealWrong]}>
        <Text style={styles.revealResultIcon}>{playState.correct ? '✓' : '✗'}</Text>
        <View>
          <Text style={styles.revealResultLabel}>{playState.correct ? 'Bonne réponse !' : 'Pas cette fois'}</Text>
          {playState.xpEarned > 0 && <XpChip value={playState.xpEarned} />}
        </View>
      </View>

      {/* Type correct */}
      {answerType && (
        <View style={styles.revealTypeRow}>
          <TypeBadge typeNum={answerType} />
          <Text style={styles.revealTypeName}>{TYPE_NAMES[answerType]}</Text>
        </View>
      )}

      {/* Explication */}
      <View style={styles.revealExplanation}>
        <Text style={styles.revealExplanationText}>{(c as any).explanation ?? (c as any).keyDiff}</Text>
      </View>

      {/* Fiche débloquée */}
      {fiche && (
        <Pressable onPress={() => onViewFiche(fiche.id)} style={styles.ficheUnlockCard}>
          <View style={[styles.ficheUnlockDot, { backgroundColor: TYPE_COLORS[fiche.type] }]} />
          <View style={styles.ficheUnlockInfo}>
            <Text style={styles.ficheUnlockLabel}>Fiche débloquée</Text>
            <Text style={styles.ficheUnlockName}>{fiche.name}</Text>
          </View>
          <Text style={styles.ficheUnlockArrow}>›</Text>
        </Pressable>
      )}

      {/* Bouton suivant */}
      <Pressable onPress={onNext} style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.85 }]}>
        <Text style={styles.nextBtnText}>{isLast ? 'Terminer le dossier' : 'Cas suivant →'}</Text>
      </Pressable>
    </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────
//  Écran Collection
// ─────────────────────────────────────────────

function CollectionScreen({ unlockedFiches, onFiche, onBack }: {
  unlockedFiches: string[];
  onFiche: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <ScrollView style={styles.collectionScroll} contentContainerStyle={styles.collectionContent}>
      <View style={styles.screenHeader}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Ma Collection</Text>
        <Text style={styles.collectionCount}>{unlockedFiches.length}/{FICHES.length}</Text>
      </View>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(typeNum => {
        const typeFiches = FICHES.filter(f => f.type === typeNum);
        return (
          <View key={typeNum} style={styles.collectionTypeGroup}>
            <View style={styles.collectionTypeHeader}>
              <View style={[styles.collectionTypeDot, { backgroundColor: TYPE_COLORS[typeNum] }]} />
              <Text style={styles.collectionTypeLabel}>Type {typeNum} — {TYPE_NAMES[typeNum]}</Text>
            </View>
            <View style={styles.collectionCards}>
              {typeFiches.map(fiche => {
                const unlocked = unlockedFiches.includes(fiche.id);
                return (
                  <Pressable
                    key={fiche.id}
                    onPress={() => unlocked && onFiche(fiche.id)}
                    style={[styles.collectionCard, !unlocked && styles.collectionCardLocked]}
                  >
                    <View style={[styles.collectionCardDot, { backgroundColor: unlocked ? TYPE_COLORS[typeNum] : colors.textMuted }]} />
                    <Text style={[styles.collectionCardName, !unlocked && styles.collectionCardNameLocked]} numberOfLines={1}>
                      {unlocked ? fiche.name : '???'}
                    </Text>
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
//  Écran Fiche personnage
// ─────────────────────────────────────────────

function FicheScreen({ ficheId, onBack }: { ficheId: string; onBack: () => void }) {
  const fiche = FICHES.find(f => f.id === ficheId);
  if (!fiche) return null;
  const typeColor = TYPE_COLORS[fiche.type];

  return (
    <ScrollView style={styles.ficheScroll} contentContainerStyle={styles.ficheContent}>
      <View style={styles.screenHeader}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Fiche</Text>
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
          <Text style={styles.ficheInfoLabel}>Peur centrale</Text>
          <Text style={styles.ficheInfoValue}>{fiche.coreFear}</Text>
        </View>
        <View style={styles.ficheInfoDivider} />
        <View style={styles.ficheInfoRow}>
          <Text style={styles.ficheInfoLabel}>Désir profond</Text>
          <Text style={styles.ficheInfoValue}>{fiche.coreDesire}</Text>
        </View>
      </View>

      <View style={styles.ficheWhyCard}>
        <Text style={styles.ficheWhyLabel}>Pourquoi ce type ?</Text>
        <Text style={styles.ficheWhyText}>{fiche.whyThisType}</Text>
      </View>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
//  Écran Principal — Hub
// ─────────────────────────────────────────────

function HubScreen({ progress, onDossier, onCollection, onDailyCase }: {
  progress: any;
  onDossier: (d: Dossier) => void;
  onCollection: () => void;
  onDailyCase: () => void;
}) {
  const daily = null; // computed elsewhere
  const hasStreak = progress.streak > 1;

  return (
    <ScrollView style={styles.hubScroll} contentContainerStyle={styles.hubContent}>
      {/* Header */}
      <LinearGradient colors={[colors.bgLight, colors.bg]} style={styles.hubHeader}>
        <Text style={styles.hubTitle}>Les Dossiers Sherlock</Text>
        <Text style={styles.hubSub}>Devenez expert de l'Enneagramme</Text>

        <View style={styles.hubRankRow}>
          <RankBadge xp={progress.totalXP} />
          {hasStreak && (
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 {progress.streak} jours</Text>
            </View>
          )}
        </View>

        <XPBar xp={progress.totalXP} />
      </LinearGradient>

      {/* Classement des rangs */}
      <View style={styles.ranksRow}>
        {RANKS.map(r => {
          const achieved = progress.totalXP >= r.xpRequired;
          return (
            <View key={r.id} style={[styles.rankStep, achieved && styles.rankStepDone]}>
              <Text style={[styles.rankStepEmoji, !achieved && styles.rankStepLocked]}>{r.emoji}</Text>
              <Text style={[styles.rankStepLabel, achieved && styles.rankStepLabelDone]} numberOfLines={1}>
                {r.title}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Défi quotidien */}
      <Pressable onPress={onDailyCase} style={({ pressed }) => [styles.dailyCard, pressed && { opacity: 0.9 }]}>
        <LinearGradient colors={[colors.accent, colors.accentLight]} style={styles.dailyGradient}>
          <Text style={styles.dailyEmoji}>📅</Text>
          <View style={styles.dailyInfo}>
            <Text style={styles.dailyLabel}>Défi du jour</Text>
            <Text style={styles.dailyDesc}>
              {progress.dailyCompleted ? 'Complété aujourd\'hui ✓' : 'Un cas spécial vous attend'}
            </Text>
          </View>
          {!progress.dailyCompleted && <Text style={styles.dailyArrow}>›</Text>}
        </LinearGradient>
      </Pressable>

      {/* Dossiers */}
      <Text style={styles.sectionTitle}>Dossiers</Text>
      {DOSSIERS.map(d => (
        <DossierCard
          key={d.id}
          dossier={d}
          completedCases={progress.completedCases}
          onPress={() => onDossier(d)}
        />
      ))}

      {/* Collection */}
      <Pressable onPress={onCollection} style={({ pressed }) => [styles.collectionBtn, pressed && { opacity: 0.85 }]}>
        <Text style={styles.collectionBtnIcon}>🃏</Text>
        <Text style={styles.collectionBtnText}>Ma collection de fiches</Text>
        <Text style={styles.collectionBtnCount}>{progress.unlockedFiches.length}/{FICHES.length}</Text>
        <Text style={styles.collectionBtnArrow}>›</Text>
      </Pressable>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
//  Écran Dossier (liste des cas)
// ─────────────────────────────────────────────

function DossierScreen({ dossier, completedCases, onCase, onBack }: {
  dossier: Dossier;
  completedCases: string[];
  onCase: (idx: number) => void;
  onBack: () => void;
}) {
  const done = dossier.cases.filter(c => completedCases.includes(c.id)).length;
  return (
    <ScrollView style={styles.dossierScroll} contentContainerStyle={styles.dossierContent}>
      <View style={styles.screenHeader}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.screenTitle}>{dossier.emoji} {dossier.title}</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={[styles.dossierBanner, { backgroundColor: dossier.color + '22' }]}>
        <Text style={styles.dossierBannerDesc}>{dossier.desc}</Text>
        <Text style={styles.dossierBannerCount}>{done}/{dossier.cases.length} cas résolus</Text>
      </View>

      {dossier.cases.map((cas, idx) => (
        <CaseRow
          key={cas.id}
          cas={cas}
          done={completedCases.includes(cas.id)}
          onPress={() => onCase(idx)}
        />
      ))}
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
//  Écran En Cours (wrapper)
// ─────────────────────────────────────────────

function PlayingScreen({ playState, onRevealNext, onSubmit, onFauxAmis, onConfirm, onBack }: {
  playState: any;
  onRevealNext: () => void;
  onSubmit: (v: number) => void;
  onFauxAmis: (side: 'a' | 'b', t: number) => void;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const c = playState.currentCase;
  const total = playState.dossier.cases.length;
  const progress = (playState.caseIndex + (playState.answered ? 1 : 0)) / total;

  return (
    <View style={styles.playingContainer}>
      {/* Header */}
      <View style={styles.playingHeader}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.playingTitle} numberOfLines={1}>
          {playState.dossier.emoji} {playState.dossier.title}
        </Text>
        <Text style={styles.playingCounter}>{playState.caseIndex + 1}/{total}</Text>
      </View>

      {/* Barre de progression */}
      <View style={styles.playProgressTrack}>
        <View style={[styles.playProgressFill, { width: `${progress * 100}%` }]} />
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

        {/* Bouton Confirmer si réponse donnée */}
        {playState.answered && (
          <Pressable onPress={onConfirm} style={({ pressed }) => [styles.confirmBtn, pressed && { opacity: 0.85 }]}>
            <Text style={styles.confirmBtnText}>Voir le résultat →</Text>
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
  const {
    screen, progress, playState, selectedDossier, selectedFicheId, loading,
    openDossier, openCollection, openFiche, goBack,
    startCase, revealNextIndice, submitAnswer, submitFauxAmis, confirmAndReveal, nextCase,
    getDailyCase,
  } = useDossier();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement des dossiers…</Text>
      </View>
    );
  }

  const handleDailyCase = () => {
    const daily = getDailyCase();
    if (daily) startCase(daily.dossier, daily.caseIndex);
  };

  if (screen === 'hub') {
    return (
      <View style={styles.container}>
        <HubScreen
          progress={progress}
          onDossier={openDossier}
          onCollection={openCollection}
          onDailyCase={handleDailyCase}
        />
      </View>
    );
  }

  if (screen === 'dossier' && selectedDossier) {
    return (
      <View style={styles.container}>
        <DossierScreen
          dossier={selectedDossier}
          completedCases={progress.completedCases}
          onCase={(idx) => startCase(selectedDossier, idx)}
          onBack={goBack}
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
  hubContent: { paddingBottom: spacing.xxl + spacing.xl },
  hubHeader: { paddingTop: spacing.xxl + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  hubTitle: { fontFamily: fonts.serif, fontSize: 26, color: colors.text, marginBottom: 4 },
  hubSub: { fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted, marginBottom: spacing.md },
  hubRankRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },

  rankBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border },
  rankBadgeCompact: { paddingHorizontal: spacing.xs },
  rankEmoji: { fontSize: 20 },
  rankTitle: { fontFamily: fonts.sans, fontSize: 13, fontWeight: '600', color: colors.text },

  streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.accentFill, paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radius.full, borderWidth: 1, borderColor: colors.accent },
  streakText: { fontFamily: fonts.sans, fontSize: 13, fontWeight: '600', color: colors.accent },

  xpBarContainer: { marginTop: spacing.sm },
  xpBarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  xpBarLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted },
  xpBarTrack: { height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' },
  xpBarFill: { height: 6, backgroundColor: colors.accent, borderRadius: 3 },
  xpTotal: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, marginTop: 4 },

  ranksRow: { flexDirection: 'row', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: 4 },
  rankStep: { flex: 1, alignItems: 'center', gap: 2 },
  rankStepDone: {},
  rankStepEmoji: { fontSize: 20 },
  rankStepLocked: { opacity: 0.3 },
  rankStepLabel: { fontFamily: fonts.sans, fontSize: 9, color: colors.textMuted, textAlign: 'center' },
  rankStepLabelDone: { color: colors.accent },

  dailyCard: { marginHorizontal: spacing.md, marginBottom: spacing.md, borderRadius: radius.lg, overflow: 'hidden' },
  dailyGradient: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.md },
  dailyEmoji: { fontSize: 28 },
  dailyInfo: { flex: 1 },
  dailyLabel: { fontFamily: fonts.serif, fontSize: 16, color: colors.white },
  dailyDesc: { fontFamily: fonts.sans, fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  dailyArrow: { fontFamily: fonts.sans, fontSize: 24, color: colors.white },

  sectionTitle: { fontFamily: fonts.serif, fontSize: 18, color: colors.text, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },

  dossierCard: { marginHorizontal: spacing.md, marginBottom: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  dossierCardPressed: { backgroundColor: colors.bgLight, borderColor: colors.accent },
  dossierCardTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  dossierEmojiBg: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  dossierEmoji: { fontSize: 22 },
  dossierCardInfo: { flex: 1 },
  dossierCardTitle: { fontFamily: fonts.serif, fontSize: 17, color: colors.text },
  dossierCardDesc: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },
  completedStar: { fontSize: 18, color: colors.accent },
  dossierProgress: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dossierProgressTrack: { flex: 1, height: 4, backgroundColor: colors.border, borderRadius: 2, overflow: 'hidden' },
  dossierProgressFill: { height: 4, borderRadius: 2 },
  dossierProgressText: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, width: 32, textAlign: 'right' },

  collectionBtn: { marginHorizontal: spacing.md, marginTop: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  collectionBtnIcon: { fontSize: 22 },
  collectionBtnText: { fontFamily: fonts.sans, fontSize: 15, color: colors.text, flex: 1 },
  collectionBtnCount: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },
  collectionBtnArrow: { fontFamily: fonts.sans, fontSize: 22, color: colors.textMuted },

  // ── Navigation commune ──
  screenHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.xxl + spacing.sm, paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  backBtnText: { fontFamily: fonts.sans, fontSize: 28, color: colors.text, lineHeight: 32 },
  screenTitle: { fontFamily: fonts.serif, fontSize: 18, color: colors.text, flex: 1, textAlign: 'center' },
  collectionCount: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },

  // ── Dossier (liste) ──
  dossierScroll: { flex: 1 },
  dossierContent: { paddingBottom: spacing.xxl + spacing.xl },
  dossierBanner: { marginHorizontal: spacing.md, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  dossierBannerDesc: { fontFamily: fonts.sans, fontSize: 14, color: colors.textSoft, marginBottom: 4 },
  dossierBannerCount: { fontFamily: fonts.sans, fontSize: 13, fontWeight: '600', color: colors.accent },

  caseRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border, gap: spacing.sm },
  caseRowDone: { opacity: 0.6 },
  caseRowPressed: { backgroundColor: colors.bgLight },
  caseFormatIcon: { fontSize: 18, width: 28, textAlign: 'center' },
  caseRowInfo: { flex: 1 },
  caseRowTitle: { fontFamily: fonts.sans, fontSize: 15, color: colors.text },
  caseRowFormat: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },
  caseChevron: { fontFamily: fonts.sans, fontSize: 22, color: colors.textMuted },

  // ── Playing ──
  playingContainer: { flex: 1 },
  playingHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.xxl + spacing.sm, paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  playingTitle: { fontFamily: fonts.serif, fontSize: 16, color: colors.text, flex: 1, textAlign: 'center' },
  playingCounter: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, width: 44, textAlign: 'right' },
  playProgressTrack: { height: 3, backgroundColor: colors.border },
  playProgressFill: { height: 3, backgroundColor: colors.accent },
  playScroll: { flex: 1 },
  playScrollContent: { padding: spacing.md, paddingBottom: spacing.xxl + spacing.xl },

  // ── Card de question ──
  playCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },
  playFormatTag: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  playFormatText: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },
  playXpHint: { fontFamily: fonts.sans, fontSize: 12, fontWeight: '600', color: colors.accent },
  playPrompt: { fontFamily: fonts.sans, fontSize: 14, color: colors.textSoft, marginBottom: spacing.md, marginTop: spacing.sm },

  // ── Enquête indices ──
  indiceRow: { backgroundColor: colors.bgLight, borderRadius: radius.sm, padding: spacing.sm, marginBottom: spacing.sm, flexDirection: 'row', gap: spacing.sm },
  indiceRowNew: { borderLeftWidth: 2, borderLeftColor: colors.accent },
  indiceNum: { fontFamily: fonts.sans, fontSize: 11, color: colors.accent, fontWeight: '700', width: 20 },
  indiceText: { fontFamily: fonts.sans, fontSize: 14, color: colors.text, flex: 1, lineHeight: 20 },
  revealBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.full, paddingVertical: 8, paddingHorizontal: spacing.md, alignSelf: 'flex-start', marginBottom: spacing.md },
  revealBtnPressed: { borderColor: colors.accent },
  revealBtnText: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },

  // ── Type grid ──
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, justifyContent: 'center' },
  typeGridBtn: { width: '30%', backgroundColor: colors.bgLight, borderRadius: radius.sm, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  typeGridNum: { fontFamily: fonts.serif, fontSize: 18, fontWeight: '700', color: colors.text },
  typeGridName: { fontFamily: fonts.sans, fontSize: 9, color: colors.textMuted, marginTop: 2 },

  // ── Type badge ──
  typeBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radius.full, borderWidth: 1 },
  typeBadgeSm: { paddingHorizontal: 6, paddingVertical: 4 },
  typeBadgeNum: { fontFamily: fonts.serif, fontSize: 16, fontWeight: '700' },
  typeBadgeNumSm: { fontSize: 13 },
  typeBadgeName: { fontFamily: fonts.sans, fontSize: 12 },

  // ── Citation ──
  quoteBlock: { backgroundColor: colors.bgLight, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md, borderLeftWidth: 3, borderLeftColor: colors.accent },
  quoteText: { fontFamily: fonts.serifItalic, fontSize: 16, color: colors.text, lineHeight: 24, marginBottom: 8 },
  quoteAuthor: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },
  citationOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center' },
  citationOption: { borderRadius: radius.full, borderWidth: 1, borderColor: colors.border },

  // ── Faux amis ──
  fauxAmisIntro: { fontFamily: fonts.sans, fontSize: 14, color: colors.textSoft, lineHeight: 20, marginBottom: spacing.md },
  fauxAmisBlock: { backgroundColor: colors.bgLight, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  fauxAmisBlockCorrect: { borderColor: colors.success, backgroundColor: colors.successBg },
  fauxAmisBlockWrong: { borderColor: colors.errorLight, backgroundColor: colors.errorBg },
  fauxAmisLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  fauxAmisDesc: { fontFamily: fonts.sans, fontSize: 14, color: colors.text, lineHeight: 20, marginBottom: spacing.sm },
  fauxAmisTypes: { flexDirection: 'row', gap: spacing.sm },
  fauxAmisTypeBtn: { borderRadius: radius.full, borderWidth: 1, borderColor: colors.border, padding: 4 },
  fauxAmisTypeBtnSelected: { borderColor: colors.accent },
  keyDiffBox: { marginTop: spacing.sm, backgroundColor: colors.accentFill, borderRadius: radius.md, padding: spacing.md },
  keyDiffLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.accent, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  keyDiffText: { fontFamily: fonts.sans, fontSize: 14, color: colors.text, lineHeight: 20 },

  // ── Détail ──
  sceneBlock: { backgroundColor: colors.bgLight, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md, borderLeftWidth: 3, borderLeftColor: colors.teal },
  sceneText: { fontFamily: fonts.serifItalic, fontSize: 15, color: colors.text, lineHeight: 24 },
  detailReveal: { backgroundColor: colors.accentFill, borderRadius: radius.md, padding: spacing.md },
  detailKeyLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.accent, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  detailKeyText: { fontFamily: fonts.sans, fontSize: 14, color: colors.text, lineHeight: 20 },

  // ── Options état ──
  optCorrect: { backgroundColor: colors.successBg, borderColor: colors.success },
  optWrong: { backgroundColor: colors.errorBg, borderColor: colors.errorLight },
  optPressed: { backgroundColor: colors.accentFill, borderColor: colors.accent },
  textCorrect: { color: colors.successDark },
  textWrong: { color: colors.errorDark },

  // ── Confirm btn ──
  confirmBtn: { backgroundColor: colors.accent, paddingVertical: 14, borderRadius: radius.full, alignItems: 'center', marginTop: spacing.sm },
  confirmBtnText: { fontFamily: fonts.sans, fontSize: 16, fontWeight: '600', color: colors.white },

  // ── Reveal ──
  revealScroll: { flex: 1 },
  revealContent: { padding: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.xxl + spacing.xl },
  revealResult: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, borderRadius: radius.lg, marginBottom: spacing.md },
  revealCorrect: { backgroundColor: colors.successBg, borderWidth: 1, borderColor: colors.success },
  revealWrong: { backgroundColor: colors.errorBg, borderWidth: 1, borderColor: colors.errorLight },
  revealResultIcon: { fontSize: 32 },
  revealResultLabel: { fontFamily: fonts.serif, fontSize: 20, color: colors.text },
  revealTypeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  revealTypeName: { fontFamily: fonts.serif, fontSize: 18, color: colors.text },
  revealExplanation: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },
  revealExplanationText: { fontFamily: fonts.sans, fontSize: 14, color: colors.textSoft, lineHeight: 22 },
  ficheUnlockCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },
  ficheUnlockDot: { width: 10, height: 10, borderRadius: 5 },
  ficheUnlockInfo: { flex: 1 },
  ficheUnlockLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
  ficheUnlockName: { fontFamily: fonts.serif, fontSize: 16, color: colors.text },
  ficheUnlockArrow: { fontFamily: fonts.sans, fontSize: 22, color: colors.textMuted },
  nextBtn: { backgroundColor: colors.accent, paddingVertical: 14, borderRadius: radius.full, alignItems: 'center' },
  nextBtnText: { fontFamily: fonts.sans, fontSize: 16, fontWeight: '600', color: colors.white },

  // ── XP chip ──
  xpChip: { backgroundColor: colors.accent, paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.full, alignSelf: 'flex-start', marginTop: 4 },
  xpChipText: { fontFamily: fonts.sans, fontSize: 13, fontWeight: '700', color: colors.white },

  // ── Collection ──
  collectionScroll: { flex: 1 },
  collectionContent: { paddingBottom: spacing.xxl + spacing.xl },
  collectionTypeGroup: { marginBottom: spacing.md },
  collectionTypeHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  collectionTypeDot: { width: 8, height: 8, borderRadius: 4 },
  collectionTypeLabel: { fontFamily: fonts.sans, fontSize: 13, fontWeight: '600', color: colors.textSoft },
  collectionCards: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.md, gap: spacing.xs },
  collectionCard: { backgroundColor: colors.surface, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 8, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: 6 },
  collectionCardLocked: { opacity: 0.5 },
  collectionCardDot: { width: 6, height: 6, borderRadius: 3 },
  collectionCardName: { fontFamily: fonts.sans, fontSize: 13, color: colors.text },
  collectionCardNameLocked: { color: colors.textMuted },

  // ── Fiche ──
  ficheScroll: { flex: 1 },
  ficheContent: { paddingBottom: spacing.xxl + spacing.xl },
  ficheHero: { margin: spacing.md, borderRadius: radius.lg, padding: spacing.xl, alignItems: 'center', borderWidth: 1, gap: spacing.sm },
  ficheAvatar: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  ficheAvatarLetter: { fontFamily: fonts.serif, fontSize: 32, fontWeight: '700' },
  ficheName: { fontFamily: fonts.serif, fontSize: 24, color: colors.text },
  ficheQuoteBlock: { marginHorizontal: spacing.md, marginBottom: spacing.md, padding: spacing.lg, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, borderLeftWidth: 3 },
  ficheQuote: { fontFamily: fonts.serifItalic, fontSize: 15, color: colors.text, lineHeight: 24, marginBottom: 8 },
  ficheQuoteSource: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },
  ficheInfoCard: { marginHorizontal: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  ficheInfoRow: { padding: spacing.md },
  ficheInfoDivider: { height: 1, backgroundColor: colors.border },
  ficheInfoLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  ficheInfoValue: { fontFamily: fonts.sans, fontSize: 14, color: colors.text, lineHeight: 20 },
  ficheWhyCard: { marginHorizontal: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  ficheWhyLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.accent, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  ficheWhyText: { fontFamily: fonts.sans, fontSize: 14, color: colors.textSoft, lineHeight: 22 },
});
