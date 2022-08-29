import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isRequestLoading: false
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    changeIsLoadingStatus: (state, {payload}) => {
      state.isRequestLoading = payload
    }
  }
});

export const {changeIsLoadingStatus} = loadingSlice.actions;
export default loadingSlice.reducer;