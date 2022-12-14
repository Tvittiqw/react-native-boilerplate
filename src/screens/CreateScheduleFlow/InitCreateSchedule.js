import React, {useMemo, useCallback, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';
import styles from './styles';
import {CustomButton, CustomInput} from '../../components/common';
import {createScheduleValidationSchema} from '../../validators/createScheduleValidationSchema';
import CheckBox from '@react-native-community/checkbox';
import {createSchedule} from '../../requests/schedule';

const InitCreateSchedule = ({navigation}) => {
  const {t} = useTranslation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const initialFormValues = useMemo(() => {
    return {
      name: '',
      description: '',
    };
  }, []);
  const createScheduleHandle = useCallback(
    async (formValues, action) => {
      action.setSubmitting(true);
      try {
        const res = await createSchedule({
          ...formValues,
          isPrivate: toggleCheckBox,
        });
        if (res) {
          navigation.navigate('Schedule');
        }
      } finally {
        action.setSubmitting(false);
      }
    },
    [navigation, toggleCheckBox],
  );

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: initialFormValues,
    onSubmit: createScheduleHandle,
    validationSchema: createScheduleValidationSchema,
    validateOnMount: true,
  });

  return (
    <SafeAreaView style={styles.initCreateScheduleContainer}>
      <Text style={styles.titleText}>{t('createSchedule.title')}</Text>
      <View style={styles.formFieldContainer}>
        <Text style={styles.subtitleText}>{t('createSchedule.name')}</Text>
        <CustomInput
          value={values.name}
          onChangeText={handleChange('name')}
          placeholder={t('createSchedule.scheduleNamePlaceholder')}
          error={errors.name && touched.name ? errors.name : ''}
          onBlur={handleBlur('name')}
        />
      </View>
      <View style={styles.formFieldContainer}>
        <Text style={styles.subtitleText}>
          {t('createSchedule.description')}
        </Text>
        <CustomInput
          value={values.description}
          onChangeText={handleChange('description')}
          placeholder={t('createSchedule.scheduleDescriptionPlaceholder', {
            ns: '',
          })}
          error={
            errors.description && touched.description ? errors.description : ''
          }
          onBlur={handleBlur('description')}
        />
      </View>
      <View style={styles.privateBlock}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
          boxType="square"
        />
        <Text style={styles.privateText}>
          {t('createSchedule.makePrivate')}
        </Text>
      </View>
      <View style={{marginTop: 25}}>
        <CustomButton
          onPress={() => {
            handleSubmit();
          }}
          text={t('createSchedule.createScheduleAction')}
          disabled={isSubmitting || !isValid}
          loading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

export default InitCreateSchedule;
