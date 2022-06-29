import * as Yup from 'yup';
import {commonValues} from './commonValues';

const {firstName, lastName, userName, email, password, confirmPassword} =
  commonValues;

export default {
  first: Yup.object().shape({
    email,
    password,
    confirmPassword,
  }),
  second: Yup.object().shape({
    firstName,
    lastName,
    userName,
  }),
};
