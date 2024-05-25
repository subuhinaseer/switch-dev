/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Image, StyleSheet, View} from 'react-native';
import Notifications from '../screens/notifications';
import HomeNavigator from './HomeNavigator';
import SalesNavigator from './SalesNavigator';
const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      // initialRouteName="Home"
      shifting={true}
      compact
      // labeled={false}
      // activeColor={colors.primary}
      // inactiveColor={colors.black}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <View style={styles.center}>
              <Image
                source={require('../assets/homeIcon.png')}
                resizeMode="contain"
                width={26}
                height={24}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Sales"
        component={SalesNavigator}
        options={{
          tabBarLabel: 'Create Sales',
          tabBarIcon: () => (
            <View style={styles.center}>
              <Image
                source={require('../assets/mysalesIcon.png')}
                resizeMode="contain"
                width={26}
                height={24}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: () => (
            <View style={styles.center}>
              <Image
                source={require('../assets/moreIcon.png')}
                resizeMode="contain"
                width={26}
                height={24}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {alignItems: 'center', justifyContent: 'center'},
  label: {
    fontSize: 12,
  },
});
