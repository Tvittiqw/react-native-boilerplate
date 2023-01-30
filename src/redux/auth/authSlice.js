import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signUp, login, logoutReq} from '../../requests/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorHandler, delay} from '../../utils/helpers';
import {changeIsLoadingStatus} from '../loading/loadingSlice';
import {
  setLoginError,
  setSignupError,
} from '../serverErrors/loginAndSignupErrorsSlice';
import SecureStore from '../../secureStore';

const initialState = {
  userInfo: null,
  isAuth: false,
};

export const loginRequest = createAsyncThunk(
  'auth/login',
  async (loginFormData, thunkApi) => {
    thunkApi.dispatch(changeIsLoadingStatus(true));
    thunkApi.dispatch(setLoginError({errorMessage: '', isError: false}));
    try {
      const response = await login(loginFormData);
      if (response && response.data) {
        const {
          tokens: {access, refresh},
        } = response.data;
        await SecureStore.setTokens(access.token, refresh.token);
        return thunkApi.fulfillWithValue(response.data);
      }
    } catch (err) {
      thunkApi.dispatch(
        setLoginError({
          errorMessage: errorHandler(err)?.message,
          isError: true,
        }),
      );
      return thunkApi.rejectWithValue(errorHandler(err));
    } finally {
      thunkApi.dispatch(changeIsLoadingStatus(false));
    }
  },
);

export const googleAuth = createAsyncThunk(
  'auth/login',
  async (data, thunkApi) => {
    try {
      await AsyncStorage.setItem('@Token', data.tokens.access.token);
      await delay(5000);
      return thunkApi.fulfillWithValue(data);
    } catch (err) {
      return thunkApi.rejectWithValue(errorHandler(err));
    }
  },
);

export const signUpRequest = createAsyncThunk(
  'auth/signUp',
  async (signupFormData, thunkApi) => {
    thunkApi.dispatch(changeIsLoadingStatus(true));
    thunkApi.dispatch(setSignupError({errorMessage: '', isError: false}));
    try {
      const response = await signUp(signupFormData);
      if (response && response.data) {
        const {
          tokens: {access, refresh},
        } = response.data;
        await SecureStore.setTokens(access.token, refresh.token);
        return thunkApi.fulfillWithValue(response.data);
      }
    } catch (err) {
      thunkApi.dispatch(
        setSignupError({
          errorMessage: errorHandler(err)?.message,
          isError: true,
        }),
      );
      return thunkApi.rejectWithValue(errorHandler(err));
    } finally {
      thunkApi.dispatch(changeIsLoadingStatus(false));
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  // TODO
  // Add request to server (with logout logic)
  thunkApi.dispatch(changeIsLoadingStatus(true));
  try {
    const refreshToken = await SecureStore.getRefreshToken();
    await logoutReq({refreshToken});
    await SecureStore.clearStore();
    thunkApi.dispatch({type: 'logout'});
  } finally {
    thunkApi.dispatch(changeIsLoadingStatus(false));
  }
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
      state.isAuth = true;
    },
    [signUpRequest.fulfilled.type]: (state, {payload}) => {
      state.userInfo = {
        user: payload.user,
      };
      state.isAuth = true;
    },
  },
});

export default authSlice.reducer;
