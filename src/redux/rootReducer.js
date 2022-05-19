import {combineReducers} from 'redux';
import authReducer from './auth/authSlice';

const appReducer = combineReducers({
  auth: authReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'logout') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
