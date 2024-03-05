import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Voucher() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Hi {id}</Text>
    </View>
  );
}
