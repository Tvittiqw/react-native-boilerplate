import React, {FC} from 'react';
import {StyleSheet, View} from "react-native";
import {FormikConfig, useFormik} from "formik";
import {ResetPasswordFormValuesType} from "../../../types/formsTypes";
import {CustomButton, CustomInput} from "../../common";

type FormPropsType = FormikConfig<ResetPasswordFormValuesType>

const ResetPasswordForm: FC<FormPropsType> = (formikProps) => {

    const { values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur } = useFormik({
        ...formikProps
    })

    return (
        <View style={styles.form}>
            <View style={styles.formFieldContainer}>
                <CustomInput
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    placeholder="Enter new password"
                    passwordInput
                    error={errors.password && touched.password ? errors.password : ""}
                />
            </View>

            <View style={styles.formFieldContainer}>
                <CustomInput
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    placeholder="Confirm password"
                    passwordInput
                    error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}
                />
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    onPress={handleSubmit}
                    text="Reset password"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        width: "100%"
    },
    formFieldContainer: {
        marginTop: 50,
    },
    buttonContainer: {
        marginTop: 40,
    }
})

export default ResetPasswordForm;