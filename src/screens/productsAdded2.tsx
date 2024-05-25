import React, {useCallback, useMemo, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {Button, Chip, Divider, IconButton, Searchbar} from 'react-native-paper';
import {UnsecuredTextBox} from '../components/Inputs';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

const TextHolder = () => {
  return <View />;
};

const ProductsAdded2 = ({navigation}: any) => {
  const cart = useSelector(e => e.cart.cartItems);
  console.log('cart availbable', cart);
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
      {/* <ScrollView> */}
      <View style={styles.productBoxStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({highlighted}) => (
                <View
                  style={[style.separator, highlighted && {marginLeft: 0}]}
                />
              ))
            }
            data={cart}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight
                key={item.key}
                onPress={() => this._onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View>
                  <Text style={styles.productNameStyle}>{item.name}</Text>
                  <Text style={styles.productDetailsStyle}>
                    Quantity: {item.quantity}
                    {'\n'}Selling Price: TZS {item.price}{' '}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          />
          {/* <View>
              <Text style={styles.productNameStyle}>Britannia</Text>
              <Text style={styles.productDetailsStyle}>
                Quantity: 100{'\n'}Selling Price: TZS 2000
              </Text>
            </View> */}
          <View>
            <IconButton
              icon={require('../assets/downArrow.png')}
              iconColor="#FFFFFF"
              size={16}
            />
          </View>
        </View>
      </View>
      {/* <Chip
          mode="outlined"
          textStyle={styles.chipText}
          theme={{colors: {primary: '#012E3C'}}}
          style={styles.chipStyle}
          onPress={() => {
            navigation.navigate('SearchAssignment');
          }}>
          Product Name
        </Chip>
        <UnsecuredTextBox placeholder="Quality" />
        <UnsecuredTextBox placeholder="Unit Price" />
        <UnsecuredTextBox placeholder="Discount" />
        <UnsecuredTextBox placeholder="Selling Price" /> */}
      {/* </ScrollView> */}
      <View
        style={{
          marginTop: 10,
          height: 120,
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Button
          style={styles.addMoreButton}
          labelStyle={styles.addMoreText}
          onPress={() => {
            navigation.navigate('AddProducts');
          }}>
          Add More
        </Button>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              navigation.navigate('ReviewOrder');
            }}>
            <Text style={styles.update}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductsAdded2;

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
    // height: 32, //never fix button sizes, it welcomes bugs
    width: 95,
    backgroundColor: '#D5EAF1',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    // position: 'absolute', //in most case when a button is not clickable it is because of this. Avoid whenever you can
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
  productBoxStyle: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2A677A',
  },
  productNameStyle: {
    fontSize: 14,
    color: '#D5EAF1',
    fontWeight: '500',
  },
  productDetailsStyle: {
    color: '#D5EAF1',
    fontSize: 11,
  },
});
