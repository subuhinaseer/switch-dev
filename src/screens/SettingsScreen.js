/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import Screen from '../components/Screen';
import {useTranslation} from '../localization';
import {Button, Divider, List, Surface, Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../effects';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../theme';
import FastImage from 'react-native-fast-image';
import {height, requests, url, utils, width} from '../helpers';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import HeaderNotification from '../components/HeaderNotification';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/actions/AuthAction';

const SettingsScreen = props => {
  const navigation = useNavigation();
  // const {user, auth, resetSubState} = useRootStore();
  const user = useSelector(e => e.user.user);
  console.log("USER FROM SETTINGS", user);
  const dispatch = useDispatch();
  const {t, setLanguage} = useTranslation();
  const [action, setAction] = useState();
  const [bottomActions, setBottomActions] = useState({buttons: []});

  const bottomSheetRef = useRef();
  const snapPoints = useMemo(
    () => [0.25 * height, 0.3 * height, 0.35 * height],
    [],
  );
  const closeBottomSheet = () => bottomSheetRef.current.close();

  const openBottomSheet = _action => {
    setAction(_action);
    switch (_action) {
      case 'logout':
        setBottomActions({
          title: t('Logout?'),
          subtitle: t(
            'Are you sure you want to logout? You will need to login using same phone to retrieve your data',
          ),
          buttons: [
            {
              textColor: colors.danger,
              icon: 'logout',
              mode: 'outlined',
              title: t('Yes'),
              onPress: onLogout,
              style: {width: 200},
            },
          ],
        });
        break;
      case 'inviteFriends':
        setBottomActions({
          title: t('Invite Friends'),
          subtitle: t('Share the download link with your friends'),
          buttons: [
            {
              buttonColor: colors.primary,
              icon: 'logout',
              mode: 'contained',
              title: t('Share Link'),
              onPress: () => {
                utils.share({
                  url: 'https://switchafrica.io',
                  title: t('Download MauzoTrack'),
                  message: t(
                    'You are invite to download MauzoTrack which is an easy way to manage multiple businesses',
                  ),
                });
              },
              style: {width: 200},
            },
          ],
        });
        break;
      case 'changeLanguage':
        setBottomActions({
          title: t('Change Language'),
          subtitle: '',
          buttons: [
            {
              textColor: colors.primary,
              mode: 'outlined',
              title: t('Swahili'),
              onPress: () => {
                setLanguage('sw');
                closeBottomSheet();
                utils.toast('Language was set to Swahili');
              },
              style: {width: 200},
            },
            {
              textColor: colors.primary,
              mode: 'outlined',
              title: t('English'),
              onPress: () => {
                setLanguage('en');
                closeBottomSheet();
                utils.toast('Language was set to English');
              },
              style: {width: 200},
            },
          ],
        });
        break;
      case 'deleteAccount':
        setBottomActions({
          title: t('Request to Delete Account'),
          subtitle: t('Are you sure you want to delete your account?'),
          buttons: [
            {
              title: t('Delete Account'),
              mode: 'contained',
              buttonColor: colors.danger,
              icon: 'delete',
              onPress: async () => {
                closeBottomSheet();
                await requests.post(url.User + 'delete_account/');
                Alert.alert(
                  t('Delete Account'),
                  t('The request to delete account was sent successfully'),
                );
              },
            },
          ],
        });
        break;
    }
    bottomSheetRef.current.snapToIndex(2);
  };
  const renderBackdrop = useCallback(
    _props => (
      <BottomSheetBackdrop
        {..._props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const logoutBtn = () => {
    openBottomSheet('logout');
  };
  const onLogout = async () => {
    dispatch(logout());
    if (navigation) {
      // navigation.navigate('OnBoarding3', { screen: 'Login' });
      navigation.navigate('LogIn')
    }
    closeBottomSheet();
  };

  const data = [
    {
      title: t('Settings'),
      icon: require('../assets/settingIcon.png'),
      menu: [
        {
          title: t('Reset Password'),
          onPress: () => navigation.navigate('AppLock'),
        },
        {
          title: t('App Lock'),
          onPress: () => navigation.navigate('AppLock'),
        },
        {
          title: t('Notifications'),
          onPress: () => navigation.navigate('Notifications'),
        },
        {
          title: t('Change Language'),
          onPress: () => openBottomSheet('changeLanguage'),
        },
      ],
    },
    {
      title: t('Help & Support'),
      icon: require('../assets/help&supportIcon.png'),
      menu: [
        {
          title: t('FAQ'),
          onPress: () =>
            navigation.navigate('Web', {uri: url.faq, title: t('FAQ')}),
        },
        {
          title: t('Call Us'),
          onPress: () => Linking.openURL('tel:+255123456789'),
        },
        {
          title: t('Chat with Us'),
          onPress: () => Linking.openURL('tel:+255123456789'),
        },
        {
          title: t('Delete Account'),
          onPress: () => openBottomSheet('deleteAccount'),
        },
      ],
    },
    {
      title: t('About Us'),
      icon: require('../assets/aboutUsIcon.png'),
      menu: [
        {
          title: t('About MauzoTrack'),
          onPress: () =>
            navigation.navigate('Web', {
              uri: url.about,
              title: t('About MauzoTrack'),
            }),
        },
        {
          title: t('Privacy Policy'),
          onPress: () =>
            navigation.navigate('Web', {
              uri: url.privacy,
              title: t('Privacy Policy'),
            }),
        },
        {
          title: t('Invite Friends'),
          onPress: () => {
            openBottomSheet('inviteFriends');
          },
        },
      ],
    },
    {
      title: t('Logout'),
      icon: require('../assets/logoutIcon.png'),
      onPress: logoutBtn,
    },
  ];
  const avatar = useMemo(() => {
    if (user && user.avatar) {
      return { uri: user.avatar };
    } else {
      return require('../assets/images/logo.png'); 
    }
  }, [user]);

  // Use conditional logic to handle cases where userName is null
  const userName = useMemo(() => {
    if (user) {
      first_name = user.first_name || user.business_name || '';
      console.log("FIRST NAME", first_name)
      return first_name;
    } else {
      return ''; // Default value if user is null
    }
  }, [user]);

  // Use conditional logic to handle cases where email is null
  const email = useMemo(() => {
    if (user) {
      user_email = user.email || user.username || ''; 
      console.log("EMAIL", user_email)
      return email
    } else {
      return ''; // Default value if user is null
    }
  }, [user]);

  return (
    <Screen>
      <HeaderNotification title={t('Settings')} />
      <FlatList
        data={data}
        ListHeaderComponent={
          <Surface style={styles.headerContainer}>
            <List.Item
              onPress={() => navigation.navigate('EditProfile')}
              left={() => <FastImage source={avatar} style={styles.avatar} />}
              title={
                <Text style={{color: colors.secondary}}>
                  {userName}
                </Text>
              }
              description={
                <Text style={{color: colors.secondary}}>
                   {email}
                </Text>
              }
              right={() => (
                <SimpleLineIcons
                  color={colors.secondary}
                  style={styles.center}
                  name="pencil"
                  size={18}
                />
              )}
            />
          </Surface>
        }
        renderItem={({item, index}) => <MenuItem item={item} />}
      />
      <BottomSheet
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}>
        <View style={[styles.center, styles.bottomSheetContainer]}>
          <Text style={styles.defaultLineSpacing}>{bottomActions.title}</Text>
          {bottomActions.subtitle && (
            <Text style={styles.defaultLineSpacing}>
              {bottomActions.subtitle}
            </Text>
          )}
          <Divider style={styles.w100} />
          {bottomActions.buttons?.map((button, index) => (
            <Button
              {...button}
              key={index}
              style={[styles.bottomButton, button.style]}>
              {button.title}
            </Button>
          ))}
        </View>
      </BottomSheet>
    </Screen>
  );
};
const MenuItem = ({item, index}) => {
  const {title, menu, onPress, icon} = item;
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <List.Item
        left={props => <List.Icon {...props} icon={icon} color="#2A677A" />}
        onPress={() => (onPress ? onPress() : setIsExpanded(!isExpanded))}
        title={<Text style={styles.title}>{title}</Text>}
        description={
          isExpanded ? (
            <View style={styles.description}>
              {menu.map((m, i) => (
                <Pressable key={i} onPress={m.onPress}>
                  <Text style={styles.subMenu}>{m.title}</Text>
                </Pressable>
              ))}
            </View>
          ) : null
        }
        right={_props => (
          <SimpleLineIcons
            style={styles.center}
            name={isExpanded ? 'arrow-up' : 'arrow-right'}
          />
        )}
      />
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.primary,
  },
  flex1: {
    flex: 1,
  },
  w100: {width},
  bottomButton: {marginTop: 10, borderRadius: 10},
  description: {
    fontWeight: 'bold',
    paddingTop: 10,
  },
  subMenu: {
    marginVertical: 5,
    color: colors.primary,
  },
  center: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: colors.white,
    borderWidth: 1,
  },
  defaultLineSpacing: {
    paddingVertical: 10,
  },
  headerContainer: {
    backgroundColor: colors.backgroundColor2,
    paddingTop: 20,
    paddingLeft: 10,
    marginVertical: 5,
  },
  bottomSheetContainer: {
    padding: 20,
  },
});

export default observer(SettingsScreen);
