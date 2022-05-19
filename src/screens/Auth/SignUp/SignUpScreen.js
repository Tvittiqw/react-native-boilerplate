import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SignUpForm} from '../../../components/auth';
import styles from './styles';
import signupValidationSchema from '../../../validators/signupValidationSchema';
import {useTypedDispatch} from '../../../hooks/storeHooks/typedStoreHooks';
import {fetchSignUpForm} from '../../../redux/auth/authSlice';
import {useTranslation} from 'react-i18next';

const SignUpScreen = ({navigation}) => {
  const [validateOnChange, setValidateOnChange] = useState(false);

  const dispatch = useTypedDispatch();

  const {t} = useTranslation();

  const submitSignUpForm = async (
    formValues,
    action,
  ) => {
    action.setSubmitting(true);
    await dispatch(fetchSignUpForm(formValues));
    action.setSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.signupText}>{t('signup.title')}</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}
          contentContainerStyle={{paddingBottom: 20}}>
          <SignUpForm
            initialValues={{
              firstName: '',
              lastName: '',
              userName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={submitSignUpForm}
            validationSchema={signupValidationSchema}
            setValidateOnChange={setValidateOnChange}
            validateOnChange={validateOnChange}
          />

          <View style={styles.loginContainer}>
            <Text>{t('signup.already_have_account')}</Text>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <Text style={styles.navLink}>{t('signup.login_link')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
