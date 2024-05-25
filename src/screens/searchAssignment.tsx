import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {Button, Chip, Divider, IconButton, Searchbar} from 'react-native-paper';
import {useFetchData} from '~/effects';
import {url} from '../helpers';
import {useIsFocused} from '@react-navigation/native';
import {storage} from '../helpers/storage';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalMethod} from '../utils/GlobalMethod';
import {addItemToCart} from '../redux/actions/SaleAction.js';

const SearchAssignment = ({navigation}: any) => {
  const user = useSelector(e => e.user.user);
  const cart = useSelector(e => e.cart);
  // console.log(cart);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [product, setProduct] = useState([]);
  const isFocused = useIsFocused();
  const [page, setPage] = useState(1);

  // const isStock = useMemo(()=>{
  //     return selectedStockType === 'allStock';
  // },[selectedStockType])
  useEffect(() => {
    fetchproduct();
    return () => {
      setProduct([]);
    };
  }, [isStocks]);
  const fetchproduct = async () => {
    fetch(
      'https://api-dev.switchafrica.io/inventory/api/v1/Product/?page=1&size=10',
      {
        headers: {
          credentials: 'include',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access}`,
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        return setProduct(json.results);
      })
      .catch(error => console.error(error));
  };

  const [isStocks, setStocks] = useState('myStocks');

  const onChangeSearch = (query: any) => setSearchQuery(query);
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
            onPress={() => navigation.goBack()}
          />
          <Text style={{color: '#F6B100'}}>Search Products</Text>
        </View>
        <Button labelStyle={{color: '#F6B100', fontSize: 14}}>Cancel</Button>
      </View>
      <View>
        <Searchbar
          placeholder="Search by product name"
          placeholderTextColor={'#D5EAF1'}
          onChangeText={onChangeSearch}
          value={searchQuery}
          mode="view"
          icon={require('../assets/searchButtonIcon.png')}
          style={styles.searchBar}
          showDivider={false}
          inputStyle={styles.placeHolder}
          theme={{colors: {primary: '#D5EAF1'}}}
          iconColor="#2A677A"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Chip
          textStyle={
            isStocks == 'myStocks'
              ? styles.buttonTextSelected
              : styles.buttonText
          }
          onPress={() => setStocks('myStocks')}
          style={
            isStocks == 'myStocks' ? styles.buttonSelected : styles.buttonStyle
          }>
          My Stock
        </Chip>
        <Chip
          textStyle={
            isStocks == 'allStocks'
              ? styles.buttonTextSelected
              : styles.buttonText
          }
          style={
            isStocks == 'allStocks' ? styles.buttonSelected : styles.buttonStyle
          }
          onPress={() => setStocks('allStocks')}>
          All Stock
        </Chip>
      </View>
      {isStocks == 'allStocks' ? (
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderRadius: 15,
            marginVertical: 10,
            backgroundColor: '#012E3C',
            height: 500,
          }}>
          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({highlighted}) => (
                <View
                  style={[style.separator, highlighted && {marginLeft: 0}]}
                />
              ))
            }
            data={product}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight
                key={item.sku}
                onPress={() => {
                  if (item.quantity >= 1) {
                    dispatch(
                      addItemToCart({
                        id: item.id,
                        name: item.name,
                        sku: item.sku,
                        quantity: 1,
                        price: item.unit_price,
                        totalAmount: 1 * item.unit_price,
                        taxRate: 0,
                        costAmount: item.cost_price,
                        costAmount:
                          item.cost_price == null ? 0 : item.cost_price,
                        tax: GlobalMethod.calculateTax(item.unit_price, 0),
                        discount: 0,
                        stock: item.quantity,
                      }),
                    );
                    navigation.navigate('ProductsAdded', {
                      product: {
                        id: item.id,
                        name: item.name,
                        sku: item.sku,
                        quantity: 1,
                        price: item.unit_price,
                        costAmount:
                          item.cost_price == null ? 0 : item.cost_price,
                        totalAmount: 1 * item.unit_price,
                        taxRate: 0,
                        tax: GlobalMethod.calculateTax(item.unit_price, 0),
                        discount: 0,
                        stock: item.quantity,
                      },
                    });
                  } else {
                    console.log('Out the stock');
                  }
                }}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View>
                  <Text style={styles.itemNameStyle}>{item.name}</Text>
                  <Text style={styles.priceStyle}>{item.sku}</Text>
                  <Text style={styles.priceStyle}>{item.quantity}</Text>
                  <Text style={styles.priceStyle}>{item.unit_price}</Text>
                  <Divider
                    style={styles.dividerStyle}
                    theme={{colors: {primary: '#08485C'}}}
                  />
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
      ) : (
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderRadius: 15,
            marginVertical: 10,
            backgroundColor: '#012E3C',
            height: 500,
          }}>
          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({highlighted}) => (
                <View
                  style={[style.separator, highlighted && {marginLeft: 0}]}
                />
              ))
            }
            data={product}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight
                key={item.sku}
                onPress={() => {
                  if (item.quantity >= 1) {
                    dispatch(
                      addItemToCart({
                        id: item.id,
                        name: item.name,
                        sku: item.sku,
                        quantity: 1,
                        price: item.unit_price,
                        totalAmount: 1 * item.unit_price,
                        costAmount:
                          item.cost_price == null ? 0 : item.cost_price,
                        taxRate: 0,
                        tax: GlobalMethod.calculateTax(item.unit_price, 0),
                        discount: 0,
                        stock: item.quantity,
                      }),
                    );
                    navigation.navigate('ProductsAdded', {
                      product: {
                        id: item.id,
                        name: item.name,
                        sku: item.sku,
                        quantity: 1,
                        price: item.unit_price,
                        totalAmount: 1 * item.unit_price,
                        costAmount:
                          item.cost_price == null ? 0 : item.cost_price,
                        taxRate: 0,
                        tax: GlobalMethod.calculateTax(item.unit_price, 0),
                        discount: 0,
                        stock: item.quantity,
                      },
                    });
                  } else {
                    console.log('Out the stock');
                  }
                }}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View>
                  <Text style={styles.itemNameStyle}>{item.name}</Text>
                  <Text style={styles.priceStyle}>{item.sku}</Text>
                  <Text style={styles.priceStyle}>{item.quantity}</Text>
                  <Text style={styles.priceStyle}>{item.unit_price}</Text>
                  <Divider
                    style={styles.dividerStyle}
                    theme={{colors: {primary: '#08485C'}}}
                  />
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default SearchAssignment;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01232D',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  dividerStyle: {
    marginVertical: 10,
  },
  itemNameStyle: {
    color: '#D5EAF1',
    fontSize: 14,
  },
  priceStyle: {
    color: '#D5EAF1',
    fontSize: 10,
  },
  searchBar: {
    backgroundColor: '#012E3C',
    borderRadius: 15,
    height: 44,
    alignItems: 'center',
  },
  placeHolder: {
    color: '#D5EAF1',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  buttonText: {
    color: '#01232D',
  },
  buttonTextSelected: {
    color: '#F6B100',
  },
  buttonStyle: {
    backgroundColor: '#F6B100',
  },
  buttonSelected: {
    backgroundColor: '#2A677A',
  },
});
