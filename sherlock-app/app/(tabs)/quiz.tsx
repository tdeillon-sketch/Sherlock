import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet,
  useWindowDimensions, TextInput, Alert, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { TYPES } from '../../constants/data';
import { useAdaptiveQuiz } from '../../hooks/useAdaptiveQuiz';
import type { SecondOpinionResult } from '../../hooks/useAdaptiveQuiz';
import { trackScreen } from '../../constants/firebase';
import RadarChart from '../../components/RadarChart';
import AdaptiveQuestion from '../../components/AdaptiveQuestion';
import QuizResult from '../../components/QuizResult';
import ConfidenceBar from '../../components/ConfidenceBar';
import { auth, saveQuizResult, type ChildProfile } from '../../constants/firebase';
import { TYPES as TYPES_V3 } from '../../constants/quiz_v3';
import type { QuizSubject, EnneaType } from '../../constants/quiz_v3';
import { useT, getTypeText } from '../../i18n';
import { hapticLight } from '../../utils/haptics';

const SUBJECTS: { key: QuizSubject; emoji: string; titleKey: string; descKey: string }[] = [
  { key: 'enfant', emoji: '🧒', titleKey: 'subject.childTitle', descKey: 'subject.childDesc' },
  { key: 'self',   emoji: '🪞', titleKey: 'subject.selfTitle',  descKey: 'subject.selfDesc' },
];

const AGE_BANDS: { min: number; emoji: string; titleKey: string; descKey: string }[] = [
  { min: 5,  emoji: '🧸', titleKey: 'age.band58',   descKey: 'age.band58Desc' },
  { min: 9,  emoji: '🎒', titleKey: 'age.band912',  descKey: 'age.band912Desc' },
  { min: 13, emoji: '🎧', titleKey: 'age.band1317', descKey: 'age.band1317Desc' },
];

const TYPE_COLORS: Record<number, string> = {
  1: '#6b8f71', 2: '#c0713a', 3: '#d4a437', 4: '#7b68b5',
  5: '#4a90d9', 6: '#5b9e8f', 7: '#e07b54', 8: '#c0443a', 9: '#8fa68f',
};

