import axios from 'axios';
import {api} from '../config/config'

const apiClient = axios.create({
  baseURL: `http://${api.host}:${api.port}/`,
  headers: {
    'Content-type': 'application/json; charset=utf-8'
  }
});

apiClient.interceptors.response.use((response) => response,
  (error) => {
  console.log('Error',error.response.data)
  return Promise.reject(error.response.data);
});

export default apiClient;
