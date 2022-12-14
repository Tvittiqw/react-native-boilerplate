import * as Yup from 'yup';
import {atLeastOneNumber} from '../constants/regex';

export const commonValues = {
  firstName: Yup.string()
    .required('First name is required!')
    .min(2, 'Enter 2 characters at least')
    .max(15, 'Name can be 15 characters or less'),
  lastName: Yup.string()
    .required('Last name is required!')
    .min(2, 'Enter 2 characters at least')
    .max(15, 'Name can be 15 characters or less'),
  userName: Yup.string()
    .min(2, 'Enter 2 characters at least')
    .max(20, 'Name can be 20 characters or less'),
  email: Yup.string()
    .required('Email is required!')
    .email('Invalid email address'),
  // todo add domain validation
  // .test('test-name', 'Validation failure message', function (value) {
  //   // your logic to check the domain
  // }),
  password: Yup.string()
    .required('Password is required!')
    .min(8, 'At least 8 characters')
    .matches(atLeastOneNumber, 'At least one number'),
  // .matches(
  //   atLeastOneSpecialCharacter,
  //   'At least one special character !@#$%^&*(),.?":{}|<>',
  // ),
  confirmPassword: Yup.string()
    .required('Confirm password is required!')
    .oneOf([Yup.ref('password'), null], 'Password should match'),
  scheduleName: Yup.string()
    .required('This field is required')
    .min(2, 'Enter 2 characters at least')
    .max(20, 'Name can be 20 characters or less'),
  scheduleDescription: Yup.string()
    .required('This field is required')
    .min(2, 'Enter 2 characters at least')
    .max(25, 'Description can be 25 characters or less'),
};
