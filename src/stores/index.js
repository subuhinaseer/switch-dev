import {MMKV} from 'react-native-mmkv';
export const localStorage = new MMKV();
export const localStorageKey = {
  language: 'preference.language',
  user: 'auth.user',
  deviceToken: 'device.token',
  jwtToken: 'auth.jwt.token',
  navigationState: 'navigation.state',
};
