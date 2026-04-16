import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { TYPES } from '../../constants/data';

export default function ProfileDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const typeIndex = parseInt(id ?? '1', 10) - 1;
  const type = TYPES[typeIndex];

  if (!type) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Profil introuvable.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.typeCircle, { backgroundColor: type.color }]}>
          <Text style={styles.typeCircleText}>{type.num}</Text>
        </View>
        <Text style={styles.typeName}>{type.name}</Text>
        <View style={styles.wingTag}>
          <Text style={styles.wingTagText}>{type.wings}</Text>
        </View>
        <Text style={styles.typeShort}>{type.short}</Text>
      </View>

      {/* Portrait */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portrait</Text>
        <Text style={styles.sectionBody}>{type.metaphor}</Text>
      </View>

      {/* Integration & Desintegration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integration & Desintegration</Text>
        <View style={styles.integrationBox}>
          <Text style={styles.integrationLabel}>
            Integration vers le type {type.integration.toward}
          </Text>
          <Text style={styles.integrationDesc}>{type.integration.desc}</Text>
        </View>
        <View style={styles.integrationBox}>
          <Text style={styles.integrationLabel}>
            Desintegration vers le type {type.disintegration.toward}
          </Text>
          <Text style={styles.integrationDesc}>{type.disintegration.desc}</Text>
        </View>
      </View>

      {/* Age Sections */}
      {(['5-8', '8-12', '13-16'] as const).map((ageKey) => {
        const labels: Record<string, string> = {
          '5-8': 'De 5 a 8 ans',
          '8-12': 'De 8 a 12 ans',
          '13-16': 'De 13 a 16 ans',
        };
        return (
          <View key={ageKey} style={styles.section}>
            <Text style={styles.sectionTitle}>{labels[ageKey]}</Text>
            <Text style={styles.sectionBody}>{type.ages[ageKey]}</Text>
          </View>
        );
      })}

      {/* Keys */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Trois cles pour accompagner votre enfant
        </Text>
        {type.keys.map((key, index) => (
          <View key={index} style={styles.keyCard}>
            <View style={styles.keyNumberCircle}>
              <Text style={styles.keyNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.keyTitle}>{key.title}</Text>
            <Text style={styles.keyDesc}>{key.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  errorText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    color: colors.textSoft,
    textAlign: 'center',
    marginTop: 120,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingTop: 72,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
  typeCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  typeCircleText: {
    fontFamily: fonts.sans,
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  typeName: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  wingTag: {
    backgroundColor: colors.accentFill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    marginBottom: spacing.md,
  },
  wingTagText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.accent,
  },
  typeShort: {
    fontFamily: fonts.serifItalic,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
    textAlign: 'center',
  },

  // Sections
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  sectionBody: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSoft,
  },

  // Integration boxes
  integrationBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  integrationLabel: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  integrationDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSoft,
  },

  // Key cards
  keyCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  keyNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accentFill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  keyNumberText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '700',
    color: colors.accent,
  },
  keyTitle: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  keyDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSoft,
  },
});
