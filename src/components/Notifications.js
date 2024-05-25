import {useEffect} from 'react';
import notifee from '@notifee/react-native';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../effects';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {storage} from '../helpers/storage';

function saveDeviceToken(token) {
  storage.saveDeviceToken(token);
}

const Notifications = () => {
  const {user} = useRootStore();

  const getDeviceToken = () => {
    if (Platform.OS === 'ios') {
      messaging().getAPNSToken().then(saveDeviceToken);
    } else {
      messaging().getToken().then(saveDeviceToken);
    }
  };

  useEffect(() => {
    const tokenRefresh = messaging().onTokenRefresh(saveDeviceToken);
    const messageReceived = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return () => {
      tokenRefresh();
      messageReceived();
    };
  }, []);
  useEffect(() => {
    if (user.id) {
      askPermission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const askPermission = async () => {
    const res = await notifee.requestPermission();
    getDeviceToken();
    return res;
  };
  return null;
};
export default observer(Notifications);
