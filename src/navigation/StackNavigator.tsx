import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordScreen,
  SignUpScreen,
} from '../screens';
import {useTypedSelector} from '../hooks/storeHooks/typedStoreHooks';
import {RootStackParamList} from '../types/navigationTypes';
import BottomTabNavigator from './BottomTabNavigator';
import TypedAsyncStorage from '../utils/asyncStorageTyped';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyLightTheme: Theme = {
  ...DefaultTheme,
};

const MyDarkTheme: Theme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
  },
};

type DynamicThemeType = {
  isDynamic: boolean;
  changeDynamicStatus: () => void;
};

export const DynamicTheme = createContext<DynamicThemeType>(
  {} as DynamicThemeType,
);

type ComponentProps = {
  dynamicThemeStatus: boolean;
};

const StackNavigator: FC<ComponentProps> = ({dynamicThemeStatus}) => {
  const [isDynamicallyThemeChange, setDynamicallyThemeChange] =
    useState(dynamicThemeStatus);
  const [isChangeThemeByToggle, setChangeThemeByToggle] = useState(false);
  const [appTheme, setAppTheme] = useState<ColorSchemeName>();

  const {isAuth} = useTypedSelector(state => state.auth);

  const themeContextValue: DynamicThemeType = {
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
    await TypedAsyncStorage.setItem('@isDynamicTheme', {
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
        theme={appTheme === 'dark' ? MyDarkTheme : MyLightTheme}>
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
    </DynamicTheme.Provider>
  );
};

export default StackNavigator;
