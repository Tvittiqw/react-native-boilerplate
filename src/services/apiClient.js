import axios from 'axios';
import {api} from '../config/config';

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

export default apiClient;
