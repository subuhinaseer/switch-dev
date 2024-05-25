import React from 'react';
import Login from '../screens/login';
import OnBoarding1 from '../screens/onBoarding1';
import OnBoarding2 from '../screens/onBoarding2';
import OnBoarding3 from '../screens/onBoarding3';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchCustomers from '../screens/searchCustomers';
import CustomerAdded from '../screens/customerAdded';
import AddProducts from '../screens/addProducts';
import ReviewOrder from '../screens/reviewOrder';
import AddPayment from '../screens/addPayment';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ProductsAdded from '../screens/productsAdded';
import ProductsAdded2 from '../screens/productsAdded2';
import ResetPassword from '../screens/resetPassword';
import ResetPassword2 from '../screens/resetPassword2';
import SearchAssignment from '../screens/searchAssignment';
import Register from '../screens/register';
import Profile from '../screens/profile';
// import {useRootStore} from '../effects';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WebScreen from '../screens/WebScreen';
import DashboardScreen from '../screens/HomeScreen/DashboardScreen';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();

import AsyncStorage from '@react-native-async-storage/async-storage';
export function AppNavigator() {
  const user = useSelector(e => e.user);
  console.log(user);
  if (user.user != null) {
    const access = user != null ? user.user.access : '';
    const auth = user != null ? {access} : '';
  }
  const renderBoardingScreen = async () => {
    switch (AsyncStorage.getItem('viewedBoarding')) {
      case 1:
        return 'OnBoarding1';
      case 2:
        return 'OnBoarding2';
      case 3:
        return 'OnBoarding3';
      case 4:
        return 'LogIn';
      default:
        return 'OnBoarding1';
    }
  };
  // const rootStore = useRootStore();

  return (
    <Stack.Navigator
      initialRouteName={renderBoardingScreen()}
      screenOptions={{
        headerShown: false,
        navigationBarColor: 'white',
      }}>
      <Stack.Screen name="OnBoarding1" component={OnBoarding1} />
      <Stack.Screen name="OnBoarding2" component={OnBoarding2} />
      <Stack.Screen name="OnBoarding3" component={OnBoarding3} />

      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="dashboard" component={DashboardScreen} />
      <Stack.Screen name="App" component={BottomTabNavigator} />
      <Stack.Screen name="SearchCustomers" component={SearchCustomers} />
      <Stack.Screen name="AddProducts" component={AddProducts} />
      <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
      <Stack.Screen name="CustomerAdded" component={CustomerAdded} />
      <Stack.Screen name="SearchAssignment" component={SearchAssignment} />
      <Stack.Screen name="ProductsAdded" component={ProductsAdded} />
      <Stack.Screen name="ProductsAdded2" component={ProductsAdded2} />
      <Stack.Screen name="ReviewOrder" component={ReviewOrder} />
      <Stack.Screen name="AddPayment" component={AddPayment} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ResetPassword2" component={ResetPassword2} />

      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Web" component={WebScreen} />
    </Stack.Navigator>
  );
}
