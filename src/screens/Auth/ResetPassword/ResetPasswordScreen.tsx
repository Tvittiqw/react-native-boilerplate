import React, {FC} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {NavigationPropsType} from '../../../types/navigationTypes';
import {Header} from '../../../components/common';
import {ResetPasswordForm} from '../../../components/auth';
import {ResetPasswordFormValuesType} from '../../../types/formsTypes';
import {FormikHelpers} from 'formik';
import {resetPasswordValidationSchema} from '../../../validators/forgotAndRessetPassValidSchema';
import {useTranslation} from 'react-i18next';

type ResetPasswordNavigationProps = NavigationPropsType<'ResetPassword'>;

const ResetPasswordScreen: FC<ResetPasswordNavigationProps> = ({
  navigation,
}) => {
  const {t} = useTranslation();

  const submitResetPasswordForm = async (
    formValues: ResetPasswordFormValuesType,
    action: FormikHelpers<ResetPasswordFormValuesType>,
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
