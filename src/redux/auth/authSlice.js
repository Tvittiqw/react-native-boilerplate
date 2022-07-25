import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signUp, login} from '../../requests/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userInfo: null,
  isAuth: true,
  isLoading: false,
  isError: false,
  error: '',
};

export const loginRequest = createAsyncThunk(
  'auth/login',
  async (loginFormData, thunkApi) => {
    try {
      const data = await login(loginFormData);
      if (data) {
        await AsyncStorage.setItem('@Token', data.tokens.access.token);
        return thunkApi.fulfillWithValue(data);
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const signUpRequest = createAsyncThunk(
  'auth/signUp',
  async (signupFormData, thunkApi) => {
    try {
      const data = await signUp(signupFormData);
      if (data) {
        await AsyncStorage.setItem('@Token', data.tokens.access.token);
        return thunkApi.fulfillWithValue(data);
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  console.log('worked');
  await AsyncStorage.removeItem('@Token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [loginRequest.pending.type]: state => {
      state.isLoading = true;
      state.isError = false;
      state.error = '';
    },
    [loginRequest.fulfilled.type]: (state, {payload}) => {
      state.userInfo = {
        user: payload.user,
        accessToken: payload.tokens.access.token,
      };
      state.isAuth = true;
      state.isLoading = false;
    },
    [loginRequest.rejected.type]: (state, {payload}) => {
      state.isLoading = false;
      state.isAuth = false;
      state.isError = true;
      state.error = payload.message;
    },
    [signUpRequest.pending.type]: state => {
      state.isLoading = true;
      state.isError = false;
      state.error = '';
    },
    [signUpRequest.fulfilled.type]: (state, {payload}) => {
      state.userInfo = {
        user: payload.user,
        accessToken: payload.tokens.access.token,
      };
      state.isAuth = true;
      state.isLoading = false;
    },
    [signUpRequest.rejected.type]: (state, {payload}) => {
      state.isLoading = false;
      state.isAuth = false;
      state.isError = true;
      state.error = payload.message;
    },
    [logout.fulfilled.type]: state => {
      state.isLoading = false;
      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;
