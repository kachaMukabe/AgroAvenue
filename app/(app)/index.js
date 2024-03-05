import { Text, Button, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useUser } from '@clerk/clerk-expo';
import Products from '../../Products';
import { Link } from 'expo-router';

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default function Index() {
  const { user } = useUser();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logged In: {user.fullName}</Text>
      <Products />
      <Link href="/vouchers">Vouchers</Link>
      <SignOut />
    </View>
  );
}
