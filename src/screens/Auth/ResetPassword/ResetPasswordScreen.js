import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {Header} from '../../../components/common';
import {ResetPasswordForm} from '../../../components/auth';
import {resetPasswordValidationSchema} from '../../../validators/forgotAndRessetPassValidSchema';
import {useTranslation} from 'react-i18next';

const ResetPasswordScreen = ({
  navigation,
}) => {
  const {t} = useTranslation();

  const submitResetPasswordForm = async (
    formValues,
    action,
  ) => {
    action.setSubmitting(true);
    console.warn('email ===>', formValues);
    action.setSubmitting(false);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{paddingHorizontal: 16}}>
        <Header title={t('reset_password.title')} goBack />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{t('reset_password.title')}</Text>
        <ResetPasswordForm
          initialValues={{password: '', confirmPassword: ''}}
          onSubmit={submitResetPasswordForm}
          validationSchema={resetPasswordValidationSchema}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
