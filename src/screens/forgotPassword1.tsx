import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper';
import {
  UnsecuredTextBox,
} from '../components/Inputs';
import { Content, Dividers, LogoContainer, YellowText } from './login';

const ForgotPassword1 = ({navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      <LogoContainer />
      <Dividers />
      <YellowText text="Forgot Password" />
      <Content text="Enter your registered mobile number" />
      <UnsecuredTextBox placeholder="Enter Mobile Number" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.logInButton}
          onPress={() => {
            navigation.navigate('ForgotPassword2');
          }}>
          <Text style={styles.logIn}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ForgotPassword1;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01232D',
    paddingTop: 20,
  },
  divider: {
    marginHorizontal: 60,
    marginVertical: 10,
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
