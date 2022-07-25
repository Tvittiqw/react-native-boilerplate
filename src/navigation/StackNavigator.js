import React, {createContext, useCallback, useEffect, useState} from 'react';
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
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import BottomTabNavigator from './BottomTabNavigator';
import ScheduleScreen from "../screens/Schedule/ScheduleScreen";

const Stack = createNativeStackNavigator();

export const DynamicTheme = createContext({});

const StackNavigator = ({dynamicThemeStatus}) => {
  const [isDynamicallyThemeChange, setDynamicallyThemeChange] =
    useState(dynamicThemeStatus);
  const [isChangeThemeByToggle, setChangeThemeByToggle] = useState(false);
  const [appTheme, setAppTheme] = useState();
  const [token, setToken] = useState();

  const {isAuth} = useSelector(state => state.auth);

  //todo add token verification and not logout after app closed

  // const getToken = async () => {
  //   try {
  //     const data = await AsyncStorage.getItem('@Token');
  //     setToken(data);
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // };
  //
  // useEffect(() => {
  //   getToken();
  // }, []);

  const themeContextValue = {
    isDynamic: isDynamicallyThemeChange,
    changeDynamicStatus: () => {
      setDynamicallyThemeChange(prevState => !prevState);
      setChangeThemeByToggle(true);
    },
  };

  const themeChangeListener = useCallback(() => {
    setAppTheme(Appearance.getColorScheme());
  }, []);

  const saveInStorageThemeConfig = useCallback(async () => {
    await AsyncStorage.setItem('@isDynamicTheme', {
      status: isDynamicallyThemeChange,
    });
  }, [isDynamicallyThemeChange]);

  useEffect(() => {
    if (isChangeThemeByToggle) {
      saveInStorageThemeConfig();
    }
  }, [isChangeThemeByToggle, saveInStorageThemeConfig]);

  useEffect(() => {
    if (isDynamicallyThemeChange) {
      setAppTheme(Appearance.getColorScheme());
      const unsubscribe = Appearance.addChangeListener(themeChangeListener);
      return () => unsubscribe.remove();
    } else {
      setAppTheme('light');
    }
  }, [themeChangeListener, isDynamicallyThemeChange]);

  return (
    <DynamicTheme.Provider value={themeContextValue}>
      <NavigationContainer
        theme={appTheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          {isAuth ? (
            <>
              <Stack.Screen
                name={'BottomTab'}
                component={BottomTabNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={'ScheduleScreen'}
                component={ScheduleScreen}
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
    </DynamicTheme.Provider>
  );
};

export default StackNavigator;
