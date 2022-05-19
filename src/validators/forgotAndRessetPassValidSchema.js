import * as Yup from 'yup';
import {commonValues} from './commonValues';

const {email, password, confirmPassword} = commonValues;

export const forgotValidationSchema = Yup.object({
  email,
});

export const resetPasswordValidationSchema = Yup.object({
  password,
  confirmPassword,
});
