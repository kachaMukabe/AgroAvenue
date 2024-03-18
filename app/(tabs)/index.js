import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useUser } from '@clerk/clerk-expo';
import Products from '../../Products';
import { Link } from 'expo-router';
import {
  Button,
  Layout,
  Card,
  Avatar,
  Divider,
  StyleService,
  useStyleSheet,
  List,
} from '@ui-kitten/components';
import Vouchers from '../../components/Vouchers';
import { Icon, IconElement } from '@ui-kitten/components';

const ArrowHeadUpIcon = (style) => <Icon {...style} name="arrowhead-up" />;

const ArrowHeadDownIcon = (style) => <Icon {...style} name="arrowhead-down" />;

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

export const ProfileParameterCard = (props) => {
  const { hint, value, icon, ...restProps } = props;

  return (
    <Card {...restProps}>
      <View style={styles.topContainer}>
        <Text appearance="hint">{hint}</Text>
        {icon(styles.icon)}
      </View>
      <Text style={styles.valueLabel} category="h5">
        {value}
      </Text>
    </Card>
  );
};

export default function Index() {
  const { user } = useUser();
  return (
    <Layout style={styles.container} level="2">
      <Layout style={styles.header} level="1">
        <View style={styles.profileContainer}>
          <Avatar
            style={styles.profileAvatar}
            size="large"
            source={require('../../assets/logo.png')}
          />
          <View style={styles.profileDetailsContainer}>
            <Text category="h4">{user.fullName}</Text>
            <Text appearance="hint" category="s1">
              {user.primaryEmailAddress.emailAddress}
            </Text>
          </View>
        </View>
        <Text style={styles.descriptionText} appearance="hint"></Text>
      </Layout>
      <Vouchers />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  rateBar: {
    marginTop: 24,
  },
  followButton: {
    marginTop: 24,
  },
  descriptionText: {
    marginTop: 24,
    marginBottom: 8,
  },
  profileParametersContainer: {
    flexDirection: 'row',
    marginVertical: 24,
    marginHorizontal: 8,
  },
  profileSectionsDivider: {
    width: 1,
    height: '100%',
    marginHorizontal: 8,
  },
  profileSocialsSection: {
    marginHorizontal: 16,
  },
  profileSocialContainer: {
    flex: 1,
  },
  profileParametersSection: {
    flex: 1,
    marginHorizontal: 16,
  },
  profileParameter: {
    marginBottom: 16,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueLabel: {
    marginTop: 20,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'color-primary-default',
  },
});
