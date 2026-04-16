import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { TYPES } from '../../constants/data';

function ProfileCard({ type }: { type: typeof TYPES[0] }) {
  return (
    <Pressable
      onPress={() => router.push(`/profile/${type.num}`)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.circle, { backgroundColor: type.color }]}>
        <Text style={styles.circleText}>{type.num}</Text>
      </View>
      <Text style={styles.typeName}>{type.name}</Text>
      <Text style={styles.typeShort} numberOfLines={3}>
        {type.short}
      </Text>
    </Pressable>
  );
}

export default function ProfilesScreen() {
  const { width } = useWindowDimensions();
  const numColumns = width >= 900 ? 3 : width >= 550 ? 2 : 1;

  return (
    <View style={styles.container}>
      <FlatList
        data={TYPES}
        key={`cols-${numColumns}`}
        keyExtractor={(item) => String(item.num)}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>
              Les 9 profils de l'Enneagramme
            </Text>
            <Text style={styles.subtitle}>
              Decouvrez chaque type pour mieux comprendre votre enfant
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={numColumns > 1 ? { flex: 1, padding: spacing.xs } : undefined}>
            <ProfileCard type={item} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  row: {
    justifyContent: 'flex-start',
  },
  header: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.textLight,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  cardPressed: {
    backgroundColor: colors.bgWarm,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  circleText: {
    fontFamily: fonts.serif,
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  typeName: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  typeShort: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 19,
  },
});
