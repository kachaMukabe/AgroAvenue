import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import 'react-native-get-random-values';
import { CONVEX_URL } from '@env';
import Constants from 'expo-constants';
import { Slot } from 'expo-router';

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

console.log(CONVEX_URL);

export default function Root() {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Slot />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
