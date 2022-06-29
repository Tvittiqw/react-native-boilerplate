import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFormik} from 'formik';
import {CustomButton, CustomInput} from '../../common';
import {useTranslation} from 'react-i18next';

const ForgotPasswordForm = ({initialValues, onSubmit, validationSchema}) => {
  const {
    values,
    touched,
    isSubmitting,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const {t} = useTranslation();

  // @ts-ignore
  return (
    <View style={styles.form}>
      <CustomInput
        value={values.email}
        onChangeText={handleChange('email')}
        placeholder={t('common.email_placeholder')}
        onBlur={handleBlur('email')}
        error={errors.email && touched.email ? errors.email : ''}
      />
      <View style={{marginTop: 30}}>
        <CustomButton
          onPress={handleSubmit}
          text={t('forgot.next_button')}
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
});

export default ForgotPasswordForm;
