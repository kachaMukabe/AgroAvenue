import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function Index() {
  const vouchers = useQuery(api.vouchers.get);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello</Text>
      {vouchers?.map(({ issued_at, issued_by, amount, _id }) => (
        <>
          <Text>
            {issued_by} {issued_at} ${amount} {_id}
          </Text>
          <Link
            href={{
              pathname: '/vouchers/[id]',
              params: { id: _id },
            }}
          >
            Go to Voucher
          </Link>
        </>
      ))}
    </View>
  );
}