export default function QuizScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const { t } = useT();
  useEffect(() => { trackScreen('quiz').catch(() => {}); }, []);

  const {
    phase, subject, ageBand, childAge, currentPage, scores,
    stepIndex, estimatedTotal, result, childProfiles, canAdvance, pageIndex,
    selectSubject, selectAge, goToProcheMode,
    updateResponse, advancePage, goToPrevPage,
    reset, restartSameSubject,
    goToSaveProfile, goToHistory, backToResult,
    saveChildResult, deleteChildProfile,
    startSecondOpinion, beginSecondQuestions, updateSecondResponse,
    advanceSecondPage, secondCurrentPage, secondPageIndex, secondTotal, secondResult,
  } = useAdaptiveQuiz();

  // Save quiz result to Firebase au passage en 'result'
  const savedRef = useRef(false);
  useEffect(() => {
    // On n'enregistre dans l'historique perso que SES propres tests (soi / enfant).
    // Un proche se sauvegarde explicitement comme profil nommé (pas d'auto-save).
    if (phase === 'result' && (subject === 'self' || subject === 'enfant') && result && !savedRef.current) {
      savedRef.current = true;
      const uid = auth.currentUser?.uid;
      if (uid) {
        saveQuizResult(uid, {
          mode: subject === 'self' ? 'adulte' : (ageBand ?? 'enfant'),
          topType: result.topType,
          wingType: result.wingType,
          scores,
          completedAt: new Date().toISOString(),
        }).catch(() => {});
      }
    }
    if (phase !== 'result') savedRef.current = false;
  }, [phase, subject, ageBand, result, scores]);

  // ── Entrance animations: fade the radar in, reveal the result card ──
  const radarAnim = useRef(new Animated.Value(0)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (phase === 'questions') {
      Animated.timing(radarAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }
  }, [phase, radarAnim]);
  useEffect(() => {
    if (phase === 'result') {
      resultAnim.setValue(0);
      Animated.timing(resultAnim, { toValue: 1, duration: 450, useNativeDriver: true }).start();
    }
  }, [phase, resultAnim]);

  // ─────────────────────────────────────────────
  //  PHASE: select_subject
  // ─────────────────────────────────────────────
  if (phase === 'select_subject') {
    return (
      <View style={styles.selectContainer}>
        <View style={styles.selectInner}>
          <Text style={styles.selectTitle}>{t('subject.title')}</Text>
          <Text style={styles.selectSub}>{t('subject.subtitle')}</Text>

          {SUBJECTS.map((s) => (
            <Pressable
              key={s.key}
              style={({ pressed }) => [styles.modeCard, pressed && styles.modeCardPressed]}
              onPress={() => selectSubject(s.key)}
            >
              <Text style={styles.modeEmoji}>{s.emoji}</Text>
              <View style={styles.modeText}>
                <Text style={styles.modeTitle}>{t(s.titleKey)}</Text>
                <Text style={styles.modeDesc}>{t(s.descKey)}</Text>
              </View>
            </Pressable>
          ))}

          <Pressable
            style={({ pressed }) => [styles.modeCard, pressed && styles.modeCardPressed]}
            onPress={goToProcheMode}
          >
            <Text style={styles.modeEmoji}>👥</Text>
            <View style={styles.modeText}>
              <Text style={styles.modeTitle}>{t('subject.procheTitle')}</Text>
              <Text style={styles.modeDesc}>{t('subject.procheDesc')}</Text>
            </View>
          </Pressable>

          {childProfiles.length > 0 && (
            <Pressable style={styles.historyBtn} onPress={goToHistory}>
              <Text style={styles.historyBtnText}>
                📊 {t('subject.history')} ({childProfiles.length})
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  // ─────────────────────────────────────────────
  //  PHASE: age_picker (mode enfant uniquement)
  // ─────────────────────────────────────────────
  if (phase === 'age_picker') {
    return (
      <View style={styles.selectContainer}>
        <View style={styles.selectInner}>
          <Pressable onPress={reset} style={styles.backLink}>
            <Text style={styles.backLinkText}>‹ {t('common.back')}</Text>
          </Pressable>
          <Text style={styles.selectTitle}>{t('age.title')}</Text>
          <Text style={styles.selectSub}>{t('age.subtitle')}</Text>

          {AGE_BANDS.map((b) => (
            <Pressable
              key={b.min}
              style={({ pressed }) => [styles.modeCard, pressed && styles.modeCardPressed]}
              onPress={() => selectAge(b.min)}
            >
              <Text style={styles.modeEmoji}>{b.emoji}</Text>
              <View style={styles.modeText}>
                <Text style={styles.modeTitle}>{t(b.titleKey)}</Text>
                <Text style={styles.modeDesc}>{t(b.descKey)}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }

  // ─────────────────────────────────────────────
  //  PHASE: history
  // ─────────────────────────────────────────────
  if (phase === 'history') {
    return <HistoryScreen profiles={childProfiles} onBack={reset} onDelete={deleteChildProfile} />;
  }

  // ─────────────────────────────────────────────
  //  PHASE: save_profile
  // ─────────────────────────────────────────────
  if (phase === 'save_profile') {
    return (
      <SaveProfileScreen
        existingProfiles={childProfiles}
        onCancel={backToResult}
        onSave={async (name, age, existingId) => {
          await saveChildResult(name, age, existingId);
          backToResult();
        }}
      />
    );
  }

  // ─────────────────────────────────────────────
  //  PHASE: proche_mode (il répond / je le décris)
  // ─────────────────────────────────────────────
  if (phase === 'proche_mode') {
    return (
      <View style={styles.selectContainer}>
        <View style={styles.selectInner}>
          <Pressable onPress={reset} style={styles.backLink}>
            <Text style={styles.backLinkText}>‹ {t('common.back')}</Text>
          </Pressable>
          <Text style={styles.selectTitle}>{t('proche.title')}</Text>
          <Text style={styles.selectSub}>{t('proche.subtitle')}</Text>

          <Pressable
            style={({ pressed }) => [styles.modeCard, pressed && styles.modeCardPressed]}
            onPress={() => selectSubject('proche-self')}
          >
            <Text style={styles.modeEmoji}>🗣️</Text>
            <View style={styles.modeText}>
              <Text style={styles.modeTitle}>{t('proche.selfTitle')}</Text>
              <Text style={styles.modeDesc}>{t('proche.selfDesc')}</Text>
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.modeCard, pressed && styles.modeCardPressed]}
            onPress={() => selectSubject('proche-obs')}
          >
            <Text style={styles.modeEmoji}>👀</Text>
            <View style={styles.modeText}>
              <Text style={styles.modeTitle}>{t('proche.obsTitle')}</Text>
              <Text style={styles.modeDesc}>{t('proche.obsDesc')}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }

  // ─────────────────────────────────────────────
  //  PHASE: second_intro (passe le tél à un proche)
  // ─────────────────────────────────────────────
  if (phase === 'second_intro') {
    return (
      <View style={styles.selectContainer}>
        <View style={styles.selectInner}>
          <Text style={styles.modeEmoji}>👥</Text>
          <Text style={styles.selectTitle}>{t('second.introTitle')}</Text>
          <Text style={styles.selectSub}>{t('second.introBody')}</Text>
          <Pressable
            onPress={() => { hapticLight(); beginSecondQuestions(); }}
            style={({ pressed }) => [styles.saveBtn, { width: '100%' }, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.saveBtnText}>{t('second.introStart')}</Text>
          </Pressable>
          <Pressable onPress={backToResult} style={styles.skipBtn}>
            <Text style={styles.skipBtnText}>{t('second.introCancel')}</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ─────────────────────────────────────────────
  //  PHASE: second_questions (round court, pool observé)
  // ─────────────────────────────────────────────
  if (phase === 'second_questions' && secondCurrentPage) {
    const last = secondPageIndex >= secondTotal - 1;
    return (
      <View style={styles.narrowContainer}>
        <View style={styles.quizTopBar}>
          <Pressable onPress={backToResult} style={styles.quizBackBtn}>
            <Text style={styles.quizBackBtnText}>‹</Text>
          </Pressable>
          <Text style={styles.quizTopBarTitle}>{t('subject.headerProche')}</Text>
          <View style={styles.quizBackBtn} />
        </View>
        <ScrollView
          style={styles.scrollFlex}
          contentContainerStyle={styles.narrowScroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.progressCaption, { marginTop: spacing.md }]}>
            {t('second.pageN', { n: secondPageIndex + 1 })}
          </Text>
          <View style={styles.questionArea}>
            <AdaptiveQuestion
              page={secondCurrentPage}
              pageIndex={secondPageIndex}
              ageBand={'adulte-obs'}
              onChange={updateSecondResponse}
            />
            <View style={styles.navRow}>
              <View style={{ width: 100 }} />
              <Pressable
                onPress={() => { hapticLight(); advanceSecondPage(); }}
                style={({ pressed }) => [styles.navBtn, styles.navBtnPrimary, pressed && { opacity: 0.85 }]}
              >
                <Text style={styles.navBtnPrimaryText}>
                  {last ? t('second.seeResult') : t('quiz.nextPage')}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // ─────────────────────────────────────────────
  //  PHASE: second_result (accord / divergence)
  // ─────────────────────────────────────────────
  if (phase === 'second_result' && secondResult) {
    return <SecondResultScreen sr={secondResult} onDone={backToResult} />;
  }

  // ── Common header pour le flow actif ──
  // Confirm before discarding an in-progress quiz (back during questions wipes
  // all answers). On result/other phases, just reset.
  const handleBack = () => {
    if (phase === 'questions') {
      Alert.alert(
        t('quiz.quitTitle'),
        t('quiz.quitBody'),
        [
          { text: t('common.cancel'), style: 'cancel' },
          { text: t('quiz.quitConfirm'), style: 'destructive', onPress: reset },
        ],
      );
    } else {
      reset();
    }
  };

  const subjectLabel =
    subject === 'self'
      ? t('subject.headerSelf')
      : (subject === 'proche-self' || subject === 'proche-obs')
        ? t('subject.headerProche')
        : childAge != null
          ? t('subject.headerChildAge', { age: childAge })
          : t('subject.headerChild');

  const radarSize = isWide ? 320 : Math.min(width * 0.72, 300);
  const radarSection = (
    <Animated.View style={[styles.radarSection, isWide && styles.radarSectionWide, { opacity: radarAnim }]}>
      <RadarChart scores={scores as unknown as Record<number, number>} size={radarSize} />
      <Text style={styles.radarCaption}>{t('quiz.radarCaption')}</Text>
      {phase === 'result' && (
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
          <Text style={styles.legendText}>
            {subject === 'self'
              ? t('subject.legendSelf')
              : (subject === 'proche-self' || subject === 'proche-obs')
                ? t('subject.legendProche')
                : t('subject.legendChild')}
          </Text>
        </View>
      )}
    </Animated.View>
  );

  const topBar = (
    <View style={styles.quizTopBar}>
      <Pressable onPress={handleBack} style={styles.quizBackBtn}>
        <Text style={styles.quizBackBtnText}>‹</Text>
      </Pressable>
      <Text style={styles.quizTopBarTitle}>{subjectLabel}</Text>
      <View style={styles.quizBackBtn} />
    </View>
  );

  // Progression : stepIndex / estimatedTotal
  const progress =
    phase === 'result' ? 1 :
    Math.min(stepIndex / Math.max(1, estimatedTotal), 0.98);

  const progressCaption =
    phase === 'questions' && currentPage
      ? (currentPage.kind === 'wing' ? t('quiz.lastStep') : t('quiz.pageN', { n: pageIndex + 1 }))
      : null;

  const progressBar = (
    <View>
      <View style={styles.progressTrack}>
        <LinearGradient
          colors={[colors.accent, '#e8a06a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressFill, { width: `${progress * 100}%` as any }]}
        />
      </View>
      {progressCaption && <Text style={styles.progressCaption}>{progressCaption}</Text>}
    </View>
  );

  // ─────────────────────────────────────────────
  //  Contenu central selon la phase
  // ─────────────────────────────────────────────
  let mainContent: React.ReactNode = null;

  // Pages du quiz (likert / budget / final / wing)
  if (phase === 'questions' && currentPage && ageBand) {
    mainContent = (
      <View>
        <AdaptiveQuestion
          page={currentPage}
          pageIndex={pageIndex}
          ageBand={ageBand}
          onChange={updateResponse}
        />
        {(currentPage.kind === 'budget' || currentPage.kind === 'final') && !canAdvance && (
          <Text style={styles.navHint}>{t('quiz.distributeToContinue')}</Text>
        )}
        <View style={styles.navRow}>
          {pageIndex > 0 ? (
            <Pressable onPress={goToPrevPage} style={({ pressed }) => [styles.navBtn, styles.navBtnGhost, pressed && { opacity: 0.7 }]}>
              <Text style={styles.navBtnGhostText}>← {t('common.previous')}</Text>
            </Pressable>
          ) : <View style={{ width: 100 }} />}
          <Pressable
            onPress={() => { hapticLight(); advancePage(); }}
            disabled={!canAdvance}
            style={({ pressed }) => [
              styles.navBtn,
              styles.navBtnPrimary,
              !canAdvance && { opacity: 0.4 },
              pressed && canAdvance && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.navBtnPrimaryText}>
              {currentPage.kind === 'wing' ? t('quiz.seeProfile') : t('quiz.nextPage')}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Résultat
  if (phase === 'result' && result) {
    // Adapter du résultat adaptatif vers le format attendu par QuizResult
    const adaptedResult = {
      topType: result.topType,
      topPercent: result.topPercent,
      secondType: result.secondType,
      secondPercent: result.secondPercent,
      thirdType: result.thirdType,
      thirdPercent: result.thirdPercent,
      wingType: result.wingType,
      isAmbiguous: result.confidence < 60,
      ambiguousPair: null as [number, number] | null,
      insightKind: result.insightKind,
    };
    // mode pour QuizResult : 'enfant' si subject=enfant, 'adulte' si self
    const legacyMode = subject === 'enfant' ? 'enfant' : 'adulte';

    mainContent = (
      <Animated.View
        style={{
          opacity: resultAnim,
          transform: [{ translateY: resultAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
        }}
      >
        <QuizResult
          result={adaptedResult}
          mode={legacyMode}
          onViewProfile={() => router.push(`/profiles/${result.topType}` as never)}
          onSaveProfile={goToSaveProfile}
          onNewChild={restartSameSubject}
          onReset={reset}
        />

        {/* Second avis : proposé seulement pour l'auto-évaluation */}
        {subject === 'self' && (
          <Pressable
            onPress={() => { hapticLight(); startSecondOpinion(); }}
            style={({ pressed }) => [styles.secondCta, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.secondCtaText}>{t('second.cta')}</Text>
          </Pressable>
        )}

        {/* Score de confiance (sans bouton "Affiner" — retiré en v3) */}
        <ConfidenceBar confidence={result.confidence} />
      </Animated.View>
    );
  }

  // ── Layout ──
  if (isWide) {
    return (
      <View style={styles.wideContainer}>
        <LinearGradient colors={[colors.bg, colors.bgLight]} style={styles.leftPanel}>
          {radarSection}
        </LinearGradient>
        <View style={styles.rightPanel}>
          {topBar}
          {progressBar}
          <ScrollView
            style={styles.scrollFlex}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {mainContent}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.narrowContainer}>
      {topBar}
      {progressBar}
      <ScrollView
        style={styles.scrollFlex}
        contentContainerStyle={styles.narrowScroll}
        showsVerticalScrollIndicator={false}
      >
        {radarSection}
        <View style={styles.questionArea}>{mainContent}</View>
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────
//  Save Profile screen
// ─────────────────────────────────────────────

function SaveProfileScreen({
  existingProfiles, onCancel, onSave,
}: {
  existingProfiles: ChildProfile[];
  onCancel: () => void;
  onSave: (name: string, age: number | undefined, existingId: string | undefined) => void;
}) {
  const [name, setName] = useState('');
  const [ageStr, setAgeStr] = useState('');
  const [selectedExisting, setSelectedExisting] = useState<string | null>(null);
  const { t } = useT();

  const canSave = selectedExisting || name.trim().length > 0;

  return (
    <ScrollView style={styles.saveContainer} contentContainerStyle={styles.saveContent}>
      <View style={styles.quizTopBar}>
        <Pressable onPress={onCancel} style={styles.quizBackBtn}>
          <Text style={styles.quizBackBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.quizTopBarTitle}>{t('saveProfile.title')}</Text>
        <View style={styles.quizBackBtn} />
      </View>

      <Text style={styles.saveTitle}>{t('saveProfile.title')}</Text>
      <Text style={styles.saveSub}>{t('saveProfile.subtitle')}</Text>

      {existingProfiles.length > 0 && (
        <>
          <Text style={styles.saveSectionLabel}>{t('saveProfile.addToExisting')}</Text>
          {existingProfiles.map(p => (
            <Pressable
              key={p.id}
              onPress={() => { setSelectedExisting(p.id); setName(''); }}
              style={[
                styles.saveProfileCard,
                selectedExisting === p.id && styles.saveProfileCardActive,
              ]}
            >
              <Text style={styles.saveProfileName}>{p.name}</Text>
              <Text style={styles.saveProfileMeta}>
                {p.history.length > 1 ? t('history.nbTests', { n: p.history.length }) : t('history.nbTest', { n: p.history.length })} · {t('history.last', { t: p.history[p.history.length - 1]?.topType })}
              </Text>
            </Pressable>
          ))}

          <Text style={[styles.saveSectionLabel, { marginTop: spacing.lg }]}>{t('saveProfile.createNew')}</Text>
        </>
      )}

      <TextInput
        value={name}
        onChangeText={(tt) => { setName(tt); setSelectedExisting(null); }}
        placeholder={t('saveProfile.namePlaceholder')}
        placeholderTextColor={colors.textDim}
        style={styles.saveInput}
      />
      <TextInput
        value={ageStr}
        onChangeText={setAgeStr}
        placeholder={t('saveProfile.agePlaceholder')}
        placeholderTextColor={colors.textDim}
        keyboardType="numeric"
        style={styles.saveInput}
      />

      <Pressable
        onPress={() => {
          const age = ageStr ? parseInt(ageStr, 10) : undefined;
          onSave(name, age, selectedExisting ?? undefined);
        }}
        disabled={!canSave}
        style={({ pressed }) => [
          styles.saveBtn,
          !canSave && { opacity: 0.4 },
          pressed && canSave && { opacity: 0.85 },
        ]}
      >
        <Text style={styles.saveBtnText}>{t('saveProfile.save')}</Text>
      </Pressable>

      <Pressable onPress={onCancel} style={styles.skipBtn}>
        <Text style={styles.skipBtnText}>{t('common.cancel')}</Text>
      </Pressable>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
//  History screen
// ─────────────────────────────────────────────

function HistoryScreen({ profiles, onBack, onDelete }: { profiles: ChildProfile[]; onBack: () => void; onDelete: (id: string) => void }) {
  const { t, locale } = useT();
  const dateLocale = locale === 'en' ? 'en-US' : 'fr-FR';
  return (
    <ScrollView style={styles.saveContainer} contentContainerStyle={styles.saveContent}>
      <View style={styles.quizTopBar}>
        <Pressable onPress={onBack} style={styles.quizBackBtn}>
          <Text style={styles.quizBackBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.quizTopBarTitle}>{t('history.title')}</Text>
        <View style={styles.quizBackBtn} />
      </View>

      {profiles.length === 0 ? (
        <Text style={styles.historyEmpty}>{t('history.empty')}</Text>
      ) : (
        profiles.map(p => (
          <View key={p.id} style={styles.historyCard}>
            <View style={styles.historyCardHeader}>
              <Text style={styles.historyCardName}>{p.name}</Text>
              <View style={styles.historyCardHeaderRight}>
                {p.age !== undefined && (
                  <Text style={styles.historyCardAge}>{t('subject.yearsOld', { n: p.age })}</Text>
                )}
                <Pressable
                  hitSlop={10}
                  onPress={() => Alert.alert(
                    t('history.deleteTitle'),
                    t('history.deleteBody', { name: p.name }),
                    [
                      { text: t('common.cancel'), style: 'cancel' },
                      { text: t('history.deleteAction'), style: 'destructive', onPress: () => onDelete(p.id) },
                    ],
                  )}
                  style={({ pressed }) => [styles.historyDeleteBtn, pressed && { opacity: 0.6 }]}
                >
                  <Text style={styles.historyDeleteIcon}>🗑</Text>
                </Pressable>
              </View>
            </View>

            {p.history.map((entry, idx) => {
              const v3 = TYPES_V3[entry.topType as EnneaType];
              const typeName = v3 ? getTypeText(v3, 'name', locale) : (TYPES[entry.topType - 1]?.name ?? '');
              return (
                <View key={idx} style={styles.historyEntry}>
                  <View style={[styles.historyDot, { backgroundColor: TYPE_COLORS[entry.topType] }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.historyEntryDate}>
                      {new Date(entry.date).toLocaleDateString(dateLocale, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </Text>
                    <Text style={styles.historyEntryType}>
                      {t('result.type')} {entry.topType}{entry.wingType ? `w${entry.wingType}` : ''} · {typeName}
                    </Text>
                    <Text style={styles.historyEntryPercent}>
                      {t('history.vsSecond', { p: entry.topPercent, q: entry.secondPercent, t: entry.secondType })}
                    </Text>
                    {entry.note && (
                      <Text style={styles.historyEntryNote}>« {entry.note} »</Text>
                    )}
                  </View>
                </View>
              );
            })}

            {p.history.length >= 2 && (
              <Text style={styles.historyEvolution}>
                {p.history[0].topType === p.history[p.history.length - 1].topType
                  ? t('history.stable', { n: p.history.length })
                  : t('history.evolution', { from: p.history[0].topType, to: p.history[p.history.length - 1].topType })}
              </Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
//  Second opinion result (you vs a close person)
// ─────────────────────────────────────────────

function SecondResultScreen({ sr, onDone }: { sr: SecondOpinionResult; onDone: () => void }) {
  const { t, locale } = useT();
  const agree = sr.agree;
  return (
    <ScrollView style={styles.saveContainer} contentContainerStyle={styles.saveContent}>
      <View style={styles.quizTopBar}>
        <Pressable onPress={onDone} style={styles.quizBackBtn}>
          <Text style={styles.quizBackBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.quizTopBarTitle}>{t('second.resultTitle')}</Text>
        <View style={styles.quizBackBtn} />
      </View>

      <Text style={styles.saveTitle}>{agree ? t('second.agreeTitle') : t('second.divergeTitle')}</Text>
      <Text style={styles.saveSub}>
        {agree
          ? t('second.agreeBody', { self: sr.selfTop })
          : t('second.divergeBody', { self: sr.selfTop, obs: sr.observerTop })}
      </Text>

      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md }}>
        {sr.candidates.map((c) => {
          const v3 = TYPES_V3[c.type as EnneaType];
          const name = v3 ? getTypeText(v3, 'name', locale) : (TYPES[c.type - 1]?.name ?? '');
          return (
            <View key={c.type} style={styles.cmpRow}>
              <Text style={styles.cmpType}>{t('result.type')} {c.type} · {name}</Text>
              <View style={styles.cmpBarLine}>
                <Text style={styles.cmpBarLabel}>{t('second.youLabel')}</Text>
                <View style={styles.cmpTrack}>
                  <View style={[styles.cmpFill, { width: `${c.selfPercent}%` as any, backgroundColor: colors.accent }]} />
                </View>
                <Text style={styles.cmpPct}>{c.selfPercent}%</Text>
              </View>
              <View style={styles.cmpBarLine}>
                <Text style={styles.cmpBarLabel}>{t('second.themLabel')}</Text>
                <View style={styles.cmpTrack}>
                  <View style={[styles.cmpFill, { width: `${c.obsPercent}%` as any, backgroundColor: TYPE_COLORS[c.type] }]} />
                </View>
                <Text style={styles.cmpPct}>{c.obsPercent}%</Text>
              </View>
            </View>
          );
        })}
      </View>

      <Pressable onPress={onDone} style={({ pressed }) => [styles.saveBtn, pressed && { opacity: 0.85 }]}>
        <Text style={styles.saveBtnText}>{t('second.done')}</Text>
      </Pressable>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  selectContainer: {
    flex: 1, backgroundColor: colors.bg,
    justifyContent: 'center', alignItems: 'center', padding: spacing.lg,
  },
  selectInner: { width: '100%', maxWidth: 400, alignItems: 'center' },
  selectTitle: {
    fontFamily: fonts.serif, fontSize: 24, color: colors.text,
    textAlign: 'center', marginBottom: spacing.sm,
  },
  selectSub: {
    fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted,
    textAlign: 'center', marginBottom: spacing.xl, lineHeight: 21,
  },
  modeCard: {
    flexDirection: 'row', alignItems: 'center', width: '100%',
    padding: spacing.lg, backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    marginBottom: spacing.md,
  },
  modeCardPressed: { borderColor: colors.accent, backgroundColor: colors.bgLight },
  modeEmoji: { fontSize: 32, marginRight: spacing.lg },
  modeText: { flex: 1 },
  modeTitle: { fontFamily: fonts.serif, fontSize: 18, color: colors.text, marginBottom: 2 },
  modeDesc: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },

  backLink: {
    alignSelf: 'flex-start', marginBottom: spacing.md, padding: spacing.xs,
  },
  backLinkText: { fontFamily: fonts.sans, fontSize: 14, color: colors.accent },

  historyBtn: {
    marginTop: spacing.lg, padding: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border, width: '100%', alignItems: 'center',
  },
  historyBtnText: { fontFamily: fonts.sans, fontSize: 13, color: colors.accent, fontWeight: '600' },

  // Wide layout
  wideContainer: { flex: 1, flexDirection: 'row', backgroundColor: colors.bg },
  leftPanel: { width: '42%', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xl },
  rightPanel: { flex: 1, backgroundColor: colors.bg },

  // Narrow
  narrowContainer: { flex: 1, backgroundColor: colors.bg },
  narrowScroll: { paddingBottom: spacing.xl },
  questionArea: { paddingHorizontal: spacing.md },

  // Radar
  radarSection: { alignItems: 'center', paddingTop: spacing.md, paddingBottom: spacing.xs },
  radarSectionWide: { paddingVertical: spacing.xxl },
  radarCaption: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textDim,
    textAlign: 'center', marginTop: spacing.xs,
  },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: spacing.xs },
  legendText: { fontFamily: fonts.sans, fontSize: 12, color: colors.textDim },

  // Top bar
  quizTopBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: spacing.xxl + spacing.sm, paddingHorizontal: spacing.md, paddingBottom: spacing.xs,
  },
  quizBackBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  quizBackBtnText: { fontFamily: fonts.sans, fontSize: 28, color: colors.text, lineHeight: 32 },
  quizTopBarTitle: { fontFamily: fonts.serif, fontSize: 16, color: colors.text },

  // Progress
  progressTrack: { height: 3, backgroundColor: colors.subtle06 },
  progressFill: { height: 3, borderRadius: 2 },
  progressCaption: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
    textAlign: 'center', marginTop: 4, letterSpacing: 0.3,
  },
  navHint: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.accent, fontWeight: '600',
    textAlign: 'center', paddingHorizontal: spacing.md, marginBottom: spacing.xs,
  },
  scrollFlex: { flex: 1 },
  scrollContent: { paddingBottom: spacing.xxl },

  skipBtn: { padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  skipBtnText: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted,
    textDecorationLine: 'underline',
  },

  // Nav row (Précédent / Suivant)
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  navBtn: {
    paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    minWidth: 100, alignItems: 'center', justifyContent: 'center',
  },
  navBtnPrimary: {
    backgroundColor: colors.accent,
  },
  navBtnPrimaryText: {
    fontFamily: fonts.sans, fontSize: 14, fontWeight: '600', color: colors.white,
  },
  navBtnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1, borderColor: colors.border,
  },
  navBtnGhostText: {
    fontFamily: fonts.sans, fontSize: 14, color: colors.textSoft,
  },

  // Save Profile
  saveContainer: { flex: 1, backgroundColor: colors.bg },
  saveContent: { paddingBottom: spacing.xxl + spacing.xl },
  saveTitle: {
    fontFamily: fonts.serif, fontSize: 22, color: colors.text,
    paddingHorizontal: spacing.lg, marginTop: spacing.md, marginBottom: spacing.sm,
  },
  saveSub: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted,
    paddingHorizontal: spacing.lg, marginBottom: spacing.lg, lineHeight: 19,
  },
  saveSectionLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.accent, letterSpacing: 0.8, textTransform: 'uppercase',
    paddingHorizontal: spacing.lg, marginBottom: spacing.sm,
  },
  saveProfileCard: {
    marginHorizontal: spacing.lg, marginBottom: spacing.sm,
    padding: spacing.md, backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border,
  },
  saveProfileCardActive: { borderColor: colors.accent, backgroundColor: colors.accentFill },
  saveProfileName: { fontFamily: fonts.serif, fontSize: 16, color: colors.text },
  saveProfileMeta: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 2 },

  saveInput: {
    marginHorizontal: spacing.lg, marginBottom: spacing.md,
    padding: spacing.md, backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    fontFamily: fonts.sans, fontSize: 14, color: colors.text,
  },

  saveBtn: {
    marginHorizontal: spacing.lg, marginTop: spacing.md,
    backgroundColor: colors.accent, padding: spacing.md,
    borderRadius: radius.md, alignItems: 'center',
  },
  saveBtnText: { fontFamily: fonts.sans, fontSize: 15, fontWeight: '700', color: colors.white },

  // History
  historyEmpty: {
    textAlign: 'center', padding: spacing.xl,
    fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted,
  },
  historyCard: {
    marginHorizontal: spacing.md, marginBottom: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border, padding: spacing.md,
  },
  historyCardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.md, paddingBottom: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  historyCardName: { fontFamily: fonts.serif, fontSize: 20, color: colors.text },
  historyCardHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  historyCardAge: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },
  historyDeleteBtn: { padding: 4 },
  historyDeleteIcon: { fontSize: 16 },
  historyEntry: {
    flexDirection: 'row', gap: spacing.sm, paddingVertical: spacing.sm,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
  },
  historyDot: { width: 12, height: 12, borderRadius: 6, marginTop: 4 },
  historyEntryDate: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  historyEntryType: { fontFamily: fonts.serif, fontSize: 14, color: colors.text, marginTop: 2 },
  historyEntryPercent: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, marginTop: 2 },
  historyEntryNote: { fontFamily: fonts.serifItalic, fontSize: 12, color: colors.textSoft, marginTop: 4 },
  historyEvolution: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.accent,
    fontWeight: '600', marginTop: spacing.sm, textAlign: 'center',
  },

  // Second avis
  secondCta: {
    marginHorizontal: spacing.lg, marginTop: spacing.md, marginBottom: spacing.sm,
    backgroundColor: colors.bgLight, borderWidth: 1, borderColor: colors.accent,
    borderRadius: radius.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  secondCtaText: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '700', color: colors.accent },
  cmpRow: {
    backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.border, padding: spacing.md, gap: 6,
  },
  cmpType: { fontFamily: fonts.serif, fontSize: 15, color: colors.text, marginBottom: 2 },
  cmpBarLine: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  cmpBarLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, width: 64 },
  cmpTrack: { flex: 1, height: 8, backgroundColor: colors.subtle06, borderRadius: 4, overflow: 'hidden' },
  cmpFill: { height: 8, borderRadius: 4 },
  cmpPct: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, width: 36, textAlign: 'right' },
});
