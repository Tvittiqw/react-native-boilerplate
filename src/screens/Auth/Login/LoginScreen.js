import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LoginForm} from '../../../components/auth';
import styles from './styles';
import loginValidationSchema from '../../../validators/loginValidationSchema';
import {useTypedDispatch} from '../../../hooks/storeHooks/typedStoreHooks';
import {loginRequest} from '../../../redux/auth/authSlice';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';

const LoginScreen = ({navigation}) => {
  const [validateOnChange, setValidateOnChange] = useState(false);

  const isLoading = useSelector(state => state.auth.isLoading);
  const isError = useSelector(state => state.auth.isError);
  const errorMessage = useSelector(state => state.auth.error);

  const dispatch = useTypedDispatch();

  const focused = useIsFocused();

  const {t} = useTranslation();

  const submitLoginForm = async (formValues, action) => {
    action.setSubmitting(true);
    await dispatch(loginRequest(formValues));
    action.setSubmitting(false);
  };

  useEffect(() => {
    if (focused) {
      setValidateOnChange(false);
    }
  }, [focused]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.loginText}>{t('login.title')}</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1, width: '100%', alignItems: 'center'}}
          contentContainerStyle={{flex: 1}}>
          <LoginForm
            initialValues={{email: '', password: ''}}
            validationSchema={loginValidationSchema}
            onSubmit={submitLoginForm}
            validateOnChange={validateOnChange}
            setValidateOnChange={setValidateOnChange}
            navigateToForgotScreen={() => navigation.navigate('ForgotPassword')}
            isError={isError}
            errorMessage={errorMessage}
          />
          <AnimatedLoader
            visible={isLoading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../../../config/loader.json')}
            animationStyle={styles.lottie}
            speed={1}>
            <Text>Doing something...</Text>
          </AnimatedLoader>

          <View style={{marginTop: 30}}>
            <Text>{t('login.login_with_social')}</Text>
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={[styles.navLink, {fontSize: 22}]}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={[styles.navLink, {fontSize: 22}]}>AppleID</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text>{t('login.dont_have_account')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.navLink}>{t('login.register_link')}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
