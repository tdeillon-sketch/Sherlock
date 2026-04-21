import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { HomeIcon, QuizIcon, ProfilesIcon, GameIcon, DuoIcon } from '../../components/TabIcons';
import { colors, fonts } from '../../constants/theme';

// Wraps a tab icon so the active tab gets a small orange accent bar above it
// (iOS Mail / Apple Music style). Pairs with the orange tint color below to
// make active vs inactive instantly readable on the dark nav background.
function TabIcon({
  Icon,
  color,
  size,
  focused,
}: {
  Icon: React.ComponentType<{ color: string; size: number }>;
  color: string;
  size: number;
  focused: boolean;
}) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'flex-start', height: size + 8 }}>
      <View
        style={{
          height: 3,
          width: 18,
          borderRadius: 2,
          marginBottom: 5,
          backgroundColor: focused ? colors.accent : 'transparent',
        }}
      />
      <Icon color={color} size={size} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
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
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon Icon={HomeIcon} color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon Icon={QuizIcon} color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profiles"
        options={{
          title: 'Profils',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon Icon={ProfilesIcon} color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="celebrities"
        options={{
          title: 'Testez-vous',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon Icon={GameIcon} color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="duo"
        options={{
          title: 'Duo',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon Icon={DuoIcon} color={color} size={size} focused={focused} />
          ),
        }}
      />
      {/* Ecrans cachés de la tab bar */}
      <Tabs.Screen name="chapters" options={{ href: null }} />
      <Tabs.Screen name="profile/[id]" options={{ href: null }} />
    </Tabs>
  );
}
