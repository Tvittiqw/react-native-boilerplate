import React, {FC} from 'react';
import {StyleSheet, View} from "react-native";
import {FormikConfig, useFormik} from "formik";
import {ForgotPasswordFormValuesType} from "../../../types/formsTypes";
import {CustomButton, CustomInput} from "../../common";

type ForgotPasswordFormPropsType = FormikConfig<ForgotPasswordFormValuesType>

const ForgotPasswordForm: FC<ForgotPasswordFormPropsType> = (
    {
        initialValues,
        onSubmit,
        validationSchema
    }) => {

    const { values, touched, isSubmitting, errors, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <View style={styles.form}>
            <CustomInput
                value={values.email}
                onChangeText={handleChange("email")}
                placeholder="Enter Email"
                onBlur={handleBlur("email")}
                error={errors.email && touched.email ? errors.email : ""}
            />
            <View style={{ marginTop: 30 }}>
                <CustomButton
                    onPress={handleSubmit}
                    text="Next"
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
})

export default ForgotPasswordForm;