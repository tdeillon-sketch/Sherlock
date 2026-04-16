import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { QA_SUGGESTIONS } from '../../constants/data';
import { useQASearch } from '../../hooks/useQASearch';

export default function QAScreen() {
  const [query, setQuery] = useState('');
  const { results, hasSearched, search } = useQASearch();

  const handleSearch = () => {
    search(query);
  };

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    search(suggestion);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={results}
        keyExtractor={(_, idx) => String(idx)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Questions & Reponses</Text>
              <Text style={styles.subtitle}>
                Trouvez des reponses sur l'Enneagramme et la parentalite
              </Text>
            </View>

            {/* Suggestion pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pillsContainer}
              style={styles.pillsScroll}
            >
              {QA_SUGGESTIONS.map((s, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleSuggestion(s)}
                  style={({ pressed }) => [
                    styles.pill,
                    pressed && styles.pillPressed,
                  ]}
                >
                  <Text style={styles.pillText}>{s}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Search bar */}
            <View style={styles.searchRow}>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="search"
                  size={18}
                  color={colors.textLighter}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Rechercher une question..."
                  placeholderTextColor={colors.textLighter}
                  value={query}
                  onChangeText={setQuery}
                  onSubmitEditing={handleSearch}
                  returnKeyType="search"
                />
              </View>
              <Pressable
                onPress={handleSearch}
                style={({ pressed }) => [
                  styles.searchBtn,
                  pressed && styles.searchBtnPressed,
                ]}
              >
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </Pressable>
            </View>

            {/* No results */}
            {hasSearched && results.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons
                  name="help-circle-outline"
                  size={40}
                  color={colors.textLighter}
                />
                <Text style={styles.emptyTitle}>Aucun resultat</Text>
                <Text style={styles.emptyText}>
                  Essayez d'autres mots-cles ou consultez les suggestions
                </Text>
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.qaCard}>
            <Text style={styles.qaQuestion}>{item.q}</Text>
            <Text style={styles.qaAnswer}>{item.a}</Text>
            {item.source ? (
              <Text style={styles.qaSource}>{item.source}</Text>
            ) : null}
          </View>
        )}
      />
    </KeyboardAvoidingView>
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
  header: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xs,
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
  pillsScroll: {
    marginBottom: spacing.md,
  },
  pillsContainer: {
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  pill: {
    backgroundColor: colors.accentBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pillPressed: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  pillText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.accent,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 12,
  },
  searchBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnPressed: {
    opacity: 0.85,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptyText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textLighter,
    textAlign: 'center',
  },
  qaCard: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  qaQuestion: {
    fontFamily: fonts.serif,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  qaAnswer: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 21,
    marginBottom: spacing.sm,
  },
  qaSource: {
    fontFamily: fonts.serifItalic,
    fontSize: 12,
    color: colors.textLighter,
  },
});
