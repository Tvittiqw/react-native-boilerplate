import React from 'react';
import {useFormik} from 'formik';
import {View, Text, Image} from 'react-native';
import {CustomButton, CustomInput} from '../../common';
import {useTranslation} from 'react-i18next';
import {
  credentialFields,
  personalData,
} from '../../../constants/registerFields';
import styles from './styles';

const SignUpForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  step,
  setValidateFirstStepOnChange,
  validateFirstStepOnChange,
  setValidateSecondStepOnChange,
  validateSecondStepOnChange,
  setActiveStep,
  isError,
  errorMessage,
}) => {
  const {values, errors, handleSubmit, isSubmitting, handleChange} = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    step,
    setValidateFirstStepOnChange,
    validateFirstStepOnChange,
    setValidateSecondStepOnChange,
    validateSecondStepOnChange,
    setActiveStep,
  });

  const renderStepper = step => {
    return (
      <View style={styles.stepperWrapper}>
        <View style={[styles.circle, step === 'first' && styles.activeCircle]}>
          {step === 'second' ? (
            <Image
              source={require('../../../assets/icons/check.png')}
              style={{width: 10, height: 10}}
            />
          ) : (
            <Text style={styles.stepperText}>1</Text>
          )}
        </View>
        <View style={styles.line} />
        <View style={[styles.circle, step === 'second' && styles.activeCircle]}>
          <Text style={styles.stepperText}>2</Text>
        </View>
      </View>
    );
  };

  const buttonText = step => {
    if (step === 'first') {
      return t('signup.button_text_first');
    } else {
      return t('signup.button_text_second');
    }
  };

  const {t} = useTranslation();

  return (
    <View style={styles.signupForm}>
      {renderStepper(step)}
      {step === 'first' ? (
        <View style={styles.formFieldContainer}>
          {credentialFields.map((item, index) => {
            return (
              <View key={item.id} style={styles.formFieldContainer}>
                <CustomInput
                  value={values[item.name]}
                  onChangeText={handleChange(item.name)}
                  placeholder={t(item.placeholder)}
                  passwordInput={item.isPassword}
                  keyboardType={item.type}
                  error={
                    errors[item.name] && validateFirstStepOnChange
                      ? errors[item.name]
                      : ''
                  }
                />
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.formFieldContainer}>
          {personalData.map((item, index) => {
            return (
              <View key={item.id} style={styles.formFieldContainer}>
                <CustomInput
                  value={values[item.name]}
                  onChangeText={handleChange(item.name)}
                  placeholder={t(item.placeholder)}
                  error={
                    errors[item.name] && validateSecondStepOnChange
                      ? errors[item.name]
                      : ''
                  }
                />
              </View>
            );
          })}
          {isError && (
            <View style={styles.requestError}>
              <Text>{errorMessage}</Text>
            </View>
          )}
        </View>
      )}
      <View style={{marginTop: 50}}>
        <CustomButton
          onPress={() => {
            if (step === 'second') {
              setValidateSecondStepOnChange(true);
              handleSubmit();
            } else {
              setValidateFirstStepOnChange(true);
              handleSubmit();
            }
          }}
          text={buttonText(step)}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
};

export default SignUpForm;
