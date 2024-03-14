import { Redirect, Tabs } from 'expo-router';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
import { useConvexAuth, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Icon, IconElement, Text } from '@ui-kitten/components';
import useStoreUserEffect from '../../useStoreFarmerEffect';

export default function AppLayout() {
  const { isSignedIn } = useAuth();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const farmerId = useStoreUserEffect();

  //useEffect(() => {
  //  console.log('Calling use effect');
  //  async function createFarmer() {
  //    const id = await storeFarmer();
  //  }
  //  if (isSignedIn && isAuthenticated) {
  //    createFarmer();
  //  }
  //  return () => {};
  //}, [isAuthenticated, user?.id]);
  console.log('Check authentication');
  console.log(isSignedIn);
  console.log('Convex auth');
  console.log(isAuthenticated);
  console.log(isLoading);

  const StarIcon = (props) => (
    <IconElement>
      <Icon style={{ width: 32, height: 32 }} fill="#8F9BB3" name="star" />
    </IconElement>
  );

  if (!isSignedIn && !isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }
  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    isAuthenticated && (
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="cog" color={color} />
            ),
          }}
        />
      </Tabs>
    )
  );
}
