import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

export const VoucherModal = ({ visible, setVisible, voucher }) => {
  console.log(voucher);
  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          {voucher && (
            <View>
              <Text category="h6">Redeem Voucher</Text>
              <Text>{voucher.issued_by}</Text>
              <Text>{voucher.expiration_date}</Text>

              <Button onPress={() => setVisible(false)}>Redeem</Button>
              <Button onPress={() => setVisible(false)}>Redeem</Button>
            </View>
          )}
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
