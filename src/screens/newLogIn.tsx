import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const skipButton = () => {
  return (
    <View>
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

function HomeScreen({navigation}) {
  return (
    <View style={styles.container1}>
      <TouchableOpacity
        style={styles.skipButton}
        //onPress={}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Image
        source={require('../assets/MainIllustration.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Text style={styles.text}>Track Your Sales The Smart</Text>
          <Text style={styles.text}>Way With Switch Mauzo</Text>
        </View>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const NewLogIn = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NewLogIn;

//<View style={styles.container1}>
//<TouchableOpacity style={styles.skipButton}>
//<Text style={styles.skipText} >Skip</Text>
//</TouchableOpacity>
//</View>

const styles = StyleSheet.create({
  container1: {
    padding: 20,
    flex: 1,
    backgroundColor: '#042F3A',
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

  image: {
    height: 306,
    width: 254.69,
    alignSelf: 'center',
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
