import React, {FC, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SignUpForm} from "../../../components/auth";
import {SignUpFormValuesType} from "../../../types/formsTypes";
import {NavigationPropsType} from "../../../types/navigationTypes";
import styles from "./styles";
import {routes} from "../../../consants/routes";
import signupValidationSchema from "../../../validators/signupValidationSchema";
import {useTypedDispatch} from "../../../hooks/storeHooks/typedStoreHooks";
import {fetchSignUpForm} from "../../../redux/auth/authSlice";
import {FormikHelpers} from "formik";

type SignUpNavigationProps = NavigationPropsType<"SignUp">

const SignUpScreen: FC<SignUpNavigationProps> = ({ navigation }) => {

    const [validateOnChange, setValidateOnChange] = useState(false);

    const dispatch = useTypedDispatch();

    const submitSignUpForm = async (formValues: SignUpFormValuesType, action: FormikHelpers<SignUpFormValuesType>) => {
        action.setSubmitting(true);
        await dispatch(fetchSignUpForm(formValues));
        action.setSubmitting(false);
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>

                <Text style={styles.signupText}>Sign Up</Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    <SignUpForm
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            id: "",
                            email: "",
                            password: "",
                            confirmPassword: ""
                        }}
                        onSubmit={submitSignUpForm}
                        validationSchema={signupValidationSchema}
                        setValidateOnChange={setValidateOnChange}
                        validateOnChange={validateOnChange}
                    />

                    <View style={styles.loginContainer}>
                        <Text>Already have an account? Go to </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(routes.public.login)}>
                            <Text style={styles.navLink}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;