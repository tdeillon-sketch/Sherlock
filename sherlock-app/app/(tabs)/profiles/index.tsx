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
import { colors, fonts, spacing, radius } from '../../../constants/theme';
import { TYPES } from '../../../constants/data';
import { TYPES as TYPES_V3 } from '../../../constants/quiz_v3';
import type { EnneaType } from '../../../constants/quiz_v3';
import { useT, getTypeText } from '../../../i18n';

function ProfileCard({ type, name }: { type: typeof TYPES[0]; name: string }) {
  return (
    <Pressable
      onPress={() => router.push(`/profiles/${type.num}`)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.circle, { backgroundColor: type.color }]}>
        <Text style={styles.circleText}>{type.num}</Text>
      </View>
      <Text style={styles.typeName}>{name}</Text>
      <Text style={styles.typeShort} numberOfLines={3}>
        {type.short}
      </Text>
    </Pressable>
  );
}

export default function ProfilesScreen() {
  const { width } = useWindowDimensions();
  const { t, locale } = useT();
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
            <Text style={styles.title}>{t('profilesList.title')}</Text>
            <Text style={styles.subtitle}>{t('profilesList.subtitle')}</Text>
          </View>
        }
        renderItem={({ item }) => {
          const v3 = TYPES_V3[item.num as EnneaType];
          const localizedName = v3 ? getTypeText(v3, 'name', locale) : item.name;
          return (
            <View style={numColumns > 1 ? { flex: 1, padding: spacing.xs } : undefined}>
              <ProfileCard type={item} name={localizedName} />
            </View>
          );
        }}
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
    color: colors.textSoft,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  cardPressed: {
    backgroundColor: colors.bgLight,
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
    color: colors.white,
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
    color: colors.textSoft,
    textAlign: 'center',
    lineHeight: 19,
  },
});
