import React, {FC} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {NavigationPropsType} from '../../../types/navigationTypes';
import {Header} from '../../../components/common';
import {ForgotPasswordForm} from '../../../components/auth';
import {ForgotPasswordFormValuesType} from '../../../types/formsTypes';
import {FormikHelpers} from 'formik';
import {forgotValidationSchema} from '../../../validators/forgotAndRessetPassValidSchema';
import {useTranslation} from 'react-i18next';

type ForgotPasswordNavigationProps = NavigationPropsType<'ForgotPassword'>;

const ForgotPasswordScreen: FC<ForgotPasswordNavigationProps> = ({
  navigation,
}) => {
  const {t} = useTranslation();

  const submitLoginForm = async (
    formValues: ForgotPasswordFormValuesType,
    action: FormikHelpers<ForgotPasswordFormValuesType>,
  ) => {
    action.setSubmitting(true);
    console.warn('email ===>', formValues);
    action.setSubmitting(false);
    navigation.navigate('ResetPassword');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{paddingHorizontal: 16}}>
        <Header title={t('forgot.title')} goBack />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{t('forgot.title')}</Text>
        <ForgotPasswordForm
          initialValues={{email: ''}}
          onSubmit={submitLoginForm}
          validationSchema={forgotValidationSchema}
        />
        {/*<KeyboardAvoidingView*/}
        {/*    behavior={Platform.OS === "ios" ? "padding" : undefined}*/}
        {/*    style={{ flex: 1, width: "100%", alignItems: "center" }}*/}
        {/*    contentContainerStyle={{ flex: 1 }}*/}
        {/*    // keyboardVerticalOffset={100}*/}
        {/*>*/}

        {/*</KeyboardAvoidingView>*/}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
