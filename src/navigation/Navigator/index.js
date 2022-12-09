import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Appearance} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useThemeContext} from '../../context/theme/ThemeProvider';
import LoggedInStack from './LoggedInStack';
import LoggedOutStack from './LoggedOutStack';

const Navigator = () => {
  const {themeMode} = useThemeContext();
  const [appTheme, setAppTheme] = useState(
    themeMode === 'auto' ? Appearance.getColorScheme : themeMode,
  );

  const {isAuth} = useSelector(state => state.auth);

  const themeChangeListener = useCallback(({colorScheme}) => {
    setAppTheme(colorScheme);
  }, []);

  useEffect(() => {
    if (themeMode === 'auto') {
      setAppTheme(Appearance.getColorScheme());
      const unsubscribe = Appearance.addChangeListener(themeChangeListener);
      return () => unsubscribe.remove();
    } else {
      setAppTheme(themeMode);
    }
  }, [themeMode, themeChangeListener]);

  console.log('isauth', isAuth);
  return (
    <NavigationContainer theme={appTheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isAuth ? <LoggedInStack /> : <LoggedOutStack />}
    </NavigationContainer>
  );
};

export default Navigator;
