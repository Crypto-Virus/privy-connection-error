import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { isNotCreated, useEmbeddedSolanaWallet, useLogin } from '@privy-io/expo';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AuthScreen() {
  const { login } = useLogin();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await login({
        loginMethods: ['email'],
      });
      router.replace('/(tabs)');
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        /> */}
        <Text style={styles.title}>Sample app</Text>
        <Text style={styles.subtitle}>
          This is a sample app to demonstrate how to use Privy with Expo
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
