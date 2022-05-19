import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signUp, login} from '../../requests/auth'

const initialState = {
  userInfo: null,
  isAuth: false,
  isLoading: false,
};

export const fetchLoginForm = createAsyncThunk('auth/login', async (loginFormData, thunkApi) => {
  try {
    const data = await login(loginFormData);
    return data;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

export const fetchSignUpForm = createAsyncThunk('auth/login', async (signupFormData, thunkApi) => {
  try {
    const data = await signUp(signupFormData);
    return data;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLoginForm.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchLoginForm.fulfilled.type]: (
      state,
      {payload},
    ) => {
      state.userInfo = {email: payload, accessToken: payload};
      state.isAuth = true;
      state.isLoading = false;
    },
    [fetchLoginForm.rejected.type]: state => {
      state.isLoading = false;
      state.isAuth = false;
    },
    [fetchSignUpForm.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchSignUpForm.fulfilled.type]: (
      state,
      {payload},
    ) => {
      state.userInfo = {email: payload, accessToken: payload};
      state.isAuth = true;
      state.isLoading = false;
    },
    [fetchSignUpForm.rejected.type]: state => {
      state.isLoading = false;
      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;
