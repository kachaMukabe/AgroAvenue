import { Text, View } from 'react-native';
import Products from '../../Products';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logged In</Text>
      <Products />
    </View>
  );
}
