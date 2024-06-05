import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Divider,
  IconButton,
  Searchbar,
  RadioButton,
} from 'react-native-paper';
import {UnsecuredTextBox} from '../components/Inputs';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalMethod} from '../utils/GlobalMethod.js';
import Toast from 'react-native-toast-message';
const TextHolder = () => {
  return <View />;
};

const AddPayment = ({navigation}: any) => {
  //'2023-10-09T19:44:19+03:00','2023-10-09T19:45:46.395520+03:00','2023-10-09T19:44:19+03:00'
  const [checked, setChecked] = useState('Cash');
  const cart = useSelector(e => e.cart.cartItems);
  const user = useSelector(e => e.user.user);
  const customer = useSelector(e => e.customer);
  const [dueAmount, setDueAmount] = React.useState(
    customer.totalAmount.toString(),
  );
  const [amountPaid, setAmountPaid] = React.useState(
    customer.totalAmount.toString(),
  );

  const handleAmountPaidChange = text => {
    setAmountPaid(text);
    setDueAmount(
      (parseFloat(customer.totalAmount) - parseFloat(text)).toString(),
    );
  };

  const handleDueAmountChange = text => {
    setDueAmount(text);
  };

  const postSave = async () => {
    const sale = {
      invoice_number: 'N-1234',
      sub_discount: customer.totalDiscount,
      documents: [],
      transaction_date: GlobalMethod.getCurrentDateTime(),
      status: 'new',
      vat: 0.18,
      notes: 'No one',
      total_amount: customer.totalAmount,
      is_active: true,
      payment_mode: checked,
      invoice_name: 'Name123',
      transaction_type: 'sale',
      lpo_number: '2323',
      updated_at: GlobalMethod.getCurrentDateTime(),
      due_date: GlobalMethod.getCurrentDateTime(),
      shipping: 0,
      contact: customer.customer.id,
      order_category: {name: 'expenses'},
      processed_by: user.user.full_name,
      line_items: cart.map((e: any) => {
        return {
          discount: e.discount,
          total_amount: e.totalAmount,
          quantity: e.quantity,
          unit_price: e.price,
          order: 1,
          product: e.id,
        };
      }),
    };
    const result = await fetch(
      'https://api-dev.switchafrica.io/inventory/api/v1/Order/',
      {
        method: 'POST',
        body: JSON.stringify(sale),
        headers: {
          credentials: 'include',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access}`,
        },
      },
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        return {result: json, isError: false};
      })
      .catch(error => {
        return {
          result: 'failed to process this request Please try again later',
          isError: true,
        };
      });
    if (!result.isError) {
      Toast.show({
        type: 'success',
        text1: 'Sale successfully added',
      });

      navigation.navigate('dashboard');
    } else {
      Toast.show({
        type: 'success',
        text1: 'Something went wrong',
      });
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon={require('../assets/backArrowButton.png')}
            iconColor="#F6B100"
            size={19}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={{color: '#F6B100'}}>Add Payment</Text>
        </View>
        <Button labelStyle={{color: '#F6B100', fontSize: 14}}>Cancel</Button>
      </View>
      <View>
        <View
          style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/tickIcon.png')}
              resizeMode="contain"
            />
            <Text style={styles.yellowText}>Customer Detail</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/tickIcon.png')}
              resizeMode="contain"
            />
            <Text style={styles.yellowText}>Add Product & Review</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/tickIcon.png')}
              resizeMode="contain"
            />
            <Text style={styles.yellowText}>Add Payment</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: 14,
          marginTop: 40,
          marginLeft: 20,
        }}>
        Payment Mode
      </Text>
      <View style={{margin: 20}}>
        <RadioButton.Group
          onValueChange={newValue => setChecked(newValue)}
          value={checked}>
          <View style={{backgroundColor:'red'}}>
            <RadioButton.Group
              onValueChange={newValue => setChecked(newValue)}
              value={checked}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginRight: 10}}>
                  <RadioButton value="Cash" size={10} />
                </View>
                <Text>Cash</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginRight: 10}}>
                  <RadioButton value="Online" size={10} />
                </View>
                <Text>Online</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginRight: 10}}>
                  <RadioButton value="Credit" size={10} />
                </View>
                <Text>Credit</Text>
              </View>
            </RadioButton.Group>
          </View>
        </RadioButton.Group>
        {/* <Text style={styles.textStyle}>Upload Image</Text> */}
        {/* <Text style={styles.textStyle}>Cash</Text>
        <Text style={styles.textStyle}>Online</Text>
        <Text style={styles.textStyle}>Credit</Text> */}
        {/* <Text style={styles.textStyle}>Upload Image</Text> */}
      </View>
      <View style={styles.totalText}>
        <Text>Total Amount</Text>
        <Text>{GlobalMethod.formatCurrency(customer.totalAmount)}</Text>
      </View>
      <ScrollView>
        <UnsecuredTextBox
          onChangeEt={handleAmountPaidChange}
          value={amountPaid}
          placeholder="Amount Paid"
        />
        <UnsecuredTextBox
          onChangeEt={handleDueAmountChange}
          value={dueAmount}
          placeholder="Amount Due"
          disable={true}
        />
      </ScrollView>
      <View style={{marginTop: 10, height: 150}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              if (cart.length > 0) {
                postSave();
              }
            }}>
            <Text style={styles.update}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default AddPayment;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01232D',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  yellowText: {
    color: '#F6B100',
    fontSize: 12,
    paddingTop: 5,
  },
  whiteText: {
    color: '#FFFFFF',
    fontSize: 12,
    paddingTop: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  updateButton: {
    flex: 1,
    alignSelf: 'center',
    maxHeight: 77,
    width: 375,
    backgroundColor: '#F6B100',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
  },
  update: {
    color: '#01232D',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addMoreButton: {
    height: 32,
    width: 95,
    backgroundColor: '#D5EAF1',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  addMoreText: {
    color: '#01232D',
    fontSize: 14,
  },
  textStyle: {
    color: '#D5EAF1',
    lineHeight: 25,
  },
  totalText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
