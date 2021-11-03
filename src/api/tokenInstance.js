import axios from 'axios';
import { getToken } from '../utils/auth';

const baseURL = process.env.REACT_APP_SERVER_URI;
// const baseURL = process.env.REACT_APP_TEST_SERVER_URI;
console.log(baseURL);

const instance = axios.create({ baseURL });

const setToken = (config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-AUTH-TOKEN'] = `${getToken()}`;
  config.headers.withCredentials = true;
  return config;
};

instance.interceptors.request.use(setToken);

export default {
  GET: (endpoint, additionalPath) =>
    instance.get(`${endpoint}${additionalPath ? `/${additionalPath}` : ''}`),
  POST: (endpoint, body) => instance.post(endpoint, body),
  UPDATE: (endpoint, urlParam, body) =>
    instance.post(`${endpoint}/${urlParam}`, body),
  DELETE: (endpoint, urlParam) => instance.delete(`${endpoint}/${urlParam}`),
  WITHDRAWAL: (endpoint, passwordInfo) =>
    instance.delete(`${endpoint}/setting/withdrawal`, {
      data: passwordInfo,
      withCredentials: true,
    }),
};
