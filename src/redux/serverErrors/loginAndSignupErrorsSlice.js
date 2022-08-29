import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoginError: false,
  isSignupError: false,
  loginError: '',
  signupError: '',
};

const loginAndSignupErrorsSlice = createSlice({
  name: 'errors/loginAndSignup',
  initialState,
  reducers: {
    setLoginError: (state, {payload}) => {
      const {errorMessage, isError} = payload;
      state.isLoginError = isError;
      state.loginError = errorMessage;
    },
    setSignupError: (state, {payload}) => {
      const {errorMessage, isError} = payload;
      state.isSignupError = isError;
      state.signupError = errorMessage;
    },

  },
});

export const {setLoginError, setSignupError} = loginAndSignupErrorsSlice.actions;
export default loginAndSignupErrorsSlice.reducer;