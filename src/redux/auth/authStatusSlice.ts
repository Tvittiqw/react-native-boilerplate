import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitialAuthStateType {
  isAuth: boolean;
}

const initialState: InitialAuthStateType = {
  isAuth: false,
};

const authStatusSlice = createSlice({
  name: 'auth/status',
  initialState,
  reducers: {
    setAuthStatus: (state, {payload}: PayloadAction<boolean>) => {
      state.isAuth = payload;
    },
  },
});

export const {setAuthStatus} = authStatusSlice.actions;
export default authStatusSlice.reducer;
