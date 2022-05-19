import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
};

const authStatusSlice = createSlice({
  name: 'auth/status',
  initialState,
  reducers: {
    setAuthStatus: (state, {payload}) => {
      state.isAuth = payload;
    },
  },
});

export const {setAuthStatus} = authStatusSlice.actions;
export default authStatusSlice.reducer;
