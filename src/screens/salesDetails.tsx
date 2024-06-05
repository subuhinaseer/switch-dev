import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import { colors } from '~/theme';

type DetailsProps = {
  customerName: string;
  companyName: string;
  totalAmount: string;
};

const Paid = () => {
  return (
    <View style={styles.paidStyle}>
      <Text style={{textAlign: 'center', color: '#FFFFFF',fontWeight:'600'}}>Paid</Text>
    </View>
  );
};

const UnPaid = () => {
  return (
    <View style={styles.unpaidStyle}>
      <Text>Unpaid</Text>
    </View>
  );
};

type ItemData = {
  productName: string;
  qty: string;
  unitPrice: string;
  sellingPrice: string;
};

const DATA: ItemData[] = [
  {
    productName: 'Biscuits Wheat',
    qty: '10',
    unitPrice: '200',
    sellingPrice: '2000',
  },
  {
    productName: 'Biscuits Wheat',
    qty: '10',
    unitPrice: '200',
    sellingPrice: '2000',
  },
  {
    productName: 'Biscuits Wheat',
    qty: '10',
    unitPrice: '200',
    sellingPrice: '2000',
  },
  {
    productName: 'Biscuits Wheat',
    qty: '10',
    unitPrice: '200',
    sellingPrice: '2000',
  },
  {
    productName: 'Biscuits Wheat',
    qty: '10',
    unitPrice: '200',
    sellingPrice: '2000',
  },
];

type ItemProps = {
  productName: string;
  qty: string;
  unitPrice: string;
  sellingPrice: string;
};

const Item = (props: ItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
      }}>
      <Text style={styles.itemStyle}>{props.productName}</Text>
      <Text style={styles.itemStyle}>{props.qty}</Text>
      <Text style={styles.itemStyle}>TZS {props.unitPrice}</Text>
      <Text style={styles.itemStyle}>TZS {props.sellingPrice}</Text>
    </View>
  );
};

const DetailsBox = (props: DetailsProps) => {
  return (
    <View style={{margin: 12}}>
      <View
        style={{
          backgroundColor: '#2A677A',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          padding:10
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            // paddingHorizontal:10
          }}>
          <View style={{flexDirection: 'row'}}>
            {Paid ? <Paid /> : <UnPaid />}
            <View style={{marginLeft:10}}>
              <Text style={styles.customerNameStyle}>{props.customerName}</Text>
              <Text style={styles.companyNameStyle}>{props.companyName}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.customerNameStyle}>
              TZS {props.totalAmount}
            </Text>
            <Text style={styles.companyNameStyle}>Cash</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#012E3C',
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          paddingBottom: 10,
          paddingHorizontal:10
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text style={styles.attributesStyle}>Product Name</Text>
          <Text style={styles.attributesStyle}>Qty.</Text>
          <Text style={styles.attributesStyle}>Unit Price</Text>
          <Text style={styles.attributesStyle}>Selling Price</Text>
        </View>
        <Divider style={{marginHorizontal: 10}} />
        <ScrollView>
          <Item
            productName="Biscuits"
            qty="10"
            unitPrice="1200"
            sellingPrice="30"
          />
          <Item
            productName="Biscuits"
            qty="10"
            unitPrice="1200"
            sellingPrice="30"
          />
          <Item
            productName="Biscuits"
            qty="10"
            unitPrice="1200"
            sellingPrice="30"
          />
          <Item
            productName="Biscuits"
            qty="10"
            unitPrice="1200"
            sellingPrice="30"
          />
          <Item
            productName="Biscuits"
            qty="10"
            unitPrice="1200"
            sellingPrice="30"
          />
          <Item
            productName="Biscuits"
            qty="10"
            unitPrice="1200"
            sellingPrice="30"
          />
        </ScrollView>
      </View>
    </View>
  );
};

const SalesDetails = ({navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // marginHorizontal: 20,
          backgroundColor:colors.background,
          paddingVertical:10
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
          <Text style={styles.salesDetailsStyle}>Sales Details</Text>
        </View>
        <IconButton
          icon={require('../assets/bellIcon.png')}
          iconColor="#F6B100"
          size={19}
          onPress={() => {
            navigation.navigate('Notifications');
          }}
        />
      </View>
      <DetailsBox
        customerName="John Doe"
        companyName="XYZ Enterprize"
        totalAmount="12450"
      />
    </View>
  );
};

export default SalesDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#01232D',
  //  paddingTop: 50,
  },
  salesDetailsStyle: {
    color: '#F6B100',
    fontSize: 14,
  },
  paidStyle: {
    backgroundColor: '#2BC871',
    height: 20,
    width: 44,
    borderRadius: 20,
    alignItems:"center",
    alignSelf:"center",
    justifyContent:"center"
  },
  unpaidStyle: {
    backgroundColor: '#EA5455',
  },
  customerNameStyle: {
    color: '#F6B100',
    fontSize: 14,
  },
  companyNameStyle: {
    color: '#D5EAF1',
    fontSize: 12,
  },
  attributesStyle: {
    color: '#D5EAF1',
    fontWeight: 'bold',
    fontSize: 12,
  },
  itemStyle: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
