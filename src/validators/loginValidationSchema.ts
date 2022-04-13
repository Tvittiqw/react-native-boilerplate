import * as Yup from "yup";
import {commonValues} from "./commonValues";

const { email, password } = commonValues;

const loginValidationSchema = Yup.object({
    email,
    password,
})

export default loginValidationSchema;