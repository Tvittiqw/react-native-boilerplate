import {combineReducers} from 'redux';
import authReducer from './auth/authSlice';
import loadingReducer from './loading/loadingSlice';
import loginAndSignupErrorsReducer from './serverErrors/loginAndSignupErrorsSlice';

const appReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  serverErrors: combineReducers({
    loginAndSignup: loginAndSignupErrorsReducer,
  }),
});

export const rootReducer = (state, action) => {
  if (action.type === 'logout') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
