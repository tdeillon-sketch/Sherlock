import { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ViewToken,
} from 'react-native';
import { fonts, spacing, radius } from '../constants/theme';

const ACCENT = '#c0713a';
const BG = '#0d2040';

interface OnboardingPage {
  icon: string;
  title: string;
  description: string;
}

const PAGES: OnboardingPage[] = [
  {
    icon: '\u{1F4D6}',
    title: 'Chaque enfant est unique',
    description:
      "Cette application est le compagnon numerique du livre \u00AB On a tous besoin de quelqu'un d'autre \u00BB de Thomas Deillon.",
  },
  {
    icon: '\u{1F9ED}',
    title: '9 facons de voir le monde',
    description:
      "L'Enneagramme est un outil ancien et puissant qui decrit 9 manieres fondamentales de percevoir le monde. Il ne met pas les gens dans des boites \u2014 il ouvre des portes.",
  },
  {
    icon: '\u{1F331}',
    title: 'Comprendre pour mieux accompagner',
    description:
      'En identifiant le profil de votre enfant, vous decouvrirez ses besoins profonds, ses peurs cachees, et les cles concretes pour l\u2019accompagner avec justesse.',
  },
  {
    icon: '\u{1F680}',
    title: 'Commencons le voyage',
    description:
      'Explorez les chapitres du livre, identifiez le profil de votre enfant, et trouvez des reponses a vos questions de parent.',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList<OnboardingPage>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLast = activeIndex === PAGES.length - 1;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    }
  };

  const renderPage = ({ item }: { item: OnboardingPage }) => (
    <View style={[styles.page, { width }]}>
      <Text style={styles.pageIcon}>{item.icon}</Text>
      <Text style={styles.pageTitle}>{item.title}</Text>
      <Text style={styles.pageDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip button */}
      <Pressable style={styles.skipButton} onPress={onComplete}>
        <Text style={styles.skipText}>Passer</Text>
      </Pressable>

      {/* Pages */}
      <FlatList
        ref={flatListRef}
        data={PAGES}
        renderItem={renderPage}
        keyExtractor={(_, index) => String(index)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />

      {/* Bottom controls */}
      <View style={styles.bottomContainer}>
        {/* Dots */}
        <View style={styles.dotsRow}>
          {PAGES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Button */}
        <Pressable style={styles.nextButton} onPress={goNext}>
          <Text style={styles.nextButtonText}>
            {isLast ? 'Commencer' : 'Suivant'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  // Skip
  skipButton: {
    position: 'absolute',
    top: 56,
    right: spacing.lg,
    zIndex: 10,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  skipText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
  },

  // Page
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  pageIcon: {
    fontSize: 64,
    marginBottom: spacing.xl,
  },
  pageTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 36,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  pageDescription: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },

  // Bottom
  bottomContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 48,
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: ACCENT,
    width: 24,
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  nextButton: {
    backgroundColor: ACCENT,
    paddingVertical: 16,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.md,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: fonts.sans,
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
  },
});
