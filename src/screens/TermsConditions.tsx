import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';

const TermsNCondition = ({navigation}:any) => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon={require('../assets/backArrowButton.png')}
            iconColor="#F6B100"
            size={19}
            onPress={()=>{navigation.goBack()}}
          />
          <Text style={styles.termsNConditionStyle}>Terms & Condition</Text>
        </View>
        <IconButton
          icon={require('../assets/bellIcon.png')}
          iconColor="#F6B100"
          size={19}
          onPress={()=>{navigation.navigate('Notifications')}}
        />
      </View>
      <Text style={styles.mainTextStyle}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </Text>
      <Text style={styles.mainTextStyle}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </Text>
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

export default TermsNCondition;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01232D',
    paddingTop: 20,
  },
  termsNConditionStyle: {
    color: '#F6B100',
    fontSize: 14,
  },
  mainTextStyle: {
    color: '#D5EAF1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    lineHeight: 20,
  },
});
