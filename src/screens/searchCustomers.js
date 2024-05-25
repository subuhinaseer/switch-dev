import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Chip, Divider, IconButton, Searchbar} from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import {useTranslation} from '../localization';
import {url} from '../helpers';
import {useIsFocused} from '@react-navigation/native';
import {useFetchData} from '../effects';
import {useSelector, useDispatch} from 'react-redux';
import {GlobalMethod} from '../utils/GlobalMethod';
import {selectCustomer} from '../redux/actions/SaleAction';

const SearchCustomers = ({navigation}: any) => {
  const user = useSelector(e => e.user.user);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: any) => setSearchQuery(query);
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [requestId, setRequestId] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [searchQuery]);
  const fetchData = async () => {
    const result = await fetch(
      searchQuery.trim() == ''
        ? 'https://api-dev.switchafrica.io/crm/api/v1/Contact/?page=1&size=10'
        : `https://api-dev.switchafrica.io/crm/api/v1/Contact/?order_by=first_name&search=${searchQuery}`,
      {
        method: 'GET',
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
        console.log(error);
        return {
          result: 'failed to process this request Please try again later',
          isError: true,
        };
      });
    setData(result);
  };
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, [bottomSheetRef]);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, [bottomSheetRef]);

  const selectItem = item => {
    setSelectedItem(item);
    openBottomSheet();
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
            onPress={() => navigation.goBack()}
          />
          <Text style={{color: '#F6B100'}}>{t('Search Customers')}</Text>
        </View>
        <Button labelStyle={{color: '#F6B100', fontSize: 14}}>
          {t('Cancel')}
        </Button>
      </View>
      <View>
        <Searchbar
          placeholder="Search by customer name, Email Id"
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
      <View
        style={{
          borderWidth: 1,
          borderColor: '#F6B100',
          padding: 30,
          borderRadius: 15,
          marginVertical: 10,
          backgroundColor: '#012E3C',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: '#2A677A',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={require('../assets/customerIcon.png')}
              resizeMode="contain"
            />
          </View>
          <Text style={{color: '#D5EAF1', paddingHorizontal: 5}}>
            Customers
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 10,
          }}>
          <Text style={{color: '#F6B100', fontSize: 32, fontWeight: 'bold'}}>
            {data.result == undefined ? 0 : data.result.count}
          </Text>
          <Button
            buttonColor="#2A677A"
            style={{borderRadius: 4}}
            labelStyle={{color: '#F6B100'}}
            onPress={() => {
              navigation.navigate('AddCustomer');
            }}>
            {t('Add Customer').toUpperCase()}
          </Button>
        </View>
      </View>

      <FlatList
        data={data.result == undefined ? [] : data.result.results}
        renderItem={({item}) => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: '#FFFFFF', fontSize: 14}}>
                  {item.first_name} {item.last_name}
                </Text>
                <Text style={{color: '#FFFFFF', fontSize: 10}}>
                  {item.business_name}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button
                  style={styles.viewDetailButtonStyle}
                  labelStyle={styles.viewDetailButtonLabelStyle}
                  onPress={() => selectItem(item)}>
                  View Detail
                </Button>
                <Button
                  onPress={() => {
                    dispatch(selectCustomer(item));
                    navigation.navigate('CustomerAdded', {customer: item});
                  }}
                  labelStyle={styles.viewDetailButtonLabelStyle}
                  style={styles.createSalesButtonStyle}>
                  Create Sales
                </Button>
              </View>
            </View>
            <Divider />
          </View>
        )}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{backgroundColor: '#012E3C'}}>
        <View style={styles.bottomSheetMainContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.avatarBackground}>
                <Image
                  source={require('../assets/avatar.png')}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.nameStyle}>
                {selectedItem?.first_name} {selectedItem?.last_name}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <IconButton
                icon={require('../assets/editIcon.png')}
                iconColor="#AAD2DF"
                size={13}
              />
              <IconButton
                icon={require('../assets/crossButton.png')}
                iconColor="#AAD2DF"
                size={13}
                onPress={closeBottomSheet}
              />
            </View>
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={styles.textStyle}>
              Customer Name - {selectedItem?.first_name}{' '}
              {selectedItem?.last_name}
            </Text>
            <Text style={styles.textStyle}>
              Email Address - {selectedItem?.email}
            </Text>
            <Text style={styles.textStyle}>
              Mobile Number - {selectedItem?.mobile}
            </Text>
            <Text style={styles.textStyle}>
              Business Name - {selectedItem?.business_name}
            </Text>
            <Text style={styles.textStyle}>TIN - {selectedItem?.tin}</Text>
            <Text style={styles.textStyle}>
              Business Sector - {selectedItem?.business_sector?.name}
            </Text>
          </View>
          <Chip
            mode="flat"
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            onPress={() => {
              navigation.navigate('CustomerAdded', {customer: selectedItem});
            }}>
            Choose
          </Chip>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default SearchCustomers;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01232D',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  viewDetailButtonStyle: {
    borderWidth: 1,
    borderColor: '#2A677A',
    borderRadius: 5,
    marginRight: 10,
  },
  viewDetailButtonLabelStyle: {
    color: '#F6B100',
    fontSize: 10,
  },
  createSalesButtonStyle: {
    borderWidth: 1,
    borderColor: '#2A677A',
    borderRadius: 5,
    backgroundColor: '#2A677A',
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
  bottomSheetMainContainer: {
    flex: 1,
    backgroundColor: '#012E3C',
  },
  avatarBackground: {
    backgroundColor: '#2A677A',
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    alignSelf: 'center',
    marginRight: 10,
  },
  nameStyle: {
    color: '#D5EAF1',
    fontSize: 14,
    alignSelf: 'center',
  },
  textStyle: {
    color: '#D5EAF1',
    fontSize: 14,
    lineHeight: 30,
  },
  buttonStyle: {
    backgroundColor: '#F6B100',
    height: 77,
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonTextStyle: {
    color: '#01232D',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
