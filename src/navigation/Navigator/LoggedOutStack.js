import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordScreen,
  SignUpScreen,
} from '../../screens';

const LoggedOutNavigator = createNativeStackNavigator();

const LoggedOutStack = () => {
  const {Navigator, Screen} = LoggedOutNavigator;
  return (
    <Navigator>
      <Screen
        name={'Login'}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Screen
        name={'SignUp'}
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Screen
        name={'ForgotPassword'}
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Screen
        name={'ResetPassword'}
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default LoggedOutStack;
