import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import { colors } from '~/theme';

const AboutUs = ({navigation}:any) => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon={require('../assets/backArrowButton.png')}
            iconColor="#F6B100"
            size={19}
            onPress={()=>{navigation.goBack()}}
          />
          <Text style={styles.aboutUsText}>About Us</Text>
        </View>
        <IconButton
          icon={require('../assets/bellIcon.png')}
          iconColor="#F6B100"
          size={19}
          onPress={()=>{navigation.navigate('Notifications')}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <Image
          source={require('../assets/logoNew.png')}
          resizeMode="contain"
          style={styles.logoStyle}
        />
        <Text style={styles.aboutUsText}>SwitchBook</Text>
      </View>
      <Text style={styles.mainTextStyle}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </Text>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#01232D',
   
    paddingTop: 20,
  },
  aboutUsText: {
    color: '#F6B100',
    fontSize: 14,
  },
  logoStyle: {
    marginRight: 10,
  },
  mainTextStyle: {
    color: '#D5EAF1',
    fontSize: 12,
    marginHorizontal: 20,
    marginTop: 40,
    lineHeight: 20,
  },
});
