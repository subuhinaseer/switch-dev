import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Button, Divider, IconButton, Searchbar} from 'react-native-paper';
import {UnsecuredTextBox} from '../components/Inputs';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalMethod} from '../utils/GlobalMethod';
import {
  calculateDiscount,
  calculateTotalAmountCash,
} from '../redux/actions/SaleAction.js';
type DetailBoxProps = {
  title: string;
  quantity: string;
  sellingPrice: string;
};

const DetailBox = (props: DetailBoxProps) => {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: '#2A677A',
        padding: 10,
        marginVertical: 10,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={{color: '#D5EAF1', fontWeight: '500', fontSize: 14}}>
          {props.title}
        </Text>
        <Text style={{color: '#D5EAF1', fontSize: 11}}>
          Quantity: {props.quantity}
        </Text>
        <Text style={{color: '#D5EAF1', fontSize: 11}}>
          Selling Price: {GlobalMethod.formatCurrency(props.sellingPrice)}
        </Text>
        <Text style={{color: '#D5EAF1', fontSize: 11}}>
          Amount: {GlobalMethod.formatCurrency(props.amount)}
        </Text>
      </View>
      <View>
        <IconButton
          icon={require('../assets/downArrow.png')}
          iconColor="#D5EAF1"
          size={16}
        />
      </View>
    </View>
  );
};
export {DetailBox};

const ReviewOrder = ({navigation}: any) => {
  const cart = useSelector(e => e.cart.cartItems);
  const dispatch = useDispatch();

  const [totalCartAmount, setTotalCartAmount] = useState(0.0);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0.0);
  const [totalDiscount, setTotalDiscount] = useState(0.0);

  const calculateTotalAmount = () => {
    var totalBilledAmount = 0;
    var billedDiscountAmount = 0;
    cart.forEach(e => {
      totalBilledAmount = totalBilledAmount + e.totalAmount;
      billedDiscountAmount = billedDiscountAmount + e.discount;
      setTotalCartAmount(totalBilledAmount);
      setTotalDiscount(billedDiscountAmount);
    });
    dispatch(calculateDiscount(billedDiscountAmount));
    dispatch(calculateTotalAmountCash(totalBilledAmount));
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [cart]);

  return (
    <SafeAreaView style={styles.mainContainer}>
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
          <Text style={{color: '#F6B100'}}>Review Order</Text>
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
              source={require('../assets/ellipse.png')}
              resizeMode="contain"
              style={{height: 13, width: 13}}
            />
            <Text style={styles.whiteText}>Add Payment</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <FlatList
          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({highlighted}) => (
              <View style={[style.separator, highlighted && {marginLeft: 0}]} />
            ))
          }
          data={cart}
          renderItem={({item, index, separators}) => (
            <TouchableHighlight
              key={item.sku}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <DetailBox
                title={item.name}
                quantity={item.quantity}
                sellingPrice={item.price}
                amount={item.totalAmount}
              />
            </TouchableHighlight>
          )}
        />
        {/* <DetailBox title="Pepsi" quantity="100" sellingPrice="2000" />
        <DetailBox title="Chocos" quantity="100" sellingPrice="2000" /> */}
      </View>
      <Button
        style={styles.addMoreButton}
        labelStyle={styles.addMoreText}
        onPress={() => {
          navigation.navigate('AddProducts');
        }}>
        Add More
      </Button>
      <View style={styles.buttonContainer}>
        <View>
          <View style={{backgroundColor: '#08485C', paddingHorizontal: 20}}>
            <Text style={{color: '#FFFFFF'}}>Order Detail</Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginTop: 10,
              }}>
              <Text style={{color: '#D5EAF1', fontSize: 12}}>Subtotal</Text>
              <Text style={{color: '#2A677A', fontSize: 12}}>
                TZS
                {GlobalMethod.formatCurrency(totalCartAmount - totalDiscount)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
              <Text style={{color: '#D5EAF1', fontSize: 12}}>Discount</Text>
              <Text style={{color: '#2A677A', fontSize: 12}}>
                TZS {GlobalMethod.formatCurrency(totalDiscount)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginBottom: 10,
              }}>
              <Text style={{color: '#D5EAF1', fontSize: 12}}>Total Amount</Text>
              <Text style={{color: '#2A677A', fontSize: 12}}>
                TZS {GlobalMethod.formatCurrency(totalCartAmount)}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            if (cart.length > 0) {
              navigation.navigate('AddPayment');
            } else {
              navigation.navigate('CustomerAdded');
            }
          }}>
          <Text style={styles.update}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReviewOrder;

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
    alignSelf: 'center',
  },
  updateButton: {
    flex: 1,
    alignSelf: 'flex-end',
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
});
