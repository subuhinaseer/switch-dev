/* eslint-disable no-extend-native */
import _ from 'lodash';
import {Alert, Linking, Platform} from 'react-native';
import Share from 'react-native-share';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
import qs from 'query-string';
import dayjs from 'dayjs';
import codePush from 'react-native-code-push';
import Toast from 'react-native-toast-message';
import {I18n} from 'i18n-js';
import {requests, setAuthorization} from '../apiClient';
import {url, DEBUG} from '../config';
import {storage} from '../storage';
const i18n = new I18n({en: {}});
const customParseFormat = require('dayjs/plugin/customParseFormat');
const relativeTime = require('dayjs/plugin/relativeTime');
const duration = require('dayjs/plugin/duration');
const localeData = require('dayjs/plugin/localeData');
const isToday = require('dayjs/plugin/isToday');
const utc = require('dayjs/plugin/utc');
dayjs.extend(localeData); //for listing days/month
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(utc);

String.prototype.count = function (c) {
  var result = 0,
    i = 0;
  for (i; i < this.length; i++) {
    if (this[i] === c) {
      result++;
    }
  }
  return result;
};

String.prototype.trimChars = function (c) {
  var re = new RegExp('^[' + c + ']+|[' + c + ']+$', 'g');
  return this.replace(re, '');
};

String.prototype.replaceAll = function (search, replacement) {
  return this.split(search).join(replacement);
};

String.prototype.title = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

class Actions {
  constructor() {
    this.appState = 'active';
  }
  keyExtractor = (item, index) =>
    `item-${item.id || item.name || item.code || index}`;

  createFormData = ({body, fileFields = ['file']} = {}) => {
    const data = new FormData();
    Object.keys(body).forEach(key => {
      const value = body[key];
      if (value != null) {
        if (fileFields.includes(key)) {
          //only add if has fileName
          if (value.fileSize) {
            data.append(key, {
              name: value.fileName,
              uri:
                Platform.OS === 'android'
                  ? value.uri
                  : value.uri.replace('file://', ''),
              type: value.type,
              width: value.width,
              height: value.height,
            });
          }
        } else {
          data.append(key, value);
        }
      }
    });
    return data;
  };

  parseParams = params => {
    /*
    convert parsed strings to objects
    */
    if (typeof params === 'string') {
      try {
        return JSON.parse(params);
      } catch {
        return undefined;
      }
    } else {
      return params;
    }
  };

  getItemByID = (items, id) => {
    const itemIndex = items.map(i => i.id).indexOf(id);
    return items[itemIndex];
  };
  openURL = link => {
    Linking.canOpenURL(link)
      .then(supported => {
        if (!supported) {
          Alert.alert(
            'Link Not Supported',
            'Sorry! ' + link + ' is not supported',
          );
        } else {
          return Linking.openURL(link);
        }
      })
      .catch(err => Alert.alert('Link Error', 'Error ' + err));
  };

  // analytics
  logEvent = async (content_type, data) => {
    if (DEBUG || true) {
      return new Promise(resolve => {
        DEBUG &&
          console.log(`logEvent: ${content_type}=>${JSON.stringify(data)}`);
        resolve();
      });
    }
    // return await analytics().logEvent(content_type, data);
  };

  // analytics ends

  toast = (text1, text2, params = {}) => {
    /*
    only show toast if app is in foreground
    */
    if (this.appState === 'active') {
      return Toast.show({
        type: 'success',
        text1,
        text2,
        ...params,
      });
    }
  };

  setUser = user => {
    return storage.setUser(user);
  };

  getUser = () => {
    return storage.getUser();
  };

  logout = async () => {
    /*
      TODO: should leave some caches when logout? For now clear all
    */
    setAuthorization(undefined);
    storage.store.clearAll();
    try {
      await requests.post(url.logout, {}, {withCredentials: false});
    } catch (e) {}
    codePush.restartApp();
  };

  replaceAll = (str, a, b) => {
    return str?.replaceAll(a, b);
  };

