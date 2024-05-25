import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Divider, TextInput} from 'react-native-paper';
import { Content, Dividers, LogoContainer, YellowText } from './login';

const Box = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 40,
      }}>
      <TextInput style={styles.textInput} />
      <TextInput style={styles.textInput} />
      <TextInput style={styles.textInput} />
      <TextInput style={styles.textInput} />
      <TextInput style={styles.textInput} />
      <TextInput style={styles.textInput} />
    </View>
  );
};
export {Box};

const ResetPassword = ({navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      <LogoContainer />
      <Dividers />
      <YellowText text="Reset Password" />
      <Text style={styles.otp}>Enter OTP</Text>
      <Content text={"A 6-Digit code has been sent to{'\n'}9*******90"} />
      <View>
        <Box />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 150,
        }}>
        <Text style={{color: '#FFFFFF', fontSize: 14}}>
          Didn't recieve OTP?
        </Text>
        <Button textColor="#F6B100">Resend OTP</Button>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.logInButton}
          onPress={() => {
            navigation.navigate('ResetPassword2');
          }}>
          <Text style={styles.logIn}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ResetPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01232D',
    paddingTop: 20,
  },
  otp: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    margin: 5,
  },
  textInput: {
    backgroundColor: '#012E3C',
    borderColor: '#D5EAF1',
    borderWidth: 1,
    borderRadius: 5,
    height: 48,
    width: 42,
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
