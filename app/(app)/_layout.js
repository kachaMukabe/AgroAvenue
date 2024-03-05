import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { useConvexAuth } from 'convex/react';

export default function AppLayout() {
  const { isSignedIn } = useAuth();
  const { isAuthenticated } = useConvexAuth();
  console.log('Check authentication');
  console.log(isSignedIn);
  console.log('Convex auth');
  console.log(isAuthenticated);

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}
