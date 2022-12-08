import axios from 'axios';
import {api} from '../config/config';
import SecureStore from '../secureStore';
import redux from '../redux/store';

const {store} = redux;

//use for localserver
const apiClient = axios.create({
  baseURL: `http://${api.host}:${api.port}/`,
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
});

//use for deployed server
// const apiClient = axios.create({
//   baseURL: `https://${api.host}/`,
//   headers: {
//     'Content-type': 'application/json; charset=utf-8',
//   },
// });

apiClient.interceptors.request.use(
  async config => {
    const accessToken = await SecureStore.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log('🚀 API REQUEST: ', config);
    return config;
  },
  error => Promise.reject(error),
);

const refreshRequest = async () => {
  let isSuccess = false;
  try {
    const refreshToken = await SecureStore.getRefreshToken();
    const res = await axios.post(
      `http://${api.host}:${api.port}/v1/auth/refresh-tokens`,
      {refreshToken},
    );
    if (res && res.data) {
      const newAccessToken = res.data?.access?.token;
      const newRefreshToken = res.data?.refresh.token;
      await SecureStore.clearStore();
      await SecureStore.setTokens(newAccessToken, newRefreshToken);
      isSuccess = true;
    }
  } catch (_) {
    isSuccess = false;
  }
  return isSuccess;
};

const logoutClientAfterFailRefreshRequest = async () => {
  await SecureStore.clearStore();
  store.dispatch({type: 'logout'});
};

apiClient.interceptors.response.use(
  response => {
    console.log('📦 API RESPONSE:', response?.data);
    return response;
  },
  async error => {
    console.log(
      '⚠️ API ERROR:',
      error.response?.config.url,
      error.response?.data,
    );
    const prevReq = error?.config;
    if (
      (error?.response?.status === 403 || error?.response?.status === 401) &&
      !prevReq?.sent
    ) {
      prevReq.sent = true;
      const isSuccess = await refreshRequest();
      if (isSuccess) {
        const newAccessToken = await SecureStore.getAccessToken();
        prevReq.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(prevReq);
      } else {
        await logoutClientAfterFailRefreshRequest();
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
