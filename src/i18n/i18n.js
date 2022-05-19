import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import languages from './lang';
import * as RNLocalize from 'react-native-localize';

const resources = {
  en: {
    translation: languages.en,
  },
  ru: {
    translation: languages.ru,
  },
};

const langDetector = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: callback => {
    const languagesArr = Object.getOwnPropertyNames(resources);

    const langCodeFromSettings = languagesArr.find(
      lang => lang === RNLocalize.getLocales()[0].languageCode,
    );

    if (langCodeFromSettings) {
      return callback(langCodeFromSettings);
    }
    return callback('en');
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(langDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    react: {
      useSuspense: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18n;
