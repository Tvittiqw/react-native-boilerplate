import React from 'react';
import {useFormik} from 'formik';
import {View, KeyboardAvoidingView} from 'react-native';
import {RoundButton, CustomInput} from '../../common';
import {useTranslation} from 'react-i18next';
import styles from './styles';

const TodosForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  validateOnChange = true,
  setValidateOnChange,
  isError,
  errorMessage,
}) => {
  const {values, errors, handleSubmit, isSubmitting, handleChange} = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange,
  });

  const {t} = useTranslation();
  console.log('values', values);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.todoForm}>
      <View style={styles.formFieldContainer}>
        <CustomInput
          value={values.todo}
          onChangeText={handleChange('text')}
          placeholder={t('todo.todo_placeholder')}
          error={errors.todo && validateOnChange ? errors.todo : ''}
        />
      </View>
      <View style={{marginTop: 25}}>
        <RoundButton
          onPress={() => {
            handleSubmit();
          }}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      </View>
      {/*{isError && (*/}
      {/*  <View style={styles.requestError}>*/}
      {/*    <Text>{errorMessage}</Text>*/}
      {/*  </View>*/}
      {/*)}*/}
    </KeyboardAvoidingView>
  );
};

export default TodosForm;
