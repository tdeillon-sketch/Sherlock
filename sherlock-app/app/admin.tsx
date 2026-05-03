// ═══════════════════════════════════════════════════════════════
//  Admin dashboard — only accessible to ADMIN_EMAILS in firebase.ts.
//  Shows: total users, signed-in users with emails, launch subscribers.
// ═══════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react';
import {
  ScrollView, View, Text, Pressable, StyleSheet, ActivityIndicator,
  Alert, Share,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../constants/theme';
import {
  auth, isAdmin,
  listAllUsers, listAllLaunchSubscribers,
  type AdminUserRow, type AdminLaunchSubscriberRow,
} from '../constants/firebase';

function formatDate(ts: number | null): string {
  if (!ts) return '—';
  return new Date(ts).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: '2-digit',
  });
}

export default function AdminScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [subscribers, setSubscribers] = useState<AdminLaunchSubscriberRow[]>([]);
  const [tab, setTab] = useState<'overview' | 'users' | 'subscribers'>('overview');
  const [showAnonymous, setShowAnonymous] = useState(false);

  useEffect(() => {
    (async () => {
      // Belt-and-suspenders: bail if not admin even though Home shouldn't link here
      if (!isAdmin(auth.currentUser)) {
        setError("Accès non autorisé.");
        setLoading(false);
        return;
      }
      try {
        const [u, s] = await Promise.all([
          listAllUsers(),
          listAllLaunchSubscribers(),
        ]);
        setUsers(u);
        setSubscribers(s);
      } catch (e: any) {
        setError(e?.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalUsers = users.length;
  const signedInUsers = users.filter(u => u.provider !== 'anonymous');
  const anonUsers = users.filter(u => u.provider === 'anonymous');
  const usersWithEmail = users.filter(u => !!u.email);
  const subsWithPush = subscribers.filter(s => s.pushGranted);
  const subsWithEmail = subscribers.filter(s => !!s.email);

  // Engagement aggregates
  const totalQuizzes = users.reduce((sum, u) => sum + u.quizCount, 0);
  const totalProfiles = users.reduce((sum, u) => sum + u.childProfilesCount, 0);
  const totalXp = users.reduce((sum, u) => sum + u.sherlockXp, 0);
  const totalCases = users.reduce((sum, u) => sum + u.completedCases, 0);
  const heavyUsers = users.filter(u => u.engagement >= 50).length;
  const ghostUsers = users.filter(u => u.engagement === 0).length;
  // Tab usage proxies (number of users who used each feature at least once)
  const usedQuiz = users.filter(u => u.quizCount > 0).length;
  const usedProfiles = users.filter(u => u.childProfilesCount > 0).length;
  const usedSherlock = users.filter(u => u.sherlockXp > 0 || u.completedCases > 0).length;

  const exportEmails = async (list: string[], label: string) => {
    if (list.length === 0) {
      Alert.alert('Aucun email', `Aucun email à partager dans la section "${label}".`);
      return;
    }
    try {
      await Share.share({
        title: `${label} (${list.length})`,
        message: list.join('\n'),
      });
    } catch {}
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorSub}>
          Vérifiez vos règles Firestore : l'admin doit pouvoir lire les collections
          {' '}<Text style={{ fontWeight: '700' }}>users</Text> et
          {' '}<Text style={{ fontWeight: '700' }}>launch_subscribers</Text>.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle}>Admin</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['overview', 'users', 'subscribers'] as const).map(k => (
          <Pressable
            key={k}
            onPress={() => setTab(k)}
            style={[styles.tab, tab === k && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === k && styles.tabTextActive]}>
              {k === 'overview' ? 'Vue d\'ensemble' : k === 'users' ? `Comptes (${signedInUsers.length})` : `Abonnés (${subscribers.length})`}
            </Text>
          </Pressable>
        ))}
      </View>

      {tab === 'overview' && (
        <View style={styles.section}>
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{totalUsers}</Text>
              <Text style={styles.statLabel}>Comptes ouverts</Text>
              <Text style={styles.statHint}>(proxy "installations actives")</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{signedInUsers.length}</Text>
              <Text style={styles.statLabel}>Connectés Google/Apple</Text>
              <Text style={styles.statHint}>{anonUsers.length} anonymes</Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{subscribers.length}</Text>
              <Text style={styles.statLabel}>Inscrits "Sortie"</Text>
              <Text style={styles.statHint}>{subsWithPush.length} avec push</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{subsWithEmail.length}</Text>
              <Text style={styles.statLabel}>Emails sortie collectés</Text>
              <Text style={styles.statHint}>{subsWithPush.length} push aussi</Text>
            </View>
          </View>

          {/* ── Engagement signals ── */}
          <Text style={styles.sectionLabel}>Engagement</Text>
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{heavyUsers}</Text>
              <Text style={styles.statLabel}>Heavy users</Text>
              <Text style={styles.statHint}>(score ≥ 50)</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{ghostUsers}</Text>
              <Text style={styles.statLabel}>Fantômes</Text>
              <Text style={styles.statHint}>0 action mesurée</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>Usage par menu (au moins 1 fois)</Text>
          <View style={styles.usageBox}>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>🕐  Quiz</Text>
              <Text style={styles.usageValue}>{usedQuiz}</Text>
              <Text style={styles.usagePct}>
                {totalUsers > 0 ? Math.round((usedQuiz / totalUsers) * 100) : 0}%
              </Text>
            </View>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>👥  Profils enfants sauvés</Text>
              <Text style={styles.usageValue}>{usedProfiles}</Text>
              <Text style={styles.usagePct}>
                {totalUsers > 0 ? Math.round((usedProfiles / totalUsers) * 100) : 0}%
              </Text>
            </View>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>🔎  Testez-vous (Sherlock)</Text>
              <Text style={styles.usageValue}>{usedSherlock}</Text>
              <Text style={styles.usagePct}>
                {totalUsers > 0 ? Math.round((usedSherlock / totalUsers) * 100) : 0}%
              </Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>Volume total</Text>
          <View style={styles.usageBox}>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>Quizzes complétés</Text>
              <Text style={styles.usageValue}>{totalQuizzes}</Text>
              <View style={{ width: 40 }} />
            </View>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>Profils enfants créés</Text>
              <Text style={styles.usageValue}>{totalProfiles}</Text>
              <View style={{ width: 40 }} />
            </View>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>Cas Sherlock résolus</Text>
              <Text style={styles.usageValue}>{totalCases}</Text>
              <View style={{ width: 40 }} />
            </View>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>XP Sherlock cumulé</Text>
              <Text style={styles.usageValue}>{totalXp}</Text>
              <View style={{ width: 40 }} />
            </View>
          </View>

          <Text style={styles.sectionLabel}>Exports</Text>
          <Pressable
            onPress={() => exportEmails(usersWithEmail.map(u => u.email!).filter(Boolean), 'Emails comptes')}
            style={({ pressed }) => [styles.exportBtn, pressed && { opacity: 0.85 }]}
          >
            <Ionicons name="mail-outline" size={18} color={colors.accent} />
            <Text style={styles.exportBtnText}>Exporter les emails des comptes ({usersWithEmail.length})</Text>
          </Pressable>
          <Pressable
            onPress={() => exportEmails(subsWithEmail.map(s => s.email!).filter(Boolean), 'Emails sortie')}
            style={({ pressed }) => [styles.exportBtn, pressed && { opacity: 0.85 }]}
          >
            <Ionicons name="mail-outline" size={18} color={colors.accent} />
            <Text style={styles.exportBtnText}>Exporter les emails "sortie" ({subsWithEmail.length})</Text>
          </Pressable>
          <Pressable
            onPress={() => exportEmails(subscribers.map(s => s.pushToken!).filter(Boolean), 'Push tokens sortie')}
            style={({ pressed }) => [styles.exportBtn, pressed && { opacity: 0.85 }]}
          >
            <Ionicons name="notifications-outline" size={18} color={colors.accent} />
            <Text style={styles.exportBtnText}>Exporter les push tokens ({subscribers.filter(s => s.pushToken).length})</Text>
          </Pressable>
        </View>
      )}

      {tab === 'users' && (
        <View style={styles.section}>
          <View style={styles.usersHeader}>
            <Text style={styles.listLabel}>
              {showAnonymous
                ? `Tous les comptes (${users.length})`
                : `Comptes connectés (${signedInUsers.length})`}
            </Text>
            <Pressable
              onPress={() => setShowAnonymous(v => !v)}
              style={({ pressed }) => [styles.toggleBtn, pressed && { opacity: 0.7 }]}
            >
              <Text style={styles.toggleBtnText}>
                {showAnonymous ? '✓ Afficher les anonymes' : 'Afficher les anonymes'}
              </Text>
            </Pressable>
          </View>
          {[...(showAnonymous ? users : signedInUsers)]
            .sort((a, b) => b.engagement - a.engagement)
            .map(u => (
              <View key={u.uid} style={styles.userCard}>
                <View style={styles.userCardHeader}>
                  <View style={[styles.rowDot, {
                    backgroundColor:
                      u.provider === 'google' ? '#4285f4' :
                      u.provider === 'apple' ? colors.text :
                      colors.textDim,
                  }]} />
                  <View style={styles.rowBody}>
                    <Text style={styles.rowTitle}>
                      {u.email ?? u.displayName ?? `(anonyme · ${u.uid.slice(0, 6)})`}
                    </Text>
                    <Text style={styles.rowSub}>
                      {u.provider} · créé {formatDate(u.createdAt)} · vu {formatDate(u.lastSeen)}
                    </Text>
                  </View>
                  <View style={[styles.engagementBadge, {
                    backgroundColor:
                      u.engagement >= 50 ? colors.accent :
                      u.engagement > 0 ? colors.accentFill :
                      colors.surface,
                  }]}>
                    <Text style={[styles.engagementText, {
                      color: u.engagement >= 50 ? colors.white : colors.accent,
                    }]}>{u.engagement}</Text>
                  </View>
                </View>
                <View style={styles.usageChips}>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>🕐 {u.quizCount}</Text>
                  </View>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>👥 {u.childProfilesCount}</Text>
                  </View>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>🔎 {u.sherlockXp} XP</Text>
                  </View>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>📔 {u.unlockedFiches}/45</Text>
                  </View>
                  {u.streak > 0 && (
                    <View style={[styles.chip, { backgroundColor: '#ff6b3522' }]}>
                      <Text style={[styles.chipText, { color: '#e07b54' }]}>🔥 {u.streak}j</Text>
                    </View>
                  )}
                  {u.badges > 0 && (
                    <View style={[styles.chip, { backgroundColor: colors.accentFill }]}>
                      <Text style={[styles.chipText, { color: colors.accent }]}>🏅 {u.badges}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
        </View>
      )}

      {tab === 'subscribers' && (
        <View style={styles.section}>
          <Text style={styles.listLabel}>Inscrits "Sortie du livre" ({subscribers.length})</Text>
          {subscribers.map(s => (
            <View key={s.deviceId} style={styles.row}>
              <View style={[styles.rowDot, {
                backgroundColor: s.pushGranted ? colors.accent : colors.textDim,
              }]} />
              <View style={styles.rowBody}>
                <Text style={styles.rowTitle}>
                  {s.email ?? `(sans email · ${s.platform})`}
                </Text>
                <Text style={styles.rowSub}>
                  {s.locale} · {s.platform} · {s.pushGranted ? 'push ✓' : 'push ✗'} · {formatDate(s.subscribedAt)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xxl + spacing.xl },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, backgroundColor: colors.bg },
  errorText: {
    fontFamily: fonts.serif, fontSize: 16, color: colors.error,
    textAlign: 'center', marginBottom: spacing.md,
  },
  errorSub: {
    fontFamily: fonts.sans, fontSize: 13, lineHeight: 19,
    color: colors.textMuted, textAlign: 'center',
  },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 56, paddingHorizontal: spacing.md, paddingBottom: spacing.sm,
  },
  backBtn: { padding: 4 },
  topTitle: { fontFamily: fonts.serif, fontSize: 16, color: colors.text },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md, gap: 6,
  },
  tab: {
    paddingVertical: 8, paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
  },
  tabActive: {
    backgroundColor: colors.accentFill,
    borderColor: colors.accent,
  },
  tabText: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted,
  },
  tabTextActive: { color: colors.accent, fontWeight: '700' },

  section: { paddingHorizontal: spacing.md },

  // Overview
  statRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md,
  },
  statValue: {
    fontFamily: fonts.serif, fontSize: 28, color: colors.text, fontWeight: '700',
  },
  statLabel: {
    fontFamily: fonts.sans, fontSize: 12, fontWeight: '700',
    color: colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase',
    marginTop: 4,
  },
  statHint: {
    fontFamily: fonts.sans, fontSize: 11,
    color: colors.textDim, marginTop: 2,
  },

  exportBtn: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: spacing.md, paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    marginTop: spacing.sm,
  },
  exportBtnText: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.text, fontWeight: '600',
    flex: 1,
  },

  // Lists
  listLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  usersHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  toggleBtn: {
    paddingVertical: 6, paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  toggleBtnText: {
    fontFamily: fonts.sans, fontSize: 11,
    color: colors.textSoft, fontWeight: '600',
  },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
  },
  rowDot: {
    width: 10, height: 10, borderRadius: 5,
  },
  rowBody: { flex: 1 },
  rowTitle: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.text, fontWeight: '600',
  },
  rowSub: {
    fontFamily: fonts.sans, fontSize: 11,
    color: colors.textMuted, marginTop: 2,
  },

  // Section labels in overview
  sectionLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase',
    marginTop: spacing.lg, marginBottom: spacing.sm,
  },

  // Usage box (overview)
  usageBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md,
  },
  usageRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  usageLabel: {
    flex: 1,
    fontFamily: fonts.sans, fontSize: 13, color: colors.text,
  },
  usageValue: {
    fontFamily: fonts.serif, fontSize: 18, color: colors.accent, fontWeight: '700',
    minWidth: 50, textAlign: 'right',
  },
  usagePct: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
    minWidth: 40, textAlign: 'right',
  },

  // User cards (users tab)
  userCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  userCardHeader: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  engagementBadge: {
    minWidth: 38, height: 30, borderRadius: 15,
    paddingHorizontal: 8,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.accent,
  },
  engagementText: {
    fontFamily: fonts.serif, fontSize: 13, fontWeight: '700',
  },
  usageChips: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 6,
  },
  chip: {
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: colors.bg,
    borderWidth: 1, borderColor: colors.border,
  },
  chipText: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textSoft, fontWeight: '600',
  },
});
