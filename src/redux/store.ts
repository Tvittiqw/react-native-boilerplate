import {configureStore, Reducer} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';

const store = configureStore({
  reducer: rootReducer as Reducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
