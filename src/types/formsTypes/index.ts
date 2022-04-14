import {FormikConfig} from "formik";

export type LoginFormValuesType = {
    email: string
    password: string
}

export type SignUpFormValuesType = {
    firstName: string
    lastName: string
    id: string
    email: string
    password: string
    confirmPassword: string
}

export type ForgotPasswordFormValuesType = {
    email: string
}

export type ResetPasswordFormValuesType = {
    password: string
    confirmPassword: string
}