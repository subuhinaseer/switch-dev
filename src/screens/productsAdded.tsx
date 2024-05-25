import React, {useCallback, useMemo, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Chip, Divider, IconButton, Searchbar} from 'react-native-paper';
import {UnsecuredTextBox} from '../components/Inputs';
import {useSelector, useDispatch} from 'react-redux';
import {
  addItemToCart,
  removeItemFromCart,
} from '../redux/actions/SaleAction.js';
import {GlobalMethod} from '../utils/GlobalMethod.js';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';

const TextHolder = () => {
  return <View />;
};

const ProductsAdded = ({route, navigation}: any) => {
  const cart = useSelector(e => e.cart);
  const dispatch = useDispatch();
  const productAddeds = route.params;
  // console.log(productAddeds.product);
  const [quantity, setQuantity] = React.useState(
    productAddeds.product.quantity.toString(),
  );
  const [price, setPrice] = React.useState(
    productAddeds.product.price.toString(),
  );
  const [discount, setDiscount] = React.useState(
    productAddeds.product.discount.toString(),
  );

  const handleQuantityChange = text => {
    setQuantity(text);
  };

  const handlePriceChange = text => {
    setPrice(text);
  };

  const handleDiscountChange = text => {
    setDiscount(text);
  };

  const handleButtonPress = () => {
    if (parseFloat(quantity) > parseFloat(productAddeds.product.stock)) {
      Toast.show({
        type: 'success',
        text1: 'product out of stock',
      });
      return;
    }
    if (parseFloat(discount) >= parseFloat(price)) {
      Toast.show({
        type: 'success',
        text1: 'discount should be greater than price',
      });
      return;
    }
    if (cart.cartItems.length < 1) {
      navigation.navigate('SearchAssignment');
      return;
    }
    dispatch(removeItemFromCart(productAddeds.product.sku));
    dispatch(
      addItemToCart({
        id: productAddeds.product.id,
        name: productAddeds.product.name,
        sku: productAddeds.product.sku,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        totalAmount:
          parseFloat(quantity) * (parseFloat(price) - parseFloat(discount)),
        taxRate: 0,
        costAmount:
          productAddeds.product.cost_price == null
            ? 0
            : productAddeds.product.cost_price,
        tax: GlobalMethod.calculateTax(
          parseFloat(quantity) * (parseFloat(price) - parseFloat(discount)),
          0,
        ),
        discount: parseFloat(discount),
        stock: productAddeds.product.stock,
      }),
    );
    navigation.navigate('ProductsAdded2');
  };

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
          <Text style={{color: '#F6B100'}}>Create Sales</Text>
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
      <Text
        style={{
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: 14,
          marginTop: 40,
          marginLeft: 20,
        }}>
        Add Products to your sales
      </Text>
      <ScrollView>
        <Chip
          mode="outlined"
          textStyle={styles.chipText}
          theme={{colors: {primary: '#012E3C'}}}
          style={styles.chipStyle}>
          {productAddeds.product.name != null
            ? productAddeds.product.name
            : 'Brittania'}
        </Chip>
        <UnsecuredTextBox
          onTextChange={handleQuantityChange}
          value={quantity}
          placeholder="Quantity"
        />
        <UnsecuredTextBox
          onTextChange={handlePriceChange}
          value={price}
          placeholder="Price"
        />
        <UnsecuredTextBox
          onTextChange={handleDiscountChange}
          value={discount}
          placeholder="Discount"
        />
        <UnsecuredTextBox placeholder="TZS 1400.0" />
      </ScrollView>
      <View style={{marginTop: 10, height: 120}}>
        {/* <TouchableOpacity>
        <Button
          style={styles.addMoreButton}
          labelStyle={styles.addMoreText}
          onPress={() => {
            navigation.navigate('SearchProducts');
          }}>
          Add More
        </Button>
      </TouchableOpacity> */}
        {/* <Chip
          style={styles.addMoreButton}
          textStyle={styles.addMoreText}
          onPress={() => {
            navigation.navigate('AddProducts');
          }}>
          Add More
        </Chip> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              handleButtonPress();
            }}>
            <Text style={styles.update}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductsAdded;

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
    position: 'absolute',
  },
  addMoreText: {
    color: '#01232D',
    fontSize: 14,
  },
  chipText: {
    color: '#D5EAF1',
    fontSize: 17,
  },
  chipStyle: {
    backgroundColor: '#012E3C',
    borderColor: '#78ADBE',
    height: 48,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1.5,
    borderRadius: 10,
  },
});
// {"costAmount": 1000, "discount": 0, "id": 1, "name": "Coca-cola 350ml bottle", "price": 2000, "quantity": 1, "sku": "120102", "stock": 3, "tax": 0, "taxRate": 0, "totalAmount": 2000}
