import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from './convex/_generated/api';

export default function Products() {
  const products = useQuery(api.products.get);
  return (
    <View style={styles.container}>
      {products?.map(({ _id, category }) => (
        <Text key={_id}>{category}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
