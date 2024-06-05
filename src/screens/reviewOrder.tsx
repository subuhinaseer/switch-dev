import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, Divider, IconButton, Searchbar } from 'react-native-paper';
import { UnsecuredTextBox } from '../components/Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalMethod } from '../utils/GlobalMethod';
import {
  calculateDiscount,
  calculateTotalAmountCash,
} from '../redux/actions/SaleAction.js';
import { colors } from '~/theme';
import AppButton from '../components/AppButton'
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
        <Text style={{ color: '#D5EAF1', fontWeight: '500', fontSize: 14 }}>
          {props.title}
        </Text>
        <Text style={{ color: '#D5EAF1', fontSize: 11 }}>
          Quantity: {props.quantity}
        </Text>
        <Text style={{ color: '#D5EAF1', fontSize: 11 }}>
          Selling Price: {GlobalMethod.formatCurrency(props.sellingPrice)}
        </Text>
        <Text style={{ color: '#D5EAF1', fontSize: 11 }}>
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
export { DetailBox };

const ReviewOrder = ({ navigation }: any) => {
  const cart = useSelector(e => e.cart.cartItems);
  const dispatch = useDispatch();
  const [maxLength, setMaxLength] = useState(2);
  const [selectedMode, setSelectedMode] = useState('cash')
  const [totalCartAmount, setTotalCartAmount] = useState(0.0);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0.0);
  const [totalDiscount, setTotalDiscount] = useState(0.0);
  const [discount, setdiscount] = useState(0)
  const [vat, setVat] = useState(0.0)
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
  const handleChangeText = (val) => {
    // Determine the new maxLength based on the input value
    // if (val.includes('.')) {
    //   if (val.length > 4) {
    //     setMaxLength(4);
    //   } else {
    //     setMaxLength(val.length + 1); // Add 1 to account for the decimal point
    //   }
    // } else {
    //   setMaxLength(2);
    // }

    // setVat(val);
    if (/^\d{0,2}(\.\d{0,2})?$/.test(val)) {
      setVat(val);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.background,
          paddingVertical: 10,
          paddingTop:30
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            icon={require('../assets/backArrowButton.png')}
            iconColor="#F6B100"
            size={19}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={{ color: '#F6B100' }}>Review Order</Text>
        </View>
        <Button labelStyle={{ color: '#F6B100', fontSize: 14 }}>Cancel</Button>
      </View>
      <KeyboardAwareScrollView style={{ flex: 1 }}
        enableAutomaticScroll
        enableOnAndroid
        onKeyboardWillShow={(frames: Object) => {
          console.log('Keyboard event', frames)
        }}>


        <ScrollView contentContainerStyle={{ flex: 1, }}>
          <View>
            <View
              style={{
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../assets/tickIcon.png')}
                  resizeMode="contain"
                />
                <Text style={styles.yellowText}>Customer Detail</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../assets/tickIcon.png')}
                  resizeMode="contain"
                />
                <Text style={styles.yellowText}>Add Product & Review</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
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
              color: '#222',
              fontWeight: 'bold',
              fontSize: 14,
              marginTop: 40,
              marginLeft: 20,
            }}>
            Payment Mode
          </Text>
          <View style={{ margin: 20 }}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setSelectedMode('cash')} style={styles.checkbox}>
                {selectedMode == 'cash' ?
                  <Icon name={"checkmark"} size={18} style={{ height: 25, width: 25 }} />
                  :
                  <></>
                }
              </TouchableOpacity>
              <Text style={styles.textStyle}>Cash</Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setSelectedMode('online')} style={styles.checkbox}>
                {selectedMode == 'online' ?
                  <Icon name={"checkmark"} size={18} style={{ height: 25, width: 25 }} />
                  :
                  <></>
                }
              </TouchableOpacity>
              <Text style={styles.textStyle}>Online</Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setSelectedMode('credit')} style={styles.checkbox}>
                {selectedMode == 'credit' ?
                  <Icon name={"checkmark"} size={18} style={{ height: 25, width: 25 }} />
                  :
                  <></>
                }
              </TouchableOpacity>
              <Text style={styles.textStyle}>Credit</Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setSelectedMode('image')} style={styles.checkbox}>
                {selectedMode == 'image' ?
                  <Icon name={"checkmark"} size={18} style={{ height: 25, width: 25 }} />
                  :
                  <></>
                }
              </TouchableOpacity>
              <Text style={styles.textStyle}>Upload Image</Text>
            </View>
          </View>
          {/* <ScrollView>
          </ScrollView> */}
          <UnsecuredTextBox placeholder="Amount Paid" />
          <UnsecuredTextBox placeholder="Amount Due" />
          {/* <View style={{ marginTop: 20 }}>
        <FlatList
          // ItemSeparatorComponent={
          //   Platform.OS !== 'android' &&
          //   (({highlighted}) => (
          //     <View style={[style.separator, highlighted && {marginLeft: 0}]} />
          //   ))
          // }
          data={cart}
          renderItem={({ item, index, separators }) => (
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
      </View> */}
          {/* <DetailBox title="Pepsi" quantity="100" sellingPrice="2000" />
        <DetailBox title="Chocos" quantity="100" sellingPrice="2000" /> */}
          {/* <Button
        style={styles.addMoreButton}
        labelStyle={styles.addMoreText}
        onPress={() => {
          navigation.navigate('AddProducts');
        }}>
        Add More
      </Button> */}
          <View style={styles.buttonContainer}>
            <View>
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ color: colors.backgroundColor2 }}>Order Detail</Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                    marginTop: 10,
                  }}>
                  <Text style={{ color: colors.backgroundColor2, fontSize: 12 }}>Subtotal</Text>
                  <Text style={{ color: colors.backgroundColor2, fontSize: 12 }}>
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
                    alignItems: "center"
                  }}>
                  <Text style={{ color: colors.backgroundColor2, fontSize: 12 }}>Discount</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-end",
                      alignItems: "center",
                      borderWidth: 1,
                      paddingHorizontal: 4,
                      borderRadius: 3
                    }}>
                    <TextInput
                      style={{
                        width: 40,
                        height: 25,
                        fontSize: 12
                      }}
                      maxLength={2}
                      onChangeText={(val) => setdiscount(val)}
                      value={discount} />
                    <Text style={{ color: colors.backgroundColor2, fontSize: 16 }}>
                      %
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                    marginBottom: 10,
                    alignItems: "center"
                  }}>
                  <Text style={{ color: colors.backgroundColor2, fontSize: 12 }}>VAT</Text>
                  {/* <Text style={{ color: colors.backgroundColor2, fontSize: 12 }}>
                TZS {GlobalMethod.formatCurrency(totalDiscount)}
              </Text> */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-end",
                      alignItems: "center",
                      borderWidth: 1,
                      paddingHorizontal: 4,
                      borderRadius: 3
                    }}>
                    <TextInput
                      style={{
                        width: 40,
                        height: 25,
                        fontSize: 12
                      }}
                      // maxLength={maxLength}
                      onChangeText={handleChangeText}
                      value={vat} />
                    <Text style={{ color: colors.backgroundColor2, fontSize: 16 }}>
                      %
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                    marginBottom: 10,
                  }}>
                  <Text style={{ color: colors.backgroundColor2, fontSize: 12 }}>Total Amount</Text>
                  <Text style={{ color: colors.backgroundColor2, fontSize: 12 }}>
                    TZS {GlobalMethod.formatCurrency(totalCartAmount)}
                  </Text>
                </View>
              </View>
            </View>

            <AppButton label={'Next'} onPress={() => {
              if (cart.length > 0) {
                navigation.navigate('AddPayment');
              } else {
                navigation.navigate('CustomerAdded');
              }
            }} />
            {/* <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            if (cart.length > 0) {
              navigation.navigate('AddPayment');
            } else {
              navigation.navigate('CustomerAdded');
            }
          }}>
          <Text style={styles.update}>Next</Text>
        </TouchableOpacity> */}

          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

    </SafeAreaView>
  );
};

export default ReviewOrder;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#01232D',
    // paddingTop: 20,
    // paddingHorizontal: 20,
  },
  yellowText: {
    color: colors.success,
    fontSize: 12,
    paddingTop: 5,
  },
  whiteText: {
    // color: '#FFFFFF',
    color: colors.text,
    fontSize: 12,
    paddingTop: 15,
  },
  textStyle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginTop: 30
    // alignSelf: 'center',
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
  checkbox: {
    borderWidth: 1, borderRadius: 4, borderColor: '#222',
    width: 20, height: 20, marginRight: 8
  },
  row: { flexDirection: 'row', alignItems: "center", marginBottom: 5 }

});
