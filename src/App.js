import React, {useEffect, useState} from 'react';
import {LogBox, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import reduxSettings from './redux/store';
import moment from 'moment';
// import {SplashScreen} from './screens';
import {useTranslation} from 'react-i18next';
import linking from './services/linking';
import 'moment/locale/ru';
import ThemeProvider from './context/theme/ThemeProvider';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator from './navigation/Navigator';
import SplashScreen from 'react-native-splash-screen';
const {store, persistor} = reduxSettings;

const App = () => {
  const [isInitApp, setInitApp] = useState(false);

  const [isAppOpen, setAppOpen] = useState(false);
  const [isSettingsSetup, setSettingsSetup] = useState(false);
  // const [splashAnimationFinish, setSplashAnimationFinish] = useState(false);
  const [dynamicThemeStatus, setDynamicThemeStatus] = useState(false);

  const {i18n} = useTranslation();

  const setupThemeSettings = async () => {
    const status = await AsyncStorage.getItem('@isDynamicTheme');
    JSON.parse(status);
    if (status !== null || status !== 'null') {
      setDynamicThemeStatus(!!status);
    } else {
      setDynamicThemeStatus(false);
    }
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
    setSettingsSetup(true);
  };

  useEffect(() => {
    initAppSettings();
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  //ignore ViewPropTypes yellow box
  LogBox.ignoreLogs(['ViewPropTypes']);

  useEffect(() => {
    if (isSettingsSetup) {
      setInitApp(true);
    }
  }, [isSettingsSetup]);

  return (
    <Provider store={store} linking={linking}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider themeStatusFromSettings={dynamicThemeStatus}>
          <Navigator />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
