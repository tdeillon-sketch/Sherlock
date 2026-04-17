import { Tabs } from 'expo-router';
import { HomeIcon, QuizIcon, ProfilesIcon, GameIcon, DuoIcon } from '../../components/TabIcons';
import { colors, fonts } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.teal,
        tabBarInactiveTintColor: colors.tealMuted,
        tabBarStyle: {
          backgroundColor: colors.bgNav,
          borderTopColor: colors.tealLine,
          borderTopWidth: 0.5,
          height: 72,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: fonts.sans,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color, size }) => <QuizIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profiles"
        options={{
          title: 'Profils',
          tabBarIcon: ({ color, size }) => <ProfilesIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="celebrities"
        options={{
          title: 'Testez-vous',
          tabBarIcon: ({ color, size }) => <GameIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="duo"
        options={{
          title: 'Duo',
          tabBarIcon: ({ color, size }) => <DuoIcon color={color} size={size} />,
        }}
      />
      {/* Ecrans cachés de la tab bar */}
      <Tabs.Screen name="chapters" options={{ href: null }} />
      <Tabs.Screen name="profile/[id]" options={{ href: null }} />
    </Tabs>
  );
}
