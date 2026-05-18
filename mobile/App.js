import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';
import AppNavigator from './src/navigation/AppNavigator';

async function checkForOTAUpdate() {
  try {
    if (!Updates.isEnabled) return;
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch {
    // Silently ignore — app works fully offline
  }
}

export default function App() {
  useEffect(() => {
    checkForOTAUpdate();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#0A0A0A" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