  formatNumber = (n, precision = 0) => {
    if (parseFloat(n) >= 1000) {
      precision = 0;
    }
    return i18n.numberToRounded(n || 0, {
      precision,
      separator: '.',
      delimiter: ',',
    });
  };

  toHR = number =>
    number
      ? i18n.numberToHuman(number, {
          units: {unit: '', thousand: 'k', million: 'M', precision: 2},
        })
      : number;

  toPrecision(number, precision) {
    /*
     modified precision method
    */
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  formatDistance(value, unit, dp = 1) {
    const parsedValue = parseFloat(value);
    if (parsedValue >= 1e3) {
      return `${this.formatNumber(parsedValue / 1000, dp)} k${unit}`;
    }
    return `${this.formatNumber(parsedValue, dp)} ${unit}`;
  }

  formatDate = (date, format = 'lll') => {
    const table = {
      LT: 'h:mm A', //  8:02 PM
      LTS: 'h:mm:ss', // A  8:02:18 PM
      L: 'MM/DD/YYYY', //  08/16/2018
      LL: 'MMMM D, YYYY', //  August 16, 2018
      LLL: 'MMMM D, YYYY h:mm A', //  August 16, 2018 8:02 PM
      LLLL: 'dddd, MMMM D, YYYY h:mm A', //  Thursday, August 16, 2018 8:02 PM
      l: 'M/D/YYYY', //  8/16/2018
      ll: 'MMM D, YYYY', //  Aug 16, 2018
      lll: 'MMM D, YYYY h:mm A', //  Aug 16, 2018 8:02 PM
      llll: 'ddd, MMM D, YYYY h:mm A', //Thu, Aug 16, 2018 8:02 PM
    };
    return dayjs(date).format(table[format] || format);
  };

  timeFromNow = (date, {absolute = false, format = undefined} = {}) => {
    return format
      ? dayjs(date, format).fromNow(absolute)
      : dayjs(date).fromNow(absolute);
  };
  calculateDistance = (cord1, cord2) => {
    /**
     *  calculate distance between two points and return distance in km
     */
    if (cord1.lat === cord2.lat && cord1.lng === cord2.lng) {
      return 0;
    }

    const radlat1 = (Math.PI * cord1.lat) / 180;
    const radlat2 = (Math.PI * cord2.lat) / 180;

    const theta = cord1.lng - cord2.lng;
    const radtheta = (Math.PI * theta) / 180;

    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
      dist = 1;
    }

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; //convert miles to km

    return dist;
  };

  cmpVersions = (a, b) => {
    /*
        https://stackoverflow.com/questions/6832596/how-to-compare-software-version-number-using-js-only-number
        Return values:
        - a number < 0 if a < b
        - a number > 0 if a > b
        - 0 if a = b
        */
    let i, diff;
    let regExStrip0 = /(\.0+)+$/;
    let segmentsA = a.replace(regExStrip0, '').split('.');
    let segmentsB = b.replace(regExStrip0, '').split('.');
    let l = Math.min(segmentsA.length, segmentsB.length);

    for (i = 0; i < l; i++) {
      diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
      if (diff) {
        return diff;
      }
    }
    return segmentsA.length - segmentsB.length;
  };

  uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v?.toString(16);
    });
  };

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  lettersToNumber = str => {
    /*
          source: https://stackoverflow.com/questions/22624379/how-to-convert-letters-to-numbers-with-javascript
        */
    var out = 0,
      len = str.length;
    for (var pos = 0; pos < len; pos++) {
      out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
    }
    return out;
  };

  toNumber = name => {
    /*
          change letters to numbers
        */
    return this.lettersToNumber(name);
  };

  getObject = (_obj, path, defaultValue = undefined) => {
    let obj = _.clone(_obj, true);
    if (!path) {
      return obj;
    }
    if (obj == null) {
      return defaultValue;
    }
    path = `${path}`.split('.');
    var current = obj;
    while (path.length) {
      if (typeof current !== 'object' || typeof path !== 'object') {
        return defaultValue;
      }

      if (!path || !current) {
        return current;
      }
      current = current[path.shift()];
    }
    if (current == null) {
      current = defaultValue;
    }
    return current;
  };

  createObject = (obj, path = null, value = null) => {
    if (path == null) {
      //then shift the variables
      obj = {};
      path = obj;
      value = path;
    }
    if (!obj) {
      obj = {};
    }
    path = typeof path === 'string' ? path.split('.') : path;
    let current = obj;
    while (path.length > 1) {
      const [head, ...tail] = path;
      path = tail;
      if (!current[head]) {
        current[head] = {};
      }
      current = current[head];
    }
    current[path[0]] = value;
    return obj;
  };

  getRandomInt = (min = 1, max = 100000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  round = (value, decimals = 2) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  };

  getAvatarInitials = (textString, maxCount = 2) => {
    if (!textString) {
      return '';
    }
    const text = `${textString}`.trim();
    const textSplit = text.split(' ');
    if (textSplit.length <= 1) {
      return text.slice(0, maxCount).toUpperCase();
    }
    const initials =
      textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
    return initials.toUpperCase();
  };

  stringify = (data, params = {}) => {
    let link = qs.stringify(data, {
      arrayFormat: 'none',
      skipNull: true,
      skipEmptyString: true,
      ...params,
    });
    if (params.baseURL) {
      link = `${params.baseURL}${
        params.baseURL?.includes('?') ? '&' : '?'
      }${link}`;
    }
    return link;
  };

  parseURL = str => {
    let data = {};
    if (!str) {
      return data;
    }
    const index = str.search(/(\?)\w+/i);
    if (index > -1) {
      data = qs.parse(str.slice(index));
    } else {
      data = qs.parse(str);
    }
    return data;
  };

  toTitle = str => {
    return `${str}`.title();
  };

  distinct = (results, path) => {
    return _.uniqBy(results, obj => {
      return this.getObject(obj, path);
    });
  };

  extractDigits = (s, parse) => {
    /*
    return
    */
    if (!s) {
      return null;
    }
    const parsedValue = `${s}`
      ?.replaceAll(',', '')
      .match(/\d+\.?\d*/g)
      ?.join('');
    return parsedValue && parse ? parse(parsedValue) : parsedValue;
  };

  parse = v => {
    try {
      return JSON.parse(v);
    } catch (error) {
      return v;
    }
  };

  isNumeric = s => {
    //to simplify checking for phone number remove the leading +
    s = `${s}`; //cast s to string
    if (!s) {
      return false;
    }
    if (s && s.replace) {
      s = s.replace('+', '');
    }
    if (s == null) {
      return false;
    }
    s = s.trim();
    return /^\d+$/.test(s);
  };

  getNumeric = s => {
    if (!s) {
      return s;
    }
    var data = `${s}`.match(/\d+/g);
    if (data) {
      data = data.join('');
    }
    return data;
  };

  convertToSlug(text) {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  /*
    replace any string in format {variable with a variable string}
    */
  replaceVariablesFromString = (text, dic, variableWrappers = ['{{', '}}']) => {
    text = _.clone(text, true);
    if (!text) {
      return text;
    }
    var regexp = new RegExp(
      `[^${variableWrappers[0]}]+(?=${variableWrappers[1]})`,
      'gi',
    );
    let variables = `${text}`.match(regexp); //get the variable name from a regex
    if (Array.isArray(variables)) {
      //start replacing here. A list is returned
      variables.map(variable => {
        let variable_value = this.getObject(dic, variable, ''); //value can be null
        text = text.replaceAll(
          variableWrappers[0] + variable + variableWrappers[1],
          variable_value,
        );
      });
      variableWrappers.map(vw => {
        text = text.replaceAll(vw, '');
      });
      return text;
    } else {
      return text;
    }
  };

  replaceVariables = (arrayData, obj) => {
    let newArrayData = [];
    arrayData.map((element, index) => {
      let value = this.replaceVariablesFromString(element, obj);
      value = value !== 'undefined' ? value?.toString() : '-';
      if (value === ',') {
        value = '-';
      }
      newArrayData.push(value);
    });
    return newArrayData;
  };

  truncate = (text, size = 160, params = {}) => {
    return _.truncate(text, {
      length: size,
      separator: '...',
      ...params,
    });
  };

  share = async ({url, title, message, icon, callback} = {}) => {
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            // For sharing url with custom title.
            placeholderItem: {type: 'url', content: url},
            item: {
              default: {type: 'url', content: url},
            },
            subject: {
              default: title,
            },
            linkMetadata: {originalUrl: url, url, title},
          },

          {
            // For sharing text.
            placeholderItem: {type: 'text', content: message},
            item: {
              default: {type: 'text', content: message},
              message: null, // Specify no text to share via Messages app.
            },
            linkMetadata: {
              // For showing app icon on share preview.
              title: message,
            },
          },
        ],
      },
      default: {
        title,
        subject: title,
        message: `${message}`,
        url,
      },
    });

    return Share.open(options)
      .then(res => {
        callback && callback({res});
        // console.log("Results sharing ", res)
        // {"app": "com.google.android.apps.messaging/com.google.android.apps.messaging.ui.conversationlist.ShareIntentActivity", "message": "com.google.android.apps.messaging/com.google.android.apps.messaging.ui.conversationlist.ShareIntentActivity"}
      })
      .catch(errors => {
        // console.log("Error sharing ", error)
        // [Error: User did not share]
        callback && callback({errors});
      });
  };

  chunkString = (str, size) => {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    }

    return chunks;
  };

  showDirections = item =>
    this.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${
        item.lat || item.latitude
      },${item.lng || item.longitude}`,
    );

  requireLogin = (action, navigation) => {
    /*
        Todo: Implement a way to run next action on successful login
      */
    const loggedUser = this.getUser();
    if (!loggedUser) {
      if (navigation) {
        navigation.navigate('Login', {
          notification: {
            title: 'Login Required',
            body: 'Please login or register in order to proceed',
          },
        });
      } else {
        Alert.alert('Firewall', 'You must login to proceed');
      }
    } else {
      action();
    }
  };

  privateChat = async ({
    navigation,
    name,
    users = [],
    transaction_type = 'support',
    onError,
    params = {},
  } = {}) => {
    const data = {
      transaction_type,
      is_public: false,
      name: name,
      users: users,
    };
    try {
      const room = await requests.post(
        url.getItemURL('chats.Room', {id: 0}) + 'join/',
        data,
      );
      if (room?.id) {
        navigation.navigate('Chat', {roomId: room.id, ...params});
      } else {
        onError && onError(room);
      }
    } catch (error) {
      onError && onError(error);
    }
  };

  navigate = (navigation, appScreen, appParams) => {
    if (appScreen) {
      const [rootStack, targetScreen] = appScreen.split('.');
      if (targetScreen) {
        navigation.navigate(rootStack, {
          screen: targetScreen,
          params: appParams,
        });
      } else {
        navigation.navigate(rootStack, appParams);
      }
    }
  };

  buildLink = async ({
    link,
    linkType,
    campaign = 'share',
    social = {},
  } = {}) => {
    /*
      returns a link to be shared for users to download the app
    */
    const _link = await dynamicLinks().buildShortLink(
      {
        link,
        // domainUriPrefix is created in your Firebase console
        domainUriPrefix: 'https://link.nibebe.app',
        // optional setup which updates Firebase analytics campaign
        // "banner". This also needs setting up before hand
        analytics: {
          campaign,
        },
        android: {
          packageName: 'com.hudumabomba.safari',
        },
        ios: {
          bundleId: 'com.hudumabomba.safari',
        },
        social,
      },
      linkType || dynamicLinks.ShortLinkType.SHORT,
    );
    return _link;
  };
  formatToFlespiLocation = ({
    ident,
    batteryLevel,
    timestamp,
    coords: {altitude, latitude, longitude, speed, heading, accuracy},
  }) => ({
    timestamp: parseInt(timestamp / 1000, 10),
    'position.altitude': altitude,
    'position.latitude': latitude,
    'position.longitude': longitude,
    'position.speed': speed,
    'position.direction': heading,
    'position.accuracy': accuracy,
    'battery.level': batteryLevel,
    ident,
  });
}
export const utils = new Actions();
