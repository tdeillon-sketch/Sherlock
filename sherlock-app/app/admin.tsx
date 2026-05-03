// ═══════════════════════════════════════════════════════════════
//  Admin dashboard — only accessible to ADMIN_EMAILS in firebase.ts.
//  Shows: total users, signed-in users with emails, launch subscribers.
// ═══════════════════════════════════════════════════════════════

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ScrollView, View, Text, Pressable, StyleSheet, ActivityIndicator,
  Alert, Share, RefreshControl, TextInput,
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

function daysSince(ts: number | null): number | null {
  if (!ts) return null;
  return Math.floor((Date.now() - ts) / 86400000);
}

function formatDuration(days: number | null): string {
  if (days === null) return '—';
  if (days === 0) return "aujourd'hui";
  if (days === 1) return 'hier';
  if (days < 30) return `il y a ${days}j`;
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `il y a ${months} mois`;
  }
  const years = Math.floor(days / 365);
  return `il y a ${years} an${years > 1 ? 's' : ''}`;
}

/**
 * Display label for a user, taking the provider into account.
 * Apple "Hide my email" → relay address @privaterelay.appleid.com → label as "Apple privé"
 * No email at all but signed in → "Apple sans email" / "Google sans email"
 * Truly anonymous → "anonyme"
 */
function userDisplayLabel(u: AdminUserRow): string {
  if (u.email) {
    if (u.email.endsWith('@privaterelay.appleid.com')) {
      return `${u.email}  ·  Apple privé`;
    }
    return u.email;
  }
  if (u.displayName) return u.displayName;
  const short = u.uid.slice(0, 6);
  if (u.provider === 'apple') return `Apple sans email · ${short}`;
  if (u.provider === 'google') return `Google sans email · ${short}`;
  if (u.provider === 'anonymous') return `anonyme · ${short}`;
  return `${u.provider} · ${short}`;
}

