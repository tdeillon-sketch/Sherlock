import { Stack } from 'expo-router';

// Stack routeur pour l'onglet « Profils » : la liste (index) et le détail
// ([id]) partagent le même onglet dans la tab bar, si bien que l'icône
// « Profils » reste active en orange quand on consulte le détail d'un type.
export default function ProfilesLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
