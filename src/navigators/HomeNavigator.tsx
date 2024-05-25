import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../screens/HomeScreen/DashboardScreen';
import ForgotPassword1 from '../screens/forgotPassword1';
import ForgotPassword2 from '../screens/forgotPassword2';
import ChangePassword2 from '../screens/changePassword2';
import Profile from '../screens/profile';
import Notifications from '../screens/notifications';
import SalesDetails from '../screens/salesDetails';
import FAQ from '../screens/faq';
import AboutUs from '../screens/aboutUs';
import TermsNCondition from '../screens/TermsConditions';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: 'white',
      }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="SalesDetails" component={SalesDetails} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword1} />
      <Stack.Screen name="ForgotPassword2" component={ForgotPassword2} />
      <Stack.Screen name="ChangePassword" component={ChangePassword2} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="TermsConditions" component={TermsNCondition} />
    </Stack.Navigator>
  );
}
