import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet,
  useWindowDimensions, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { TYPES } from '../../constants/data';
import { useAdaptiveQuiz } from '../../hooks/useAdaptiveQuiz';
import RadarChart from '../../components/RadarChart';
import AdaptiveQuestion from '../../components/AdaptiveQuestion';
import QuizResult from '../../components/QuizResult';
import ConfidenceBar from '../../components/ConfidenceBar';
import { auth, saveQuizResult, type ChildProfile } from '../../constants/firebase';
import type { QuizSubject } from '../../constants/quiz_v3';

const SUBJECTS: { key: QuizSubject; emoji: string; title: string; desc: string }[] = [
  { key: 'enfant', emoji: '🧒', title: 'Mon enfant', desc: 'Vous répondez pour votre enfant ou votre ado' },
  { key: 'self',   emoji: '🪞', title: 'Moi-même',   desc: 'Auto-évaluation pour adulte' },
];

const AGE_BANDS: { min: number; emoji: string; title: string; desc: string }[] = [
  { min: 5,  emoji: '🧸', title: '5 - 8 ans',   desc: "Petite enfance / début d'école élémentaire" },
  { min: 9,  emoji: '🎒', title: '9 - 12 ans',  desc: 'Fin d\'élémentaire / début de collège' },
  { min: 13, emoji: '🎧', title: '13 - 17 ans', desc: 'Adolescence' },
];

const TYPE_COLORS: Record<number, string> = {
  1: '#6b8f71', 2: '#c0713a', 3: '#d4a437', 4: '#7b68b5',
  5: '#4a90d9', 6: '#5b9e8f', 7: '#e07b54', 8: '#c0443a', 9: '#8fa68f',
};

