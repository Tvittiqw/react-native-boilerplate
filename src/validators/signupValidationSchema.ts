import * as Yup from "yup"
import { commonValues } from "./commonValues";

const { firstName, lastName, id, email, password, confirmPassword } = commonValues;

const signupValidationSchema = Yup.object({
    firstName,
    lastName,
    id,
    email,
    password,
    confirmPassword,
})

export default signupValidationSchema;
