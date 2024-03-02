import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link, router } from 'expo-router';
import { useSignIn, useAuth } from '@clerk/clerk-expo';

export default function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useAuth();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInPress = async () => {
    await signOut();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      console.log('Doing something here');
      console.log(completeSignIn);
      await setActive({ session: completeSignIn.createdSessionId });
      router.replace('/');
    } catch (err) {
      console.log('Error happened here');
      console.log(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <TextInput
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={onSignInPress}>
        <Text>Sign in</Text>
      </TouchableOpacity>

      <Link href="/sign-up">Sign Up</Link>
    </View>
  );
}
