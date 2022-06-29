import apiClient from '../services/apiClient';

export const signUp = body => {
  delete body.confirmPassword;
  return apiClient.post('v1/auth/register', body);
};

export const login = body => {
  return apiClient.post('v1/auth/login', body);
};
