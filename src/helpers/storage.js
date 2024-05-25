import {Platform} from 'react-native';
import {requests} from './apiClient';
import {url} from './config';
import {localStorage, localStorageKey} from '../stores';
const DEBUG = __DEV__;

class Store {
  constructor() {
    this.store = localStorage;
    this.languageKey = 'userLanguage';
    this.allNotificationsKey = 'allNotifications';
  }
  getLanguage(defaultLanguage = 'en') {
    const key = this.languageKey;
    return this.get(key) || defaultLanguage;
  }
  saveDeviceToken = async token => {
    const previousToken = this.getDeviceToken();
    if (token && previousToken !== token) {
      //do this check to help reduce unnecessary API calls
      // also update remote token if user is logged in
      const loggedUser = this.getUser();
      if (loggedUser) {
        const data = {
          user: loggedUser?.id,
          name: loggedUser?.username,
          type: Platform.OS,
          registration_id: token,
          device_id: loggedUser?.username,
        };

        // only catch the device token locally after having it saved remotely successfully
        const {ok, originalError: error} = await requests.post(
          url.Device,
          data,
        );
        ok && this.store.set('deviceToken', token);
        if (error) {
          if (error.data?.detail) {
            // cache token and do not attempt to save it again
            this.store.set('deviceToken', token);
          }
          DEBUG && console.log('Error saving token', error);
        }
      }
    }
  };

  setUser = user => {
    if (user?.pk && !user?.id) {
      user.id = user.pk;
    }
    this.set(localStorageKey.user, user);
    return user;
  };

  removeKey = key => {
    // checking if a specific key exists
    if (this.store.contains(key)) {
      return this.store.delete(key);
    }
    return false;
  };

  set = (k, v) => {
    if (v === undefined) {
      this.removeKey(k);
      return undefined;
    } else {
      return this.store.set(k, JSON.stringify(v));
    }
  };

  get = (k, parse = true) => {
    const v = this.store.getString(k);
    if (v && parse) {
      try {
        return JSON.parse(v);
      } catch (error) {
        return v;
      }
    }
    return v;
  };

  setItem = this.set;
  getItem = this.get;

  getUser = () => {
    const user = this.store.getString(localStorageKey.user);
    return user ? JSON.parse(user) : user;
  };

  getJWTToken = () => {
    return this.get(localStorageKey.jwtToken);
  };

  setJWTToken = value => {
    return this.set(localStorageKey.jwtToken, value);
  };

  getDeviceToken() {
    const key = localStorageKey.deviceToken;
    return this.store.getString(key);
  }
}

export const storage = new Store();
