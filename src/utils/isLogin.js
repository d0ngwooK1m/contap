/*eslint-disable */
import { getToken, removeToken } from './auth';
import tokenAxios from '../api/tokenInstance';

const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const isLogin = () => {
  const token = getToken();
  if (!token) {
    return false;
  }

  async function authCheck() {
    try {
      const { data } = await tokenAxios.GET('/auth');
      if (data.result === 'fail') {
        removeToken(TOKEN_KEY);
        return null;
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
    return null;
  }

  authCheck();

  return true
};

export default isLogin;
