import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  UnsecuredTextBox,
  SecuredTextBox,
} from '../components/Inputs';
import { Dividers, LogoContainer, YellowText } from './login';

const ResetPassword2 = ({navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      <LogoContainer />
      <Dividers />
      <YellowText text="Reset Password" />
      <UnsecuredTextBox placeholder="Enter OTP" />
      <UnsecuredTextBox placeholder="Enter New Password" />
      <SecuredTextBox placeholder="Confirm Password" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.logInButton}
          onPress={() => {
            navigation.navigate('LogIn');
          }}>
          <Text style={styles.logIn}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ResetPassword2;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01232D',
    paddingTop: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logInButton: {
    flex: 1,
    alignSelf: 'flex-end',
    maxHeight: 77,
    width: 375,
    backgroundColor: '#F6B100',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
  },
  logIn: {
    color: '#01232D',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
