import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {Avatar, Button, Divider, FAB, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTranslation} from '../../localization';
// import {useRootStore} from '~/effects';
import {url, utils} from '../../helpers';
import {useFetchData} from '../../effects';
import {useIsFocused} from '@react-navigation/native';
import dayjs from 'dayjs';
import {colors} from '../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const salesProps = {
  item: null,
  index: undefined
};

export const SalesSummary = props => {
  const {count} = props;
  return (
    <View style={styles.salesSummaryContainer}>
      <Text style={styles.salesSummaryText}>Sales Summary</Text>
      <View>
        <Text style={styles.dateText}>{dayjs().format('DD MM YYYY')}</Text>
        <Text style={styles.dateText}>{count} Entries</Text>
      </View>
    </View>
  );
};

export const SalesEntry = (props: SalesProps) => {
  const {item} = props;
  return (
    <View style={styles.salesLogBox}>
      <View style={styles.boxHeader}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.paidBox}>
            <Text style={{color: '#FFFFFF', fontSize: 10, textAlign: 'center'}}>
              {item.status}
            </Text>
          </View>
          <View style={{marginHorizontal: 5}}>
            <Text style={{color: '#F6B100', fontSize: 14}}>
              {item.contact?.first_name} {item.contact?.last_name}
            </Text>
            <Text style={{color: '#FFF', fontSize: 12}}>
              {item.contact?.business_name}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{color: '#F6B100', fontSize: 14}}>
            {item.total_amount_currency} {utils.formatNumber(item.total_amount)}
          </Text>
          <Text style={{color: '#FFFFFF', fontSize: 12}}>
            {item.payment_mode}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <Text>Amount Paid</Text>
        <Text>{utils.formatNumber(item.amount_paid)}</Text>
      </View>
      <Divider style={{marginHorizontal: 10}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <Text>Amount Due</Text>
        <Text>{utils.formatNumber(item.amount_due)}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 12, fontStyle: 'italic'}}>
          {dayjs(item.created_at).format('HH:mm A')}
        </Text>
        <IconButton icon={'chevron-right'} iconColor="#78ADBE" />
        <Text style={{fontSize: 12}}>ID: {item.id}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row-reverse',
          marginHorizontal: 10,
          marginBottom: 10,
        }}>
        <Text
          style={{
            textDecorationLine: 'underline',
            color: '#F6B100',
            fontSize: 12,
          }}>
          Edit
        </Text>
      </View>
    </View>
  );
};

