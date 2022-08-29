import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signUp, login} from '../../requests/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorHandler} from '../../utils/helpers';
import {changeIsLoadingStatus} from "../loading/loadingSlice";
import {setLoginError, setSignupError} from '../serverErrors/loginAndSignupErrorsSlice';

const initialState = {
  userInfo: null,
  isAuth: false,
  token: null,
};

export const loginRequest = createAsyncThunk(
  'auth/login',
  async (loginFormData, thunkApi) => {
    thunkApi.dispatch(changeIsLoadingStatus(true))
    thunkApi.dispatch(setLoginError({errorMessage: '', isError: false}));
    try {
      const response = await login(loginFormData);
      if (response && response.data) {
        return thunkApi.fulfillWithValue(response.data);
      }
    } catch (err) {
      thunkApi.dispatch(setLoginError({
        errorMessage: errorHandler(err)?.message,
        isError: true,
      }));
      return thunkApi.rejectWithValue(errorHandler(err));
    } finally {
      thunkApi.dispatch(changeIsLoadingStatus(false))
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
    thunkApi.dispatch(changeIsLoadingStatus(true))
    thunkApi.dispatch(setSignupError({errorMessage: '', isError: false}));
    try {
      const response = await signUp(signupFormData);
      if (response && response.data) {
        return thunkApi.fulfillWithValue(response.data);
      }
    } catch (err) {
      thunkApi.dispatch(setSignupError({
        errorMessage: errorHandler(err)?.message,
        isError: true,
      }));
      return thunkApi.rejectWithValue(errorHandler(err));
    } finally {
      thunkApi.dispatch(changeIsLoadingStatus(false))
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  // TODO
  // Add request to server (with logout logic)
  thunkApi.dispatch(changeIsLoadingStatus(true))
  try {
    await later(2000)
  } finally {
    thunkApi.dispatch(changeIsLoadingStatus(false))
  }
  thunkApi.dispatch({type: 'logout'})
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [loginRequest.fulfilled.type]: (state, {payload}) => {
      state.userInfo = {
        user: payload.user,
      };
      state.token = payload.tokens.access.token;
      state.isAuth = true;
    },
    [signUpRequest.fulfilled.type]: (state, {payload}) => {
      state.userInfo = {
        user: payload.user,
      };
      state.token = payload.tokens.access.token;
      state.isAuth = true;
    },
  },
});

export default authSlice.reducer;
