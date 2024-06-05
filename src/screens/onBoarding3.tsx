import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const OnBoarding3 = ({navigation}) => {
  const screenHeight = Dimensions.get('window').height;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Image
        source={require('../assets/Onboarding3.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.container2}>
        {/* <View style={styles.container3}> */}
        <View style={[styles.container3, {maxHeight: screenHeight * 0.5}]}>
          <Text style={styles.text}>
            View a summary of your daily sales performance, and download simple
            reports
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.nextButton, {marginTop: screenHeight * 0.1}]}
          onPress={async () => {
            await AsyncStorage.setItem('viewedBoarding', '4');
            navigation.navigate('LogIn');
          }}>
          <Text style={styles.nextText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding3;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#012E3C', paddingTop: 20},
  skipButton: {
    backgroundColor: '#012E3C',
    borderColor: '#012E3C',
    borderRadius: 10,
    margin: 20,
    maxWidth: 96,
    maxHeight: 35,
    width: 96,
    height: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  skipText: {
    color: '#012E3C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height: '50%',
    width: 254.69,
    alignSelf: 'center',
  },
  container2: {
    backgroundColor: '#D5EAF1',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
  },
  container3: {
    maxHeight: 94,
    maxWidth: 279,
    alignSelf: 'center',
    marginTop: 70,
  },
  text: {
    color: '#01232D',
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  nextButton: {
    width: 298,
    height: 48,
    backgroundColor: '#F6B100',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 40,
    shadowColor: 'black',
  },
  nextText: {
    color: '#01232D',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
