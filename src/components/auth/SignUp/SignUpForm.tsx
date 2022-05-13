import {FormikConfig, useFormik} from 'formik';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomInput} from '../../common';
import {SignUpFormValuesType} from '../../../types/formsTypes';
import {useTranslation} from 'react-i18next';

type LoginFormPropsType = FormikConfig<SignUpFormValuesType>;
type LoginOtherPropsType = {
  setValidateOnChange: (value: boolean) => void;
};

const SignUpForm: FC<LoginFormPropsType & LoginOtherPropsType> = ({
  initialValues,
  onSubmit,
  validationSchema,
  validateOnChange = true,
  setValidateOnChange,
}) => {
  const {values, errors, handleSubmit, isSubmitting, handleChange} = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange,
  });

  const {t} = useTranslation();

  return (
    <View style={styles.signupForm}>
      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.firstName}
          onChangeText={handleChange('firstName')}
          placeholder={t('signup.firstname_placeholder')}
          error={errors.firstName && validateOnChange ? errors.firstName : ''}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.lastName}
          onChangeText={handleChange('lastName')}
          placeholder={t('signup.lastname_placeholder')}
          error={errors.lastName && validateOnChange ? errors.lastName : ''}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.id}
          onChangeText={handleChange('id')}
          placeholder={t('signup.id_placeholder')}
          error={errors.id && validateOnChange ? errors.id : ''}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.email}
          onChangeText={handleChange('email')}
          placeholder={t('common.email_placeholder')}
          error={errors.email && validateOnChange ? errors.email : ''}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.password}
          onChangeText={handleChange('password')}
          placeholder={t('common.password_placeholder')}
          passwordInput
          error={errors.password && validateOnChange ? errors.password : ''}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          placeholder={t('common.confirm_password_placeholder')}
          passwordInput
          error={
            errors.confirmPassword && validateOnChange
              ? errors.confirmPassword
              : ''
          }
        />
      </View>
      <View style={{marginTop: 50}}>
        <CustomButton
          onPress={() => {
            setValidateOnChange(true);
            handleSubmit();
          }}
          text={t('signup.button_text')}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  signupForm: {
    width: '100%',
  },
  formFieldContainer: {
    marginTop: 50,
  },
});
