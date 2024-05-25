import {useCallback, useEffect} from 'react';
import {I18nManager} from 'react-native';
import {I18n} from 'i18n-js';
import {memoize} from 'lodash';
import {findBestLanguageTag} from 'react-native-localize';
import dayjs from 'dayjs';
import {useMMKVString} from 'react-native-mmkv';
const LANGUAGE_KEY = 'localization.language';
const DEFAULT_LANGUAGE = 'en';
const translationGetters = {
  // lazy requires
  en: () => require('./en.json'),
  // zh: () => require('./zh.json'),
  sw: () => require('./sw.json'),
};

const i18n = new I18n({en: translationGetters.en()});
// set i18n-js config
i18n.enableFallback = true;
i18n.missingBehavior = 'guess';
i18n.missingTranslationPrefix = ''; //'EE: ';
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
    : findBestLanguageTag(Object.keys(translationGetters)) || fallback;
  // clear translation cache
  t.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  const func =
    translationGetters[languageTag] ||
    translationGetters[languageTag.split('-')[0]] ||
    translationGetters.en;
  i18n.store({[languageTag]: func()});
  i18n.locale = languageTag || DEFAULT_LANGUAGE;
};

export const useTranslation = () => {
  const [appLanguage, setAppLanguage] = useMMKVString(LANGUAGE_KEY);

  useEffect(() => {
    if (appLanguage) {
      setI18nConfig({languageTag: appLanguage});
      const dayJSLocale = loadDayJsLocale[appLanguage];
      if (dayJSLocale) {
        // dynamically import the locally
        dayJSLocale();
        // then change the locale to the newly imported one
        dayjs.locale(appLanguage);
      }
    } else {
      const {languageTag = DEFAULT_LANGUAGE, isRTL = false} =
        findBestLanguageTag(Object.keys(translationGetters)) || {};
      setAppLanguage(languageTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLanguage]);

  const getAvailableLanguages = useCallback(
    () => Object.keys(translationGetters),
    [],
  );
  return {getAvailableLanguages, t, i18n};
};
