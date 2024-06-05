import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import { colors } from '~/theme';

export const NotificationContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.notificationText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </Text>
    </View>
  )
};

const Notifications = (props: any) => {
  const {navigation} = props || {};
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container1}>
        <View style={styles.backArrowContainer}>
          <IconButton
            icon={require('../assets/backArrowButton.png')}
            size={20}
            iconColor="#F6B100"
            onPress={()=>navigation.goBack()}
          />
          <Text style={styles.textStyle}>Notifications</Text>
        </View>
        <View>
          <IconButton
            icon={require('../assets/bellIcon.png')}
            iconColor="#F6B100"
            size={20}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
      <NotificationContent />
      <NotificationContent />
      <NotificationContent />
      <NotificationContent />
    </View>
  );
};
export default Notifications;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor:colors.background,
    paddingTop: 50,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
    backgroundColor:colors.background,
    marginBottom:10,
  },
  backArrowContainer: {
    flexDirection: 'row',
  },
  textStyle: {
    alignSelf: 'center',
    color: '#F6B100',
    fontSize: 14,
  },
  container: {
    backgroundColor: '#012E3C',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal:12,
    paddingVertical:4,
    flexDirection: 'row',
  },
  circle: {
    backgroundColor: '#2BC871',
    height: 10,
    width: 10,
    borderRadius: 50,
    alignSelf: 'center',
    marginLeft: 5,
  },
  notificationText: {color: '#FFFFFF', margin: 10},
});
