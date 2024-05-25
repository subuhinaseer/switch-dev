/* eslint-disable react-native/no-inline-styles */

import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Avatar, IconButton, List} from 'react-native-paper';
import {useRootStore} from '../effects';
import {requests, url} from '../helpers';
import {useTranslation} from '../localization';
import ProfileScreen from './Profile/ProfileScreen';
import SettingsScreen from './SettingsScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

type BackNBell = {
  text: string;
};

export const BackNBell = (props: BackNBell) => {
  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.backArrowContainer}>
        <IconButton
          icon={require('../assets/backArrowButton.png')}
          size={20}
          iconColor="#F6B100"
        />
        <Text style={styles.textStyle}>{props.text}</Text>
      </View>
      <View>
        <IconButton
          icon={require('../assets/bellIcon.png')}
          iconColor="#F6B100"
          size={20}
        />
      </View>
    </SafeAreaView>
  );
};

export const AvatarEdit = () => {
  const navigation = useNavigation();
  const {user} = useRootStore();
  const {avatar, first_name, email, business_name, username} = user;

  return (
    <SafeAreaView style={styles.avatarEditMainContainer}>
      <View style={{flexDirection: 'row'}}>
        <Avatar.Image
          source={
            avatar ? {uri: avatar} : require('../assets/avatarProfilePhoto.png')
          }
          size={31}
          style={{alignSelf: 'center'}}
        />
        <View style={{paddingLeft: 7}}>
          <Text style={styles.avatarText}>{first_name || business_name}!</Text>
          <Text style={styles.avatarText}>{email}</Text>
        </View>
      </View>
      <IconButton
        icon={require('../assets/editIcon.png')}
        size={13}
        iconColor="#AAD2DF"
        onPress={() => {
          navigation.navigate('EditProfile');
        }}
      />
    </SafeAreaView>
  );
};

const Profile = ({navigation}: any) => {
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  const user = useSelector(e => e.user.user);
  console.log(user);
  const {t} = useTranslation();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const {data, ok} = await requests.get(url.user);
    console.log(data);
    if (ok) {
      user?.update(data);
    }
  };

  return (
    // <SafeAreaView>
    <SettingsScreen />
    // </SafeAreaView>
  );
};
export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01232D',
    paddingTop: 20,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backArrowContainer: {
    flexDirection: 'row',
  },
  textStyle: {
    alignSelf: 'center',
    color: '#F6B100',
    fontSize: 14,
  },
  container2: {
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#012E3C',
  },
  avatarEditMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  avatarText: {
    color: '#F6B100',
    fontSize: 14,
    padding: 3,
  },
  listContainer: {
    backgroundColor: '#012E3C',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  listStyle: {
    backgroundColor: '#012E3C',
  },
  listTitleStyle: {
    color: '#F6B100',
    fontSize: 14,
  },
  listItemTitleStyle: {
    color: '#FFE296',
    fontSize: 14,
  },
});
