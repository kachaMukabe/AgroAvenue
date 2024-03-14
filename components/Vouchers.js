import { useState } from 'react';
import { api } from '../convex/_generated/api';
import { useQuery } from 'convex/react';
import { StyleSheet, View } from 'react-native';
import {
  Card,
  Divider,
  Layout,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';
import { VoucherModal } from './VoucherModal';

export default function Vouchers() {
  const vouchers = useQuery(api.vouchers.get);
  const [visible, setVisible] = useState(false);
  const [voucher, setVoucher] = useState(null);

  const renderItemHeader = (headerProps, item) => {
    return (
      <View {...headerProps}>
        <Text category="h6">{item.issued_by}</Text>
      </View>
    );
  };

  const renderModal = (item) => {
    setVisible(true);
    setVoucher(item);
  };

  const renderItemFooter = (footerProps) => (
    <Text {...footerProps}>By Wikipedia</Text>
  );
  const renderItem = ({ item, index }) => (
    <Card
      header={(headerprops) => renderItemHeader(headerprops, item)}
      style={styles.item}
      onPress={() => renderModal(item)}
    >
      <Text>Amount: {item.amount}</Text>
      <Text>Expiration Date: {item.expiration_date}</Text>
    </Card>
  );

  return (
    <View>
      <Text style={{ marginVertical: 5 }} category="h4">
        Vouchers
      </Text>
      <Divider />
      <List
        style={styles.container}
        data={vouchers}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
      <VoucherModal
        visible={visible}
        setVisible={setVisible}
        voucher={voucher}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { maxHeight: 520 },
  contentContainer: { backgroundColor: '#fff' },
  item: { marginVertical: 8 },
});
