const privateRoutes = {
    home: "Home",
}

const publicRoutes = {
    login: "Login",
    signup: "SignUp",
}

export const routes = {
    public: {...publicRoutes},
    private: {...privateRoutes}
}