import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useSegments, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PrivyElements, PrivyProvider, usePrivy } from '@privy-io/expo';
import {Inter_400Regular, Inter_500Medium, Inter_600SemiBold} from '@expo-google-fonts/inter';
import { View, ActivityIndicator } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();
  const { isReady } = usePrivy();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      router.replace('/auth');
    }
  }, [user, segments, isReady]);
}

function RootLayoutNav() {
  const { user, isReady } = usePrivy();

  useProtectedRoute(user);

  if (!isReady) {
    console.log('user', user);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PrivyProvider
      appId="cm3q4lb7z0011kfc5hjraz9p2"
      clientId="client-WY5ddMmsspoGVqEsbdKM4Y59cXrFSjt56QnWUMPCU267V"
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        <PrivyElements />
      </ThemeProvider>
    </PrivyProvider>
  );
}
