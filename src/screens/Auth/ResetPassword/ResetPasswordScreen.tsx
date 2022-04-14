import React, {FC} from 'react';
import {SafeAreaView, Text, View} from "react-native";
import styles from "./styles";
import {NavigationPropsType} from "../../../types/navigationTypes";
import {Header} from "../../../components/common";
import {ResetPasswordForm} from "../../../components/auth";
import {ResetPasswordFormValuesType} from "../../../types/formsTypes";
import {FormikHelpers} from "formik";
import {resetPasswordValidationSchema} from "../../../validators/forgotAndRessetPassValidSchema";

type ResetPasswordNavigationProps = NavigationPropsType<"ResetPassword">

const ResetPasswordScreen: FC<ResetPasswordNavigationProps> = ({ navigation }) => {

    const submitResetPasswordForm = async (formValues: ResetPasswordFormValuesType, action: FormikHelpers<ResetPasswordFormValuesType>) => {
        action.setSubmitting(true);
        console.warn("email ===>", formValues);
        action.setSubmitting(false);
        navigation.navigate("Login");
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={{ paddingHorizontal: 16 }}>
                <Header title="Reset Password" goBack/>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Reset Password</Text>
                <ResetPasswordForm
                    initialValues={{ password: "", confirmPassword: "" }}
                    onSubmit={submitResetPasswordForm}
                    validationSchema={resetPasswordValidationSchema}
                />
            </View>
        </SafeAreaView>
    );
};

export default ResetPasswordScreen;