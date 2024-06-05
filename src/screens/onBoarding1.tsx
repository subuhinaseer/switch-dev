import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const OnBoarding1 = ({navigation}: any) => {
  const [viewedBoarding, setViewedBoarding] = React.useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* <SkipButton skipPress = {navigation.navigate('OnBoarding3')}/> */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={async () => {
          await AsyncStorage.setItem('viewedBoarding', '3');
          navigation.replace('OnBoarding3');
        }}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Image
        source={require('../assets/MainIllustration.png')}
        resizeMode="contain"
        style={styles.image}
      />
      {/* <Container nextPress = {navigation.navigate('OnBoarding2')} content = "Track Your Sales The Smart{'\n'}Way With Switch Mauzo"/> */}
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Text style={styles.text}>Access our financing</Text>
          <Text style={styles.text}>solutions to grow your </Text>
          <Text style={styles.text}>Business</Text>
          {/* Track Your Sales The Smart{'\n'}Way With Switch Mauzo */}
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={async () => {
            await AsyncStorage.setItem('viewedBoarding', '1');
            navigation.replace('OnBoarding2');
          }}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding1;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#012E3C', paddingTop: 20},
  image: {
    // height: 306,
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
  skipButton: {
    backgroundColor: '#012E3C',
    borderColor: '#F6B100',
    borderRadius: 10,
    margin: 20,
    maxWidth: 96,
    maxHeight: 48,
    width: 96,
    height: 48,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  skipText: {
    color: '#F6B100',
    fontSize: 18,
    fontWeight: 'bold',
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