const DashboardScreen = ({ navigation }: any) => {
  const user = useSelector(state => state.user);
  console.log("USER FROM DASHBOARD", user);
  // // Check if user is not null before accessing its properties
  // const avatar = user ? user.avatar : null;
  // const first_name = user ? user.first_name : null;

  // Accessing values from the Redux store
  const avatar = useSelector(state => state.user.avatar);
  const userName = useSelector(state => state.user.first_name || state.user.business_name || '');
  console.log(userName)
  const email = useSelector(state => state.user.email || state.user.username || '');

  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [requestId, setRequestId] = useState(0);

  const {res: data, meta = {}} = useFetchData({
    url: url.inventory.Order + '?order_by=-id&transaction_type=sale',
    meta: ['count', 'next', 'page'],
    // the request ID is used for refetching the transactions
    requestId: JSON.stringify({
      isFocused,
      page,
    }),
  });
  const {res: dashboard = {}} = useFetchData({
    url: url.inventory.Order + 'dashboard/?transaction_type=sale',
    path: '',
    // the request ID is used for refetching the transactions
    requestId: JSON.stringify({
      isFocused,
      requestId,
    }),
  });

  const onRefresh = () => {
    setRequestId(new Date().getTime());
    setPage(1);
  };
  // const onEndReached = info => {
  //   const {next, page: _page} = meta;
  //   if (next) {
  //     setPage(_page + 1);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container3}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={31}
              style={styles.avatar}
              source={
                avatar
                  ? {uri: avatar}
                  : require('../../assets/avatarProfilePhoto.png')
              }
            />
            <Text style={styles.avatarText}>Welcome back, {userName}!</Text>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity>
            <IconButton
              icon={require('../../assets/bellIcon.png')}
              onPress={() => {
                navigation.navigate('Notifications');
              }}
              iconColor="#F6B100"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* {meta?.count} */}
      <SalesSummary count={0} />
      <FlatList
        data={[]}
        refreshing={isLoading}
        onRefresh={onRefresh}
        // onEndReached={onEndReached}
        ListHeaderComponent={
          <View>
            <View style={styles.salesFigContainer}>
              <View style={styles.container4}>
                <View>
                  <Text style={{fontSize: 14, color: "#242322"}}>Total Sales</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      paddingTop: 2,
                    }}>
                    <Image
                      source={require('../../assets/salesGraph.png')}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: '#F6B100',
                        fontSize: 18,
                        paddingVertical: 0,
                        paddingHorizontal: 5,
                      }}>
                      TZS{' '}
                      {utils.formatNumber(
                        0,
                        // dashboard.transactions?.total_amount || 0,
                      )}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={{fontSize: 14, color: '#242322',}}>Product Sold</Text>
                  <View style={{flex: 1, flexDirection: 'row', paddingTop: 2}}>
                    <Image
                      source={require('../../assets/productIcon.png')}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: '#F6B100',
                        fontSize: 18,
                        paddingVertical: 0,
                        paddingHorizontal: 5,
                      }}>
                      {utils.formatNumber(
                        0, // dashboard.transactions?.products_quantity || 0,
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <Divider theme={{colors: {primary: '#F6B100'}}} />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    navigation.navigate('SalesDetail');
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: colors.link, marginHorizontal:8 }}>View Report</Text>
                  <Icon name="arrow-right" size={24} color={colors.link} />
          
                      
                  </View>


                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.yourSales}>
              <Text style={styles.yourSalesText}>Your Sales</Text>
            </View>
          </View>
        }
        renderItem={({item, index}) => <SalesEntry item={item} />}
        ListEmptyComponent={
          <View style={styles.center}>
            <View style={styles.center}>
              <Image
                source={require('../../assets/emptyPageImage.png')}
                resizeMode="contain"
                style={styles.image}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 14,
                  paddingVertical: 10,
                }}>
                Looks like you're yet to add your first sale!
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 12,
                  paddingVertical: 20,
                }}>
                Add your sales records to track transactions with ease
              </Text>
            </View>

            <Button
              onPress={() => {
                navigation.navigate('CustomerAdded');
              }}
              textColor="black"
              buttonColor="#F6B100"
              mode="contained">
              Create Sales
            </Button>
          </View>
        }
      />
      <FAB
        style={styles.fab}
        label="My Customers"
        onPress={() => {
          navigation.navigate('SearchCustomers');
        }}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#F6B100',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createSalesText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarText: {
    color: '#F6B100',
    alignItems: 'center',
    paddingLeft: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 13,
  },
  salesFigContainer: {
    borderWidth: 1,
    borderColor: '#F6B100',
    height: 140,
    width: 341,
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: 13,
  },
  container4: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  image: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  yourSales: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  yourSalesText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  center: {alignItems: 'center'},
  createSalesButton: {
    backgroundColor: '#F6B100',
    height: 25,
    width: 101,
    borderRadius: 5,
    justifyContent: 'center',
  },
  salesSummaryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  salesSummaryText: {
    color: "#242322",
    fontSize: 14,
    fontWeight: '500',
  },
  dateText: {
    color: "#242322",
    fontStyle: 'italic',
    fontSize: 10,
  },
  salesLogBox: {
    marginHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    borderColor: colors.primary,
    borderWidth: 0.5,
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2A677A',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    padding: 10,
  },
  paidBox: {
    backgroundColor: '#2BC871',
    borderRadius: 6,
    paddingHorizontal: 6,
    height: 19,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  fab: {
    backgroundColor: '#FFE296',
    alignSelf: 'flex-end',
    borderRadius: 18,
    height: 38,
    textAlign: 'center',
    paddingVertical: 0,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
});
