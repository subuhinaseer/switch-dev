import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';

type QuestionPros = {
  ques: string;
};

const Questions = (props: QuestionPros) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
      }}>
      <Text style={styles.textStyle}>{props.ques}</Text>
      <IconButton
        icon={require('../assets/arrowIcon.png')}
        iconColor="#78ADBE"
      />
    </View>
  );
};

const FAQ = (navigation: any) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <IconButton
            icon={require('../assets/backArrowButton.png')}
            iconColor="#F6B100"
            size={20}
            onPress={() => {
              navigation.goBack()
            }}
          />
          <Text style={{color: '#F6B100', fontSize: 14, alignSelf: 'center'}}>
            FAQ
          </Text>
        </View>
        <View>
          <IconButton
            icon={require('../assets/bellIcon.png')}
            iconColor="#F6B100"
            size={20}
            onPress={() => navigation.navigate('Notifications')}
          />
        </View>
      </View>
      <Questions ques="Lorem Ipsum is simply dummy text" />
      <Divider
        theme={{colors: {primary: '#2A677A'}}}
        style={{marginHorizontal: 20}}
      />
      <Questions ques="Lorem Ipsum is simply dummy text" />
      <Divider
        theme={{colors: {primary: '#2A677A'}}}
        style={{marginHorizontal: 20}}
      />
      <Questions ques="Lorem Ipsum is simply dummy text" />
      <Divider
        theme={{colors: {primary: '#2A677A'}}}
        style={{marginHorizontal: 20}}
      />
      <Questions ques="Lorem Ipsum is simply dummy text" />
      <Divider
        theme={{colors: {primary: '#2A677A'}}}
        style={{marginHorizontal: 20}}
      />
      <Questions ques="Lorem Ipsum is simply dummy text" />
      <Divider
        theme={{colors: {primary: '#2A677A'}}}
        style={{marginHorizontal: 20}}
      />
      <Questions ques="Lorem Ipsum is simply dummy text" />
      <Divider
        theme={{colors: {primary: '#2A677A'}}}
        style={{marginHorizontal: 20}}
      />
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#01232D',
  },
  textStyle: {
    color: '#D5EAF1',
    fontSize: 14,
  },
});
