import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Divider, TextInput} from 'react-native-paper';
import {useTranslation} from '../localization';
import {requests, url, utils} from '../helpers';
// import {useRootStore} from '../effects';
import Input from '../components/CustomInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from '../redux/actions/AuthAction';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';
import { colors } from '../theme';

const LogoContainer = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../assets/logoNew.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{color: '#F6B100', fontSize: 24, fontWeight: 'bold'}}>
          Mauzo
        </Text>
        <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
          Track
        </Text>
      </View>
      <View style={{flexDirection: 'row-reverse'}}>
        <Text style={{marginRight: 50, color: '#FFFFFF', fontSize: 10}}>
          by Switch
        </Text>
      </View>
    </View>
  );
};
export {LogoContainer};

const Dividers = () => {
  return <Divider style={styles.divider} />;
};
export {Dividers};

// type YellowTextProps = {
//   text: string,
// };
const YellowText = (props) => {
  return <Text style={styles.YellowText}>{props.text}</Text>;
};
export {YellowText};

// type ContentProps = {
//   text: string,
// };
const Content = (props) => {
  return <Text style={styles.content}>{props.text}</Text>;
};
export {Content};

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const [values, setValues] = useState({});
  const {t} = useTranslation();
  // const {auth, login} = useRootStore();
  const [errorMessage, setErrorMessage] = useState({});

  const setValue = name => value => {
    setValues({
      ...values,
      [name]: value,
    });
  }
  const onLogin = async () => {
    try {
      if (!values.username || !values.password) {
        utils.toast(t('Username or password is required'));
        return;
      }
      const loginCredential = {
              // username: 255672475563,
            username:  values.username.replace('+', ''),
              // password: 'sapna1620'
             password: values.password,
            };
      // const loginCredential = {
      //   username: values.username.replace('+', ''),
      //   password: values.password,
      // };
  
      const response = await fetch('https://api-dev.switchafrica.io/api/v1/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredential),
      });
  
      const data = await response.json();
  
      if (response.ok && data.access) {
        utils.toast(t('Logged in successfully'));
        dispatch(loginSuccess(data));
        navigation.replace('dashboard');
      } else {
        utils.toast(t('Failed to login, Incorrect username or password'));
      }
    } catch (error) {
      utils.toast(
        t('Unable to process your request at this time. Please try again later')
      );
      console.log(error,'i am error');
    }
  };
  

  // const onLogin = async () => {
  //   try {
  //     if (!values.username || !values.password) {
  //       utils.toast(t('Username or password is required'));
  //       return;
  //     }
  //     const loginCredntial = {
  //       username: 255672475563,
  //       //values.username.replace('+', ''),
  //       password: 'sapna1620'
  //       //values.password,
  //     };
  //     // dispatch(loginRequest());
  //     const response = await requests.post(url.auth.login, loginCredntial, {
  //       // withCredentials: false,
  //     });
  //     console.log(response.data.non_field_errors[0], response.status);
  //     if (response.ok && response.data.access) {
  //       utils.toast(t('Logged in successfully'));
  //       dispatch(loginSuccess(response.data));
  //       navigation.replace('dashboard');
  //     } else {
  //       utils.toast(t('failed to login, Incorrect username or password'));
  //     }
  //   } catch (error) {
  //     utils.toast(
  //       t(
  //         'Unable to process your request at this time. Please try again later',
  //       ),
  //     );
  //     console.log(error);
  //   }
  // }
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LogoContainer />
      {/* <Dividers /> */}
      {/* <YellowText text="Login Now" /> */}
      <View style={{paddingTop:25}}>
        
      </View>
      <View style={styles.InputPadding}>
        <Input
          keyboardType="phone-pad"
          label={t('Mobile Number')}
          placeholder={t('Enter mobile number')}
          onChangeText={setValue('username')}
          style={{color:'#fff'}}

        />
      </View>
      <View style={styles.InputPadding}>
        <Input
          label={'Username'}
          style={{color:'#fff'}}
          placeholder={'Enter username'}
          secureTextEntry={false}
          // mode={"flat"}
          placeholderColor={"#aaa"}
          textColor={colors.white}
          inputStyle={{
            backgroundColor: colors.background,
            color: colors.white,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#D5EAF1',
          }}
          onChangeText={setValue('user')}
        />
      </View>
      <View style={styles.InputPadding}>
        <Input
          label={'Password'}
          style={{color:'#fff'}}
          textColor={colors.white}
          placeholderColor={"#aaa"}
          inputStyle={{
            backgroundColor: colors.background,
            color: colors.white,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#D5EAF1',
          }}
          placeholder={'Enter password'}
          secureTextEntry={false}
          inputType={"password"}
          // mode={"flat"}
          onChangeText={setValue('password')}
        />
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.rememberMeRow}>
        <View style={{ borderWidth: 1, borderColor: '#000', height: 22, width: 22, borderRadius: 5,marginRight:10 }}>  
          <CheckBox style={{width:20,height:20}}   value={rememberMe} onValueChange={handleRememberMe} />
          </View>
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <Button
          textColor="#FFE296"
          style={styles.forgotPassword}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          Forgot Password
        </Button>
      </View>
      {/* <Button
        style={styles.signupText}
        mode="text"
        onPress={() => {
          navigation.navigate('Register');
        }}>
        Not yet registered? register now!
      </Button> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={onLogin}>
          <Text style={styles.update}>Log In</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.copyRightText}>Copy @ Switch 2023</Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01232D',
  //  paddingTop: 20,
  },
  logoContainer: {
    alignSelf: 'center',
    // marginTop: 30,
  },
  logo: {
    height: 48,
    width: 220,
    margin: 10,
  },
  divider: {
    marginHorizontal: 60,
    marginVertical: 10,
  },
  YellowText: {
    color: '#F6B100',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    // margin: 5,
  },
  content: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    margin: 5,
  },
  textContainer: {
    backgroundColor: '#012E3C',
    margin: 20,
  },
  passwordContainer: {
    backgroundColor: '#01232D',
    margin: 20,
  },
  forgotPassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 30,
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor:"red"
  },
  updateButton: {
    // flex: 1,
    alignSelf: 'center',
    maxHeight: 77,
    height:55,
    width: '90%',
    backgroundColor: '#F6B100',
    borderRadius: 5,
    // borderTopLeftRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
    // marginHorizontal:10
  },
  update: {
    color: '#01232D',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passwordPlaceholder: {
    backgroundColor: '#01232D',
    borderColor: '#D5EAF1',
    borderWidth: 1,
    height: 58,
    width: 313,
    borderRadius: 10,
    padding: 10,
    margin: 20,
    alignSelf: 'center',
  },
  signupText: {
    alignSelf: 'center',
    marginTop: 20,
  },
  copyRightText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize:11,
    // marginTop: 50,
    // paddingBottom: 10,
    paddingTop:5
  },
  outline: {
    borderRadius: 10,
  },
  InputPadding: {
    marginHorizontal: 15,
    marginBottom: 30,
    marginTop:10
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // height:15
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  rememberText:{
    color:'#FFE296'
  }
});
