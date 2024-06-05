import React, {useCallback, useMemo, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Chip, Divider, IconButton, Searchbar} from 'react-native-paper';
import {UnsecuredTextBox} from '../components/Inputs';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../components/AppButton'
import { colors } from '~/theme';
const CustomerAdded = ({route, navigation}: any) => {
  var customerExist = route.params;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor:colors.background,
          paddingVertical:10
          // backgroundColor:colors.primary
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center',}}>
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
              source={require('../assets/ellipse.png')}
          
              resizeMode="contain"
            />
            <Text style={styles.whiteText}>Add Product {'\n'} & Review</Text>
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
          // color: '#FFFFFF',
          color:colors.text,
          fontWeight: 'bold',
          fontSize: 14,
          marginTop: 40,
          marginLeft: 20,
        }}>
        Customer Details
      </Text>
      {/* <UnsecuredTextBox placeholder="Enter Name" /> */}
      <Chip
        onPress={() => {
          navigation.navigate('SearchCustomers');
        }}
        mode="outlined"
        textStyle={styles.chipText}
        theme={{colors: {primary: '#012E3C'}}}
        style={styles.chipStyle}>
        {customerExist !== undefined
          ? customerExist.customer.first_name +
            ' ' +
            customerExist.customer.last_name
          : 'Choose customer'}
      </Chip>
      <UnsecuredTextBox placeholder="11/05/2023" />
      {/* <UnsecuredTextBox placeholder="Order ID" /> */}
      <View style={styles.buttonContainer}>
        <AppButton  onPress={() => {
            navigation.navigate('AddProducts', {
              customer: customerExist.customer,
            });
          }} label={'Next'} />
        {/* <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            navigation.navigate('AddProducts', {
              customer: customerExist.customer,
            });
          }}>
          <Text style={styles.update}>Next</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default CustomerAdded;

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
    color:colors.grey,
    fontSize: 12,
    paddingTop: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
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
  chipText: {
    color:colors.text,
    // color: '#D5EAF1',
    fontSize: 17,
  },
  chipStyle: {
    // backgroundColor: '#012E3C',
    backgroundColor:'#eee',
    // borderColor: '#78ADBE',
    height: 48,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1.5,
    borderRadius: 10,
    justifyContent:'center'
  },
});
