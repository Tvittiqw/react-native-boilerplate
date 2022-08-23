import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signUp, login} from '../../requests/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorHandler} from '../../utils/helpers';

const initialState = {
  userInfo: null,
  isAuth: true,
  isLoading: false,
  isLoginError: false,
  isSignupError: false,
  loginError: '',
  signupError: '',
  token: null,
};

export const loginRequest = createAsyncThunk(
  'auth/login',
  async (loginFormData, thunkApi) => {
    try {
      const response = await login(loginFormData);
      if (response) {
        await AsyncStorage.setItem('@Token', response.data.tokens.access.token);
        return thunkApi.fulfillWithValue(response.data);
      }
    } catch (err) {
      return thunkApi.rejectWithValue(errorHandler(err));
    }
  },
);

function later(delay, value) {
  return new Promise(resolve => setTimeout(resolve, delay, value));
}

export const googleAuth = createAsyncThunk(
  'auth/login',
  async (data, thunkApi) => {
    try {
      await AsyncStorage.setItem('@Token', data.tokens.access.token);
      await later(5000);
      return thunkApi.fulfillWithValue(data);
    } catch (err) {
      return thunkApi.rejectWithValue(errorHandler(err));
    }
  },
);

export const signUpRequest = createAsyncThunk(
  'auth/signUp',
  async (signupFormData, thunkApi) => {
    try {
      const response = await signUp(signupFormData);
      if (response) {
        await AsyncStorage.setItem('@Token', response.data.tokens.access.token);
        return thunkApi.fulfillWithValue(response.data);
      }
    } catch (err) {
      return thunkApi.rejectWithValue(errorHandler(err));
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('@Token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [loginRequest.pending.type]: state => {
      state.isLoading = true;
      state.isLoginError = false;
      state.loginError = '';
    },
    [loginRequest.fulfilled.type]: (state, {payload}) => {
      state.userInfo = {
        user: payload.user,
      };
      state.isAuth = true;
      state.isLoading = false;
    },
    [loginRequest.rejected.type]: (state, {payload}) => {
      state.isLoading = false;
      state.isLoginError = true;
      state.loginError = payload.message;
    },
    [signUpRequest.pending.type]: state => {
      state.isLoading = true;
      state.isSignupError = false;
      state.signupError = '';
    },
    [signUpRequest.fulfilled.type]: (state, {payload}) => {
      state.userInfo = {
        user: payload.user,
      };
      state.isAuth = true;
      state.isLoading = false;
    },
    [signUpRequest.rejected.type]: (state, {payload}) => {
      state.isLoading = false;
      state.isSignupError = true;
      state.signupError = payload.message;
    },
    [logout.fulfilled.type]: state => {
      state.isLoading = false;
      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;
