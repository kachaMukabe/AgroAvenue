import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Button, Divider, Layout } from '@ui-kitten/components';

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        onPress={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    </View>
  );
};

const Setting = (props) => {
  const { style, hint, children, ...touchableOpacityProps } = props;
  return (
    <React.Fragment>
      <TouchableOpacity
        activeOpacity={1.0}
        {...touchableOpacityProps}
        style={[styles.container, style]}
      >
        <Text category="s2">{hint}</Text>
        {children}
      </TouchableOpacity>
      <Divider />
    </React.Fragment>
  );
};

export default function Settings() {
  const { isLoaded, signOut } = useAuth();
  return (
    <Layout style={styles.container}>
      <Setting style={styles.setting} hint="Edit Profile" />
      <Setting style={styles.setting} hint="Change Password" />
      <Setting style={[styles.setting, styles.section]} hint="Notification" />
      {isLoaded && (
        <Setting
          style={styles.setting}
          hint="Log out"
          onPress={() => {
            signOut();
          }}
        />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {},
  setting: {
    padding: 16,
  },
  section: {
    paddingTop: 32,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
