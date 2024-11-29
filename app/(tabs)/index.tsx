import { View, Button, Text, StyleSheet } from 'react-native';
import { useEmbeddedSolanaWallet, isNotCreated, usePrivy } from '@privy-io/expo';
import { useRouter } from 'expo-router';

export default function TestScreen() {
  const router = useRouter();
  const wallet = useEmbeddedSolanaWallet();
  const { user, logout } = usePrivy();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth');
  };

  const handleTestSignMessage = async () => {
    if (!wallet.getProvider) {
      console.log('No provider');
      return;
    }
    try {
      const provider = await wallet.getProvider();

      const { signature } = await provider.request({
        method: 'signMessage',
        params: {
          message: 'Test message signing with Privy!',
        },
      });

      console.log('Signature:', signature);
    } catch (error) {
      console.error('Signing failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isNotCreated(wallet) ? (
        <Button
          title="Create Wallet"
          onPress={() => wallet.create({ recoveryMethod: 'privy' })}
        />
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            {JSON.stringify(wallet)}
          </Text>
          <Button
            title="Test Privy Signature"
            onPress={handleTestSignMessage}
          />
        </View>
      )}
      {user && (
        <Button
          title="Logout"
          onPress={handleLogout}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
  },
  contentContainer: {
    alignItems: 'center',
    gap: 16,
  },
  text: {
    color: 'white',
  },
});