import apiClient from '../services/apiClient';

export const signUp = body => {
  delete body.confirmPassword;
  return apiClient.post('v1/auth/register', body);
};

export const googleAuthRequest = () => {
  return apiClient.get('v1/auth/google');
};

export const login = body => {
  return apiClient.post('v1/auth/login', body);
};

export const logoutReq = body => {
  return apiClient.post('v1/auth/logout', body);
}