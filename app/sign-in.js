import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from '@ui-kitten/components';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { useSignIn, useAuth } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';

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
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/logo.png')}
        contentFit="contain"
        transition={1000}
      />
      <View style={styles.inputContainer}>
        <Input
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Button style={styles.signInButton} onPress={onSignInPress}>
        Sign In
      </Button>

      <Link href="/sign-up" asChild>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            <Text>Sign Up</Text>
            <FontAwesome name="arrow-right" style={{ margin: 3 }} />
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 30,
  },
  inputContainer: {
    paddingTop: 16,
  },
  signInButton: {
    marginVertical: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  image: {
    height: '20%',
    width: '40%',
    marginHorizontal: '30%',
  },
});