export default function AdminScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [subscribers, setSubscribers] = useState<AdminLaunchSubscriberRow[]>([]);
  const [tab, setTab] = useState<'overview' | 'users' | 'subscribers'>('overview');
  const [expandedUid, setExpandedUid] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const loadData = useCallback(async (isRefresh: boolean = false) => {
    // Belt-and-suspenders: bail if not admin even though Home shouldn't link here
    if (!isAdmin(auth.currentUser)) {
      setError("Accès non autorisé.");
      setLoading(false);
      return;
    }
    if (!isRefresh) setLoading(true);
    try {
      const [u, s] = await Promise.all([
        listAllUsers(),
        listAllLaunchSubscribers(),
      ]);
      setUsers(u);
      setSubscribers(s);
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData(true);
  }, [loadData]);

  // In prod, users only sign in via Google/Apple — no anonymous accounts.
  // (signInAnon is only used in a dev bypass visible in Expo Go.)
  const totalUsers = users.length;
  const usersByProvider = {
    google: users.filter(u => u.provider === 'google').length,
    apple: users.filter(u => u.provider === 'apple').length,
  };
  const usersWithEmail = users.filter(u => !!u.email);
  const subsWithPush = subscribers.filter(s => s.pushGranted);
  const subsWithEmail = subscribers.filter(s => !!s.email);

  // ── Action count (sum of measurable actions per user) ──
  const actionCount = (u: AdminUserRow) =>
    u.quizCount + u.childProfilesCount + u.completedCases + u.badges;
  const activeUsers = users.filter(u => actionCount(u) >= 5).length;

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

  // ── Distribution of profiles found by the quiz ──
  // We split adult tests vs child tests (both kids 'enfant' and teens 'ado').
  type Dist = { counts: Record<number, number>; total: number };
  const emptyDist: Dist = { counts: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0}, total: 0 };
  const distAdult: Dist = JSON.parse(JSON.stringify(emptyDist));
  const distChild: Dist = JSON.parse(JSON.stringify(emptyDist));
  for (const u of users) {
    for (const r of u.quizResults) {
      if (!r || typeof r.topType !== 'number') continue;
      const target = r.mode === 'adulte' ? distAdult : distChild;
      target.counts[r.topType] = (target.counts[r.topType] || 0) + 1;
      target.total++;
    }
  }
  const TYPE_LABELS_FR: Record<number, string> = {
    1: 'Perfectionniste', 2: 'Altruiste', 3: 'Battant', 4: 'Romantique',
    5: 'Investigateur', 6: 'Loyaliste', 7: 'Épicurien', 8: 'Chef', 9: 'Médiateur',
  };
  const TYPE_COLORS: Record<number, string> = {
    1: '#7b8e6e', 2: '#c0713a', 3: '#d4a03c', 4: '#8b6ca7',
    5: '#5b8a9a', 6: '#6b7b8e', 7: '#d4853c', 8: '#9b4a4a', 9: '#7a9a7b',
  };

  // ── Retention buckets ──
  const activeLast7d = users.filter(u => {
    const d = daysSince(u.lastSeen);
    return d !== null && d <= 7;
  }).length;
  const activeLast30d = users.filter(u => {
    const d = daysSince(u.lastSeen);
    return d !== null && d <= 30;
  }).length;
  const inactive30d = users.filter(u => {
    const d = daysSince(u.lastSeen);
    return d !== null && d > 30;
  }).length;
  const newLast7d = users.filter(u => {
    const d = daysSince(u.createdAt);
    return d !== null && d <= 7;
  }).length;

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.accent}
          colors={[colors.accent]}
          title="Mise à jour…"
          titleColor={colors.textMuted}
        />
      }
    >
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle}>Admin</Text>
        <Pressable
          onPress={onRefresh}
          disabled={refreshing}
          style={styles.refreshBtn}
          hitSlop={10}
        >
          {refreshing ? (
            <ActivityIndicator size="small" color={colors.accent} />
          ) : (
            <Ionicons name="refresh" size={22} color={colors.accent} />
          )}
        </Pressable>
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
              {k === 'overview' ? 'Vue d\'ensemble' : k === 'users' ? `Comptes (${totalUsers})` : `Abonnés (${subscribers.length})`}
            </Text>
          </Pressable>
        ))}
      </View>

      {tab === 'overview' && (
        <View style={styles.section}>
          {/* ── First row: 3 vignettes ── */}
          <View style={styles.statRow}>
            <View style={[styles.statCard, styles.statCard3]}>
              <Text style={styles.statValueSm}>{totalUsers}</Text>
              <Text style={styles.statLabel}>Total</Text>
              <Text style={styles.statHint}>comptes ouverts</Text>
            </View>
            <View style={[styles.statCard, styles.statCard3]}>
              <Text style={styles.statValueSm}>{activeUsers}</Text>
              <Text style={styles.statLabel}>Actifs</Text>
              <Text style={styles.statHint}>≥ 5 actions</Text>
            </View>
            <View style={[styles.statCard, styles.statCard3]}>
              <Text style={styles.statValueSm}>
                {usersByProvider.apple}
                <Text style={{ fontSize: 11, color: colors.textMuted }}>·</Text>
                {usersByProvider.google}
              </Text>
              <Text style={styles.statLabel}>Apple·Google</Text>
              <Text style={styles.statHint}>par provider</Text>
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

          {/* ── Retention ── */}
          <Text style={styles.sectionLabel}>Rétention</Text>
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{activeLast7d}</Text>
              <Text style={styles.statLabel}>Actifs 7j</Text>
              <Text style={styles.statHint}>vu il y a ≤ 7 jours</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{activeLast30d}</Text>
              <Text style={styles.statLabel}>Actifs 30j</Text>
              <Text style={styles.statHint}>vu il y a ≤ 30 jours</Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{newLast7d}</Text>
              <Text style={styles.statLabel}>Nouveaux 7j</Text>
              <Text style={styles.statHint}>créés il y a ≤ 7 jours</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{inactive30d}</Text>
              <Text style={styles.statLabel}>Inactifs &gt; 30j</Text>
              <Text style={styles.statHint}>candidats au churn</Text>
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

          {/* ── Distribution of profiles found by the quiz ── */}
          <Text style={styles.sectionLabel}>Profils trouvés par le quiz</Text>
          {(distAdult.total === 0 && distChild.total === 0) ? (
            <View style={styles.usageBox}>
              <Text style={[styles.usageLabel, { color: colors.textMuted }]}>
                Pas encore de quiz complétés.
              </Text>
            </View>
          ) : (
            <>
              {distAdult.total > 0 && (
                <View style={styles.distBox}>
                  <Text style={styles.distTitle}>
                    Parents (mode adulte) · {distAdult.total} test{distAdult.total > 1 ? 's' : ''}
                  </Text>
                  {[1,2,3,4,5,6,7,8,9].map(t => {
                    const count = distAdult.counts[t] || 0;
                    const pct = distAdult.total > 0 ? Math.round((count / distAdult.total) * 100) : 0;
                    return (
                      <View key={t} style={styles.distRow}>
                        <View style={[styles.distNum, { backgroundColor: TYPE_COLORS[t] }]}>
                          <Text style={styles.distNumText}>{t}</Text>
                        </View>
                        <Text style={styles.distLabel} numberOfLines={1}>{TYPE_LABELS_FR[t]}</Text>
                        <View style={styles.distBarTrack}>
                          <View style={[styles.distBarFill, {
                            width: `${pct}%` as any,
                            backgroundColor: TYPE_COLORS[t],
                          }]} />
                        </View>
                        <Text style={styles.distPct}>{pct}%</Text>
                      </View>
                    );
                  })}
                </View>
              )}
              {distChild.total > 0 && (
                <View style={styles.distBox}>
                  <Text style={styles.distTitle}>
                    Enfants (modes enfant + ado) · {distChild.total} test{distChild.total > 1 ? 's' : ''}
                  </Text>
                  {[1,2,3,4,5,6,7,8,9].map(t => {
                    const count = distChild.counts[t] || 0;
                    const pct = distChild.total > 0 ? Math.round((count / distChild.total) * 100) : 0;
                    return (
                      <View key={t} style={styles.distRow}>
                        <View style={[styles.distNum, { backgroundColor: TYPE_COLORS[t] }]}>
                          <Text style={styles.distNumText}>{t}</Text>
                        </View>
                        <Text style={styles.distLabel} numberOfLines={1}>{TYPE_LABELS_FR[t]}</Text>
                        <View style={styles.distBarTrack}>
                          <View style={[styles.distBarFill, {
                            width: `${pct}%` as any,
                            backgroundColor: TYPE_COLORS[t],
                          }]} />
                        </View>
                        <Text style={styles.distPct}>{pct}%</Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </>
          )}

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
          <Text style={styles.listLabel}>
            Comptes ({users.length}) · triés par engagement
          </Text>

          {/* Search bar */}
          <View style={styles.searchWrap}>
            <Ionicons name="search" size={16} color={colors.textMuted} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Email, nom, UID, type…"
              placeholderTextColor={colors.textDim}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.searchInput}
            />
            {search.length > 0 && (
              <Pressable onPress={() => setSearch('')} hitSlop={10}>
                <Ionicons name="close-circle" size={18} color={colors.textMuted} />
              </Pressable>
            )}
          </View>

          <Text style={styles.legendText}>
            Légende — 🕐 quiz · 👥 profils enfants · 🔎 XP Sherlock · 📔 fiches Pokédex/45 · 🔥 streak · 🏅 badges
          </Text>
          <Text style={styles.legendNote}>
            ⓘ Les comptes "sans email" sont d'anciens utilisateurs (avant le commit qui sauvegarde l'email). Le champ se backfille automatiquement à leur prochain login.
          </Text>
          <Text style={styles.legendHint}>Tap une carte pour voir le détail.</Text>

          {[...users]
            .filter(u => {
              if (!search.trim()) return true;
              const q = search.trim().toLowerCase();
              return (
                (u.email || '').toLowerCase().includes(q) ||
                (u.displayName || '').toLowerCase().includes(q) ||
                u.uid.toLowerCase().includes(q) ||
                u.provider.toLowerCase().includes(q)
              );
            })
            .sort((a, b) => b.engagement - a.engagement)
            .map(u => {
              const expanded = expandedUid === u.uid;
              const ageDays = daysSince(u.createdAt);
              const lastDays = daysSince(u.lastSeen);
              return (
                <Pressable
                  key={u.uid}
                  onPress={() => setExpandedUid(expanded ? null : u.uid)}
                  style={({ pressed }) => [
                    styles.userCard,
                    expanded && styles.userCardExpanded,
                    pressed && { opacity: 0.95 },
                  ]}
                >
                  <View style={styles.userCardHeader}>
                    <View style={[styles.rowDot, {
                      backgroundColor:
                        u.provider === 'google' ? '#4285f4' :
                        u.provider === 'apple' ? colors.text :
                        colors.textDim,
                    }]} />
                    <View style={styles.rowBody}>
                      <Text style={styles.rowTitle} numberOfLines={1}>
                        {userDisplayLabel(u)}
                      </Text>
                      <Text style={styles.rowSub}>
                        {u.provider} · inscrit {formatDuration(ageDays)} · vu {formatDuration(lastDays)}
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

                  {expanded && (
                    <View style={styles.detailWrap}>
                      {/* Dates précises */}
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date d'inscription</Text>
                        <Text style={styles.detailValue}>
                          {formatDate(u.createdAt)} ({ageDays !== null ? `${ageDays}j` : '—'})
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Dernière session</Text>
                        <Text style={styles.detailValue}>
                          {formatDate(u.lastSeen)} ({lastDays !== null ? `il y a ${lastDays}j` : '—'})
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>UID</Text>
                        <Text style={[styles.detailValue, { fontSize: 11 }]} numberOfLines={1}>
                          {u.uid}
                        </Text>
                      </View>

                      {/* Quizzes */}
                      {u.quizResults.length > 0 && (
                        <View style={styles.detailSection}>
                          <Text style={styles.detailSectionLabel}>Quizzes complétés ({u.quizResults.length})</Text>
                          {u.quizResults.slice(-10).reverse().map((q, idx) => (
                            <View key={idx} style={styles.detailQuizRow}>
                              <Text style={styles.detailQuizDate}>
                                {q.completedAt ? new Date(q.completedAt).toLocaleDateString('fr-FR', {
                                  day: '2-digit', month: 'short',
                                }) : '—'}
                              </Text>
                              <Text style={styles.detailQuizMode}>{q.mode}</Text>
                              <View style={[styles.distNum, { backgroundColor: TYPE_COLORS[q.topType] || colors.accent }]}>
                                <Text style={styles.distNumText}>{q.topType}</Text>
                              </View>
                              <Text style={styles.detailQuizName}>
                                {TYPE_LABELS_FR[q.topType] ?? '?'}
                                {q.wingType ? ` · aile ${q.wingType}` : ''}
                              </Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {/* Child profiles */}
                      {u.childProfiles.length > 0 && (
                        <View style={styles.detailSection}>
                          <Text style={styles.detailSectionLabel}>Profils enfants enregistrés ({u.childProfiles.length})</Text>
                          {u.childProfiles.map((c) => {
                            const last = c.history?.[c.history.length - 1];
                            return (
                              <View key={c.id} style={styles.detailQuizRow}>
                                <Text style={styles.detailQuizDate}>
                                  {c.age ? `${c.age} ans` : '—'}
                                </Text>
                                <Text style={[styles.detailQuizMode, { flex: 1 }]} numberOfLines={1}>
                                  {c.name}
                                </Text>
                                {last ? (
                                  <>
                                    <View style={[styles.distNum, { backgroundColor: TYPE_COLORS[last.topType] || colors.accent }]}>
                                      <Text style={styles.distNumText}>{last.topType}</Text>
                                    </View>
                                    <Text style={styles.detailQuizName}>
                                      {TYPE_LABELS_FR[last.topType] ?? '?'} · {c.history.length} test{c.history.length > 1 ? 's' : ''}
                                    </Text>
                                  </>
                                ) : (
                                  <Text style={styles.detailQuizName}>—</Text>
                                )}
                              </View>
                            );
                          })}
                        </View>
                      )}
                    </View>
                  )}
                </Pressable>
              );
            })}
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
  refreshBtn: {
    width: 30, height: 30, alignItems: 'center', justifyContent: 'center',
  },

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
  statValueSm: {
    fontFamily: fonts.serif, fontSize: 22, color: colors.text, fontWeight: '700',
  },
  statCard3: {
    paddingHorizontal: spacing.sm, paddingVertical: spacing.md,
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

  // Distribution box (profiles found)
  distBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  distTitle: {
    fontFamily: fonts.sans, fontSize: 12, fontWeight: '700',
    color: colors.text, marginBottom: spacing.sm,
  },
  distRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 4,
  },
  distNum: {
    width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center',
  },
  distNumText: { fontFamily: fonts.serif, fontSize: 11, fontWeight: '700', color: colors.white },
  distLabel: {
    width: 80,
    fontFamily: fonts.sans, fontSize: 11, color: colors.textSoft,
  },
  distBarTrack: {
    flex: 1, height: 8, borderRadius: 4,
    backgroundColor: colors.bg,
    overflow: 'hidden',
  },
  distBarFill: { height: 8, borderRadius: 4 },
  distPct: {
    width: 36, textAlign: 'right',
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, fontWeight: '600',
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
  legendText: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
    lineHeight: 17, marginBottom: 2,
  },
  legendHint: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.accent,
    fontStyle: 'italic', marginBottom: spacing.sm,
  },
  legendNote: {
    fontFamily: fonts.sans, fontSize: 10,
    color: colors.textMuted,
    lineHeight: 14, marginTop: 4, marginBottom: 6,
    fontStyle: 'italic',
  },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: 10,
    marginBottom: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.sans, fontSize: 14,
    color: colors.text,
    padding: 0,
  },

  // User card expanded detail
  userCardExpanded: {
    borderColor: colors.accent,
  },
  detailWrap: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 4,
  },
  detailLabel: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
    fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5,
  },
  detailValue: {
    flex: 1, textAlign: 'right',
    fontFamily: fonts.sans, fontSize: 12, color: colors.text,
    marginLeft: spacing.sm,
  },
  detailSection: { marginTop: spacing.md },
  detailSectionLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.accent, letterSpacing: 0.5, textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  detailQuizRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 4,
  },
  detailQuizDate: {
    width: 60,
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
  },
  detailQuizMode: {
    width: 50,
    fontFamily: fonts.sans, fontSize: 11, color: colors.textSoft,
  },
  detailQuizName: {
    flex: 1,
    fontFamily: fonts.sans, fontSize: 11, color: colors.text,
  },
});
