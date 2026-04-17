import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet,
  useWindowDimensions, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { QuizMode, TYPES } from '../../constants/data';
import { useQuiz } from '../../hooks/useQuiz';
import RadarChart from '../../components/RadarChart';
import QuizQuestion from '../../components/QuizQuestion';
import QuizResult from '../../components/QuizResult';
import { auth, saveQuizResult, type ChildProfile } from '../../constants/firebase';

const MODES: { key: QuizMode; emoji: string; title: string; desc: string }[] = [
  { key: 'enfant', emoji: '🧒', title: 'Mon enfant', desc: '5-12 ans — vous répondez pour lui' },
  { key: 'ado',    emoji: '🎧', title: 'Mon ado',    desc: '13-17 ans — il répond lui-même' },
  { key: 'adulte', emoji: '🪞', title: 'Moi-même',   desc: 'Découvrez votre propre profil' },
];

const TYPE_COLORS: Record<number, string> = {
  1: '#6b8f71', 2: '#c0713a', 3: '#d4a437', 4: '#7b68b5',
  5: '#4a90d9', 6: '#5b9e8f', 7: '#e07b54', 8: '#c0443a', 9: '#8fa68f',
};

export default function QuizScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const {
    phase, mode, currentQuestion, questions, scores, result,
    currentDisambig, disambigIndex, disambigTotal,
    childProfiles, openNote, setOpenNote,
    startQuiz, selectAnswer, selectSlider, skipQuestion,
    answerDisambig, skipDisambig,
    goToSaveProfile, goToHistory, backToResult,
    saveChildResult, startNewQuizSameMode, reset,
  } = useQuiz();

  // Save quiz result to Firebase when reaching 'result' phase
  const savedRef = useRef(false);
  useEffect(() => {
    if (phase === 'result' && mode && !savedRef.current) {
      savedRef.current = true;
      const uid = auth.currentUser?.uid;
      if (uid) {
        saveQuizResult(uid, {
          mode,
          topType: result.topType,
          wingType: result.wingType,
          scores,
          completedAt: new Date().toISOString(),
        }).catch(() => {});
      }
    }
    if (phase !== 'result') savedRef.current = false;
  }, [phase, mode, result, scores]);

  // ── PHASE: select mode ──
  if (phase === 'select_mode') {
    return (
      <View style={styles.selectContainer}>
        <View style={styles.selectInner}>
          <Text style={styles.selectTitle}>Quel test souhaitez-vous faire ?</Text>
          <Text style={styles.selectSub}>
            Chaque quiz est adapté à l'âge et au point de vue du répondant.
          </Text>

          {MODES.map((m) => (
            <Pressable
              key={m.key}
              style={({ pressed }) => [styles.modeCard, pressed && styles.modeCardPressed]}
              onPress={() => startQuiz(m.key)}
            >
              <Text style={styles.modeEmoji}>{m.emoji}</Text>
              <View style={styles.modeText}>
                <Text style={styles.modeTitle}>{m.title}</Text>
                <Text style={styles.modeDesc}>{m.desc}</Text>
              </View>
            </Pressable>
          ))}

          {childProfiles.length > 0 && (
            <Pressable style={styles.historyBtn} onPress={goToHistory}>
              <Text style={styles.historyBtnText}>
                📊 Voir l'historique ({childProfiles.length} enfant{childProfiles.length > 1 ? 's' : ''})
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  // ── PHASE: history ──
  if (phase === 'history') {
    return <HistoryScreen profiles={childProfiles} onBack={reset} />;
  }

  // ── PHASE: save_profile ──
  if (phase === 'save_profile') {
    return (
      <SaveProfileScreen
        existingProfiles={childProfiles}
        suggestedNote={openNote}
        onCancel={backToResult}
        onSave={async (name, age, existingId) => {
          await saveChildResult(name, age, existingId);
          backToResult();
        }}
      />
    );
  }

  // ── Common header for active flow ──
  const handleBack = () => {
    if (phase === 'questions' || phase === 'disambiguation' || phase === 'result') {
      reset();
    }
  };

  const radarSize = isWide ? 320 : Math.min(width * 0.72, 300);
  const radarSection = (
    <View style={[styles.radarSection, isWide && styles.radarSectionWide]}>
      <RadarChart scores={scores} size={radarSize} />
      {phase === 'result' && (
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
          <Text style={styles.legendText}>
            {mode === 'enfant' ? 'Profil de votre enfant' :
             mode === 'ado' ? 'Ton profil' : 'Votre profil'}
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
      <Text style={styles.quizTopBarTitle}>
        {mode === 'enfant' ? '🧒 Mon enfant' : mode === 'ado' ? '🎧 Mon ado' : '🪞 Moi-même'}
      </Text>
      <View style={styles.quizBackBtn} />
    </View>
  );

  // Progress: total = main questions + disambig
  const mainProgress = currentQuestion / Math.max(1, questions.length);
  const disambigProgress = phase === 'disambiguation'
    ? (disambigIndex / Math.max(1, disambigTotal)) * 0.15  // disambig = last 15% of bar
    : 0;
  const progress = phase === 'result' ? 1 : Math.min(mainProgress * 0.85 + disambigProgress, 1);

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

  // ── PHASE: questions ──
  let mainContent: React.ReactNode = null;
  if (phase === 'questions' && mode) {
    mainContent = (
      <QuizQuestion
        question={questions[currentQuestion]}
        questionNum={currentQuestion + 1}
        totalQuestions={questions.length}
        mode={mode}
        questionIndex={currentQuestion}
        onAnswer={(aIdx) => selectAnswer(currentQuestion, aIdx)}
        onSlider={(value) => selectSlider(currentQuestion, value)}
        onSkip={skipQuestion}
      />
    );
  }

  // ── PHASE: disambiguation ──
  if (phase === 'disambiguation' && currentDisambig) {
    mainContent = (
      <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <View style={styles.disambigBanner}>
          <Text style={styles.disambigBannerLabel}>🤔 Affinons un peu</Text>
          <Text style={styles.disambigBannerText}>
            On hésite entre deux profils. Question {disambigIndex + 1}/{disambigTotal} pour mieux trancher.
          </Text>
        </View>

        <View style={styles.disambigSceneBox}>
          {currentDisambig.scene.icon && (
            <Text style={styles.disambigSceneIcon}>{currentDisambig.scene.icon}</Text>
          )}
          <Text style={styles.disambigSceneSetup}>{currentDisambig.scene.setup}</Text>
        </View>

        <Text style={styles.disambigQ}>{currentDisambig.q}</Text>

        <View style={{ gap: spacing.sm }}>
          {currentDisambig.a.map((opt, idx) => (
            <Pressable
              key={idx}
              onPress={() => answerDisambig(opt.favors)}
              style={({ pressed }) => [
                styles.disambigOption,
                pressed && styles.disambigOptionPressed,
              ]}
            >
              <Text style={styles.disambigOptionText}>
                {opt.emoji ? `${opt.emoji}  ` : ''}{opt.text}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={skipDisambig} style={styles.skipBtn}>
          <Text style={styles.skipBtnText}>Je ne sais pas — passer</Text>
        </Pressable>
      </View>
    );
  }

  // ── PHASE: result ──
  if (phase === 'result' && mode) {
    mainContent = (
      <>
        <QuizResult
          result={result}
          mode={mode}
          onViewProfile={() => router.push(`/profile/${result.topType}` as never)}
          onSaveProfile={goToSaveProfile}
          onNewChild={startNewQuizSameMode}
          onReset={reset}
        />

        {/* Open question (BONUS) */}
        {mode === 'enfant' && (
          <View style={styles.openNoteBox}>
            <Text style={styles.openNoteLabel}>📝 Une situation qui vous intrigue ?</Text>
            <Text style={styles.openNoteHint}>
              Notez ici une scène concrète avec votre enfant (sera sauvegardée avec le profil, pour vous).
            </Text>
            <TextInput
              value={openNote}
              onChangeText={setOpenNote}
              placeholder="Ex : « Quand je le presse, il fait l'inverse... »"
              placeholderTextColor={colors.textDim}
              multiline
              style={styles.openNoteInput}
            />
          </View>
        )}
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
//  Save Profile screen (modal-like)
// ─────────────────────────────────────────────

function SaveProfileScreen({
  existingProfiles, suggestedNote, onCancel, onSave,
}: {
  existingProfiles: ChildProfile[];
  suggestedNote: string;
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
          <Text style={styles.saveSectionLabel}>Ajouter à un enfant existant</Text>
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

      {suggestedNote && (
        <View style={styles.savePreviewNote}>
          <Text style={styles.savePreviewLabel}>📝 Note qui sera sauvegardée :</Text>
          <Text style={styles.savePreviewText}>{suggestedNote}</Text>
        </View>
      )}

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
//  History screen — evolution per child
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
  // Selection
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

  // Disambiguation
  disambigBanner: {
    backgroundColor: colors.accentFill, borderWidth: 1, borderColor: colors.accent,
    borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md,
  },
  disambigBannerLabel: {
    fontFamily: fonts.sans, fontSize: 12, fontWeight: '700',
    color: colors.accent, marginBottom: 4, letterSpacing: 0.5,
  },
  disambigBannerText: { fontFamily: fonts.sans, fontSize: 13, color: colors.textSoft, lineHeight: 19 },
  disambigSceneBox: {
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderLeftWidth: 3, borderLeftColor: colors.accent,
    padding: spacing.md, marginBottom: spacing.md,
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md,
  },
  disambigSceneIcon: { fontSize: 28 },
  disambigSceneSetup: {
    flex: 1, fontFamily: fonts.serifItalic, fontSize: 14, lineHeight: 22, color: colors.textSoft,
  },
  disambigQ: {
    fontFamily: fonts.serif, fontSize: 19, color: colors.text,
    lineHeight: 27, marginBottom: spacing.md,
  },
  disambigOption: {
    backgroundColor: colors.cardBg, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, paddingVertical: spacing.md, paddingHorizontal: spacing.md,
  },
  disambigOptionPressed: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  disambigOptionText: {
    fontFamily: fonts.sans, fontSize: 15, color: colors.textSoft, lineHeight: 22,
  },

  skipBtn: { padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  skipBtnText: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted,
    textDecorationLine: 'underline',
  },

  // Open note
  openNoteBox: {
    margin: spacing.md, padding: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
  },
  openNoteLabel: {
    fontFamily: fonts.serif, fontSize: 16, color: colors.text, marginBottom: 4,
  },
  openNoteHint: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginBottom: spacing.sm, lineHeight: 18,
  },
  openNoteInput: {
    backgroundColor: colors.bg, borderRadius: radius.sm,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.sm, fontFamily: fonts.sans, fontSize: 14, color: colors.text,
    minHeight: 80, textAlignVertical: 'top',
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

  savePreviewNote: {
    marginHorizontal: spacing.lg, marginBottom: spacing.md,
    padding: spacing.md, backgroundColor: colors.surface,
    borderRadius: radius.sm, borderLeftWidth: 3, borderLeftColor: colors.accent,
  },
  savePreviewLabel: { fontFamily: fonts.sans, fontSize: 12, fontWeight: '600', color: colors.accent, marginBottom: 4 },
  savePreviewText: { fontFamily: fonts.serifItalic, fontSize: 13, color: colors.textSoft, lineHeight: 19 },

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
