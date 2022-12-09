import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import reduxSettings from './redux/store';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import linking from './services/linking';
import 'moment/locale/ru';
import ThemeProvider from './context/theme/ThemeProvider';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator from './navigation/Navigator';
import SplashScreen from 'react-native-splash-screen';
const {store, persistor} = reduxSettings;

const App = () => {
  const [themeFromSettings, setThemeFromSettings] = useState(null);

  const {i18n} = useTranslation();

  useEffect(() => {
    const setupThemeSettings = async () => {
      const themeMode = await AsyncStorage.getItem('@themeMode');
      setThemeFromSettings(themeMode);
    };

    const setupLanguageSettings = async () => {
      try {
        const lang = await AsyncStorage.getItem('@language');
        if (lang) {
          await i18n.changeLanguage(lang);
        }
      } catch (err) {
        console.warn('-----lang error', err);
      }
    };

    const initAppSettings = async () => {
      await setupThemeSettings();
      await setupLanguageSettings();
      SplashScreen.hide();
    };
    initAppSettings();
  }, [i18n]);

  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  //ignore ViewPropTypes yellow box
  LogBox.ignoreLogs(['ViewPropTypes']);

  return (
    <Provider store={store} linking={linking}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider themeFromSettings={themeFromSettings}>
          <Navigator />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
