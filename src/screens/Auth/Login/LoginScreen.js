import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {LoginForm} from '../../../components/auth';
import styles from './styles';
import loginValidationSchema from '../../../validators/loginValidationSchema';
import {useTypedDispatch} from '../../../hooks/storeHooks/typedStoreHooks';
import {loginRequest, googleAuth} from '../../../redux/auth/authSlice';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';
import {socialAthUrls} from '../../../config/config';

import SafariView from 'react-native-safari-view';
import {WebView} from 'react-native-webview';

const LoginScreen = ({navigation}) => {
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [uri, setURL] = useState('');
  const {isLoginError, loginError} = useSelector(state => state?.serverErrors?.loginAndSignup);
  const {isRequestLoading} = useSelector(state => state?.loading);

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

  useEffect(() => {
    const subscription = Linking.addEventListener('url', url =>
      handleOpenURL(url.url),
    );

    return () => {
      subscription.remove('url', handleOpenURL);
    };
  }, []);

  const signIn = async () => {
    try {
      //todo move url to config
      openUrl(socialAthUrls.google);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOpenURL = url => {
    const data = decodeURI(url);
    const arr = data.split('user=');
    const query = arr[1];
    const parsedQuery = JSON.parse(query);
    setURL('');
    dispatch(googleAuth(parsedQuery));
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    } else {
      setURL('');
    }
  };

  const openUrl = url => {
    if (Platform.OS === 'ios') {
      SafariView.show({
        url,
        fromBottom: true,
      });
    } else {
      setURL(url);
    }
  };

  if (uri) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <WebView
          userAgent={
            Platform.OS === 'android'
              ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
              : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
          }
          source={{uri}}
          onError={e => {
            console.log(e.nativeEvent.url);
          }}
        />
      </SafeAreaView>
    );
  }

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
            isError={isLoginError}
            errorMessage={loginError}
          />
          <AnimatedLoader
            visible={isRequestLoading}
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
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => signIn()}>
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
