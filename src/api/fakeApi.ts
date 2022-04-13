import {LoginFormValuesType, SignUpFormValuesType} from "../types/formsTypes";
import fakeDB from "../fakeDB";

export const authApi = {
    login: (user: LoginFormValuesType) => {
        return fakeDB.checkUser({ email: user.email, password: user.password })
    },
    signUp: (user: SignUpFormValuesType) => {
        return fakeDB.addUser({ email: user.email, password: user.password })
    }
}