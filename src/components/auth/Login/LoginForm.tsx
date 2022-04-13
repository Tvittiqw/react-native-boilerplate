import {FormikConfig, useFormik} from "formik";
import React, {FC} from "react";
import {StyleSheet, View} from "react-native";
import {CustomButton, CustomInput} from "../../common";
import {LoginFormValuesType} from "../../../types/formsTypes";

type LoginFormPropsType = FormikConfig<LoginFormValuesType>
type LoginOtherPropsType = {
    setValidateOnChange: (value: boolean) => void
}

const LoginForm: FC<LoginFormPropsType & LoginOtherPropsType> = (
    {
        initialValues,
        onSubmit,
        validationSchema,
        validateOnChange = true,
        setValidateOnChange,
    }) => {

    const { values, errors, handleSubmit, isSubmitting, handleChange } = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnChange
    });

    return (
        <View style={styles.loginForm}>
            <View style={styles.formFieldContainer}>
                <CustomInput
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholder="Enter Email"
                    error={errors.email && validateOnChange ? errors.email : ""}
                />
            </View>
            <View style={styles.formFieldContainer}>
                <CustomInput
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder="Enter password"
                    passwordInput
                    error={errors.password && validateOnChange ? errors.password : ""}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <CustomButton
                    onPress={() => {
                        setValidateOnChange(true);
                        handleSubmit()
                    }}
                    text="Login"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                />
            </View>
        </View>
    )
}

export default LoginForm;

const styles = StyleSheet.create({
    loginForm: {
        width: "100%"
    },
    formFieldContainer: {
        marginTop: 20
    }
})