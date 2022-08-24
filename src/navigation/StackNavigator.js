import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Appearance} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordScreen,
  SignUpScreen,
} from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import {useThemeContext} from '../context/theme/ThemeProvider';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [appTheme, setAppTheme] = useState();
  const {isDynamicTheme} = useThemeContext();

  const {isAuth} = useSelector(state => state.auth);

  const themeChangeListener = useCallback(({colorScheme}) => {
    setAppTheme(colorScheme);
  }, []);

  useEffect(() => {
    if (isDynamicTheme) {
      setAppTheme(Appearance.getColorScheme());
      const unsubscribe = Appearance.addChangeListener(themeChangeListener);
      return () => unsubscribe.remove();
    } else {
      setAppTheme('light');
    }
  }, [isDynamicTheme]);

  return (
    <NavigationContainer theme={appTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {isAuth ? (
          <>
            <Stack.Screen
              name={'BottomTab'}
              component={BottomTabNavigator}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={'Login'}
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={'SignUp'}
              component={SignUpScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={'ForgotPassword'}
              component={ForgotPasswordScreen}
              options={{headerShown: false}}
            />
          </>
        )}

        <Stack.Group navigationKey={isAuth ? 'user' : 'guest'}>
          <Stack.Screen
            name={'ResetPassword'}
            component={ResetPasswordScreen}
            options={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
