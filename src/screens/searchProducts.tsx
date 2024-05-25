import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Divider, IconButton, Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const SearchProducts = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: any) => setSearchQuery(query);
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
          <Text style={{color: '#F6B100'}}>Search Products</Text>
        </View>
        <Button labelStyle={{color: '#F6B100', fontSize: 14}}>Cancel</Button>
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
          paddingVertical: 20,
          paddingHorizontal: 30,
          borderRadius: 15,
          marginVertical: 10,
          backgroundColor: '#012E3C',
          height: 500,
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductsAdded');
            }}>
            <Text style={styles.itemNameStyle}>Britannia</Text>
            <Text style={styles.priceStyle}>Unit price - TZS 5000</Text>
          </TouchableOpacity>
          <Divider
            style={styles.dividerStyle}
            theme={{colors: {primary: '#08485C'}}}
          />
        </View>
        <View>
          <Text style={styles.itemNameStyle}>Britannia</Text>
          <Text style={styles.priceStyle}>Unit price - TZS 5000</Text>
          <Divider
            style={styles.dividerStyle}
            theme={{colors: {primary: '#08485C'}}}
          />
        </View>
        <View>
          <Text style={styles.itemNameStyle}>Britannia</Text>
          <Text style={styles.priceStyle}>Unit price - TZS 5000</Text>
          <Divider
            style={styles.dividerStyle}
            theme={{colors: {primary: '#08485C'}}}
          />
        </View>
        <View>
          <Text style={styles.itemNameStyle}>Britannia</Text>
          <Text style={styles.priceStyle}>Unit price - TZS 5000</Text>
          <Divider
            style={styles.dividerStyle}
            theme={{colors: {primary: '#08485C'}}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchProducts;

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
});
