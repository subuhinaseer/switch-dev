import React, {createContext, useCallback, useEffect, useState} from 'react';
import {I18nManager, AppState} from 'react-native';
import {I18n} from 'i18n-js';
import memoize from 'lodash.memoize';
import * as RNLocalize from 'react-native-localize';
import {storage} from '../storage';
import dayjs from 'dayjs';
import {useMMKVObject, useMMKVString} from 'react-native-mmkv';
import {utils} from '../utils';
import {setAuthorization} from '../apiClient';
import {useLocation} from '../../effects';

const DEFAULT_LANGUAGE = 'en';

const translationGetters = {
  // lazy requires
  en: () => require('./en.json'),
  // zh: () => require('./zh.json'),
  sw: () => require('./sw.json'),
  hi: () => require('./hi.json'),
};

const i18n = new I18n({en: translationGetters.en()});
// set i18n-js config
i18n.enableFallback = true;
i18n.missingBehaviour = 'guess';
i18n.missingTranslationPrefix = ' '; //'EE: ';
i18n.defaultLocale = DEFAULT_LANGUAGE;

const loadDayJsLocale = {
  // lazy requires
  sw: () => require('dayjs/locale/sw'),
  en: () => require('dayjs/locale/en'),
  // zh: () => require('dayjs/locale/zh'),
  hi: () => require('dayjs/locale/hi'),
};

export const t = memoize(
  (key, config) => {
    return i18n.t(key, config);
  },
  (key, config) =>
    config ? key + JSON.stringify(config) + i18n.locale : key + i18n.locale,
);

const setI18nConfig = config => {
  // fallback if no available language fits
  const fallback = {languageTag: DEFAULT_LANGUAGE, isRTL: false};
  const {languageTag, isRTL = false} = config?.languageTag
    ? config
    : RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
  // clear translation cache
  t.cache.clear();
  // update layout direction
  i18n.missingBehavior = 'guess';
  I18nManager.forceRTL(isRTL);
  const func = utils.getObject(
    translationGetters,
    languageTag,
    translationGetters.en,
  );
  i18n.store({[languageTag]: func()});
  i18n.locale = languageTag || DEFAULT_LANGUAGE;
};

export const LocalizationContext = createContext({
  i18n: {
    t: (str, opts) => t(str, opts),
  },
  setAppLanguage: () => null,
  appLanguage: DEFAULT_LANGUAGE,
});

export const LocalizationProvider = ({children}) => {
  const [appLanguage, setAppLanguage] = useMMKVString(storage.languageKey);
  const [loggedUser] = useMMKVObject('authUser');
  const [appState, setAppState] = useState(AppState.currentState);
  const {checkLocationPermission} = useLocation();

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      onAppStateChange,
    );
    return () => appStateListener?.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loggedUser && setAuthorization(loggedUser?.token);
  }, [loggedUser]);

  useEffect(() => {
    if (appLanguage) {
      setI18nConfig({languageTag: appLanguage});
      if (loadDayJsLocale[appLanguage]) {
        loadDayJsLocale[appLanguage]();
        dayjs.locale(appLanguage);
      }
    } else {
      const {languageTag = DEFAULT_LANGUAGE, isRTL = false} =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
        {};
      setAppLanguage(languageTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLanguage, loggedUser, appState]);

  const onAppStateChange = useCallback(nextAppState => {
    utils.appState = nextAppState; //to help managing global some activities like toast etc
    setAppState(nextAppState);
  }, []);

  const getAvailableLanguages = useCallback(
    () => Object.keys(translationGetters),
    [],
  );

  return (
    <LocalizationContext.Provider
      value={{
        i18n: {
          t: (str, opts) => t(str, opts),
        },
        getAvailableLanguages,
        setAppLanguage,
        appLanguage,
        appState,
        checkLocationPermission,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
export {i18n};
