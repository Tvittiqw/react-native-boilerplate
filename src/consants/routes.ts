import {RootStackParamList} from "../types/navigationTypes";

type RoutesType = {
    [key: string]: keyof RootStackParamList
}

const privateRoutes: RoutesType = {
    home: "Home",
}

const publicRoutes: RoutesType = {
    login: "Login",
    signup: "SignUp",
}

export const routes = {
    public: {...publicRoutes},
    private: {...privateRoutes}
}