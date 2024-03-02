import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
} from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import 'react-native-get-random-values';
import { CONVEX_URL } from '@env';
import Products from './Products';
import Constants from 'expo-constants';

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>
          <Products />
        </Authenticated>
        <Unauthenticated>
          <View style={{ flex: 1 }}>
            <View
              style={{ height: STATUS_BAR_HEIGHT, backgroundColor: '#0D87E1' }}
            >
              <StatusBar
                translucent
                backgroundColor={'#0D87E1'}
                barStyle="light-content"
              />
            </View>
            <SafeAreaView>
              <Text>Hello world</Text>
            </SafeAreaView>
          </View>
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