export default function QuizScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const {
    phase, subject, ageBand, currentPage, scores,
    stepIndex, estimatedTotal, result, childProfiles, canAdvance, pageIndex,
    selectSubject, selectAge,
    updateResponse, advancePage, goToPrevPage,
    reset, restartSameSubject,
    goToSaveProfile, goToHistory, backToResult,
    saveChildResult,
  } = useAdaptiveQuiz();

  // Save quiz result to Firebase au passage en 'result'
  const savedRef = useRef(false);
  useEffect(() => {
    if (phase === 'result' && subject && result && !savedRef.current) {
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

  // ─────────────────────────────────────────────
  //  PHASE: select_subject
  // ─────────────────────────────────────────────
  if (phase === 'select_subject') {
    return (
      <View style={styles.selectContainer}>
        <View style={styles.selectInner}>
          <Text style={styles.selectTitle}>Quel test souhaitez-vous faire ?</Text>
          <Text style={styles.selectSub}>
            Le quiz s'adapte au fur et à mesure de vos réponses pour identifier
            le profil le plus probable.
          </Text>

          {SUBJECTS.map((s) => (
            <Pressable
              key={s.key}
              style={({ pressed }) => [styles.modeCard, pressed && styles.modeCardPressed]}
              onPress={() => selectSubject(s.key)}
            >
              <Text style={styles.modeEmoji}>{s.emoji}</Text>
              <View style={styles.modeText}>
                <Text style={styles.modeTitle}>{s.title}</Text>
                <Text style={styles.modeDesc}>{s.desc}</Text>
              </View>
            </Pressable>
          ))}

          {childProfiles.length > 0 && (
            <Pressable style={styles.historyBtn} onPress={goToHistory}>
              <Text style={styles.historyBtnText}>
                📊 Voir l'historique ({childProfiles.length} profil{childProfiles.length > 1 ? 's' : ''})
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
            <Text style={styles.backLinkText}>‹ Retour</Text>
          </Pressable>
          <Text style={styles.selectTitle}>Quel âge a votre enfant ?</Text>
          <Text style={styles.selectSub}>
            Les questions et le langage seront adaptés à sa tranche d'âge.
          </Text>

          {AGE_BANDS.map((b) => (
            <Pressable
              key={b.min}
              style={({ pressed }) => [styles.modeCard, pressed && styles.modeCardPressed]}
              onPress={() => selectAge(b.min)}
            >
              <Text style={styles.modeEmoji}>{b.emoji}</Text>
              <View style={styles.modeText}>
                <Text style={styles.modeTitle}>{b.title}</Text>
                <Text style={styles.modeDesc}>{b.desc}</Text>
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
    return <HistoryScreen profiles={childProfiles} onBack={reset} />;
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

  // ── Common header pour le flow actif ──
  const handleBack = () => {
    reset();
  };

  const subjectLabel =
    subject === 'self'
      ? '🪞 Moi-même'
      : `🧒 Mon enfant${ageBand ? ` · ${ageBand} ans` : ''}`;

  const radarSize = isWide ? 320 : Math.min(width * 0.72, 300);
  const radarSection = (
    <View style={[styles.radarSection, isWide && styles.radarSectionWide]}>
      <RadarChart scores={scores as unknown as Record<number, number>} size={radarSize} />
      {phase === 'result' && (
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
          <Text style={styles.legendText}>
            {subject === 'self' ? 'Votre profil' : 'Profil de votre enfant'}
          </Text>
        </View>
      )}
    </View>
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

  const progressBar = (
    <View style={styles.progressTrack}>
      <LinearGradient
        colors={[colors.accent, '#e8a06a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressFill, { width: `${progress * 100}%` as any }]}
      />
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
        <View style={styles.navRow}>
          {pageIndex > 0 ? (
            <Pressable onPress={goToPrevPage} style={({ pressed }) => [styles.navBtn, styles.navBtnGhost, pressed && { opacity: 0.7 }]}>
              <Text style={styles.navBtnGhostText}>← Précédent</Text>
            </Pressable>
          ) : <View style={{ width: 100 }} />}
          <Pressable
            onPress={advancePage}
            disabled={!canAdvance}
            style={({ pressed }) => [
              styles.navBtn,
              styles.navBtnPrimary,
              !canAdvance && { opacity: 0.4 },
              pressed && canAdvance && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.navBtnPrimaryText}>
              {currentPage.kind === 'wing' ? 'Voir mon profil →' : 'Page suivante →'}
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
      insight: result.insight,
    };
    // mode pour QuizResult : 'enfant' si subject=enfant, 'adulte' si self
    const legacyMode = subject === 'self' ? 'adulte' : 'enfant';

    mainContent = (
      <>
        <QuizResult
          result={adaptedResult}
          mode={legacyMode}
          onViewProfile={() => router.push(`/profiles/${result.topType}` as never)}
          onSaveProfile={goToSaveProfile}
          onNewChild={restartSameSubject}
          onReset={reset}
        />

        {/* Score de confiance (sans bouton "Affiner" — retiré en v3) */}
        <ConfidenceBar
          confidence={result.confidence}
          label={result.confidenceLabel}
        />
      </>
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

  const canSave = selectedExisting || name.trim().length > 0;

  return (
    <ScrollView style={styles.saveContainer} contentContainerStyle={styles.saveContent}>
      <View style={styles.quizTopBar}>
        <Pressable onPress={onCancel} style={styles.quizBackBtn}>
          <Text style={styles.quizBackBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.quizTopBarTitle}>Sauvegarder le profil</Text>
        <View style={styles.quizBackBtn} />
      </View>

      <Text style={styles.saveTitle}>Pour qui était ce quiz ?</Text>
      <Text style={styles.saveSub}>
        Sauvegarder le profil vous permettra de suivre l'évolution dans le temps.
      </Text>

      {existingProfiles.length > 0 && (
        <>
          <Text style={styles.saveSectionLabel}>Ajouter à un profil existant</Text>
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
                {p.history.length} test{p.history.length > 1 ? 's' : ''} · dernier : Type {p.history[p.history.length - 1]?.topType}
              </Text>
            </Pressable>
          ))}

          <Text style={[styles.saveSectionLabel, { marginTop: spacing.lg }]}>Ou créer un nouveau profil</Text>
        </>
      )}

      <TextInput
        value={name}
        onChangeText={(t) => { setName(t); setSelectedExisting(null); }}
        placeholder="Prénom"
        placeholderTextColor={colors.textDim}
        style={styles.saveInput}
      />
      <TextInput
        value={ageStr}
        onChangeText={setAgeStr}
        placeholder="Âge (optionnel)"
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
        <Text style={styles.saveBtnText}>Sauvegarder</Text>
      </Pressable>

      <Pressable onPress={onCancel} style={styles.skipBtn}>
        <Text style={styles.skipBtnText}>Annuler</Text>
      </Pressable>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────
//  History screen
// ─────────────────────────────────────────────

function HistoryScreen({ profiles, onBack }: { profiles: ChildProfile[]; onBack: () => void }) {
  return (
    <ScrollView style={styles.saveContainer} contentContainerStyle={styles.saveContent}>
      <View style={styles.quizTopBar}>
        <Pressable onPress={onBack} style={styles.quizBackBtn}>
          <Text style={styles.quizBackBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.quizTopBarTitle}>Historique des profils</Text>
        <View style={styles.quizBackBtn} />
      </View>

      {profiles.length === 0 ? (
        <Text style={styles.historyEmpty}>Aucun profil sauvegardé pour l'instant.</Text>
      ) : (
        profiles.map(p => (
          <View key={p.id} style={styles.historyCard}>
            <View style={styles.historyCardHeader}>
              <Text style={styles.historyCardName}>{p.name}</Text>
              {p.age !== undefined && (
                <Text style={styles.historyCardAge}>{p.age} ans</Text>
              )}
            </View>

            {p.history.map((entry, idx) => {
              const typeName = TYPES[entry.topType - 1]?.name ?? '';
              return (
                <View key={idx} style={styles.historyEntry}>
                  <View style={[styles.historyDot, { backgroundColor: TYPE_COLORS[entry.topType] }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.historyEntryDate}>
                      {new Date(entry.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </Text>
                    <Text style={styles.historyEntryType}>
                      Type {entry.topType}{entry.wingType ? `w${entry.wingType}` : ''} · {typeName}
                    </Text>
                    <Text style={styles.historyEntryPercent}>
                      {entry.topPercent}% (vs {entry.secondPercent}% pour le {entry.secondType})
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
                  ? `✓ Profil stable sur ${p.history.length} test(s)`
                  : `⚡ Évolution observée : Type ${p.history[0].topType} → Type ${p.history[p.history.length - 1].topType}`}
              </Text>
            )}
          </View>
        ))
      )}
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
  historyCardAge: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },
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
});
