import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFormik} from 'formik';
import {CustomButton, CustomInput} from '../../common';
import {useTranslation} from 'react-i18next';

const ResetPasswordForm = formikProps => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    ...formikProps,
  });

  const {t} = useTranslation();

  return (
    <View style={styles.form}>
      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          placeholder={t('reset_password.new_password_placeholder')}
          passwordInput
          error={errors.password && touched.password ? errors.password : ''}
        />
      </View>

      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          placeholder={t('common.confirm_password_placeholder')}
          passwordInput
          error={
            errors.confirmPassword && touched.confirmPassword
              ? errors.confirmPassword
              : ''
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={handleSubmit}
          text={t('reset_password.reset_button_text')}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  formFieldContainer: {
    marginTop: 50,
  },
  buttonContainer: {
    marginTop: 40,
  },
});

export default ResetPasswordForm;
