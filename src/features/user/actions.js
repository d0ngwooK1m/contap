/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  WITHDRAWAL,
  LOG_IN,
  LOG_OUT,
  PASSWORD_CHANGE,
  AUTHORIZED,
} from './types';
import { saveToken } from '../../utils/auth';
import { history } from '../configureStore';

// 나중에 백엔드 URL로 바꿀 것
const baseURL = process.env.REACT_APP_SERVER_URI;

// 회원 탈퇴 미정
const withdrawal = (withdrawalInfo) => ({
  type: WITHDRAWAL,
  withdrawalInfo,
});

const login = (userInfo) => ({
  type: LOG_IN,
  userInfo,
});

// 로그아웃 미들웨어 없음
const logout = () => ({ type: LOG_OUT });

const passwordChange = (changedPassword) => ({
  type: PASSWORD_CHANGE,
  changedPassword,
});

const authorize = (email, username) => ({
  type: AUTHORIZED,
  payload: { email, username },
});

// 기존 프로젝트의 미들웨어
const emailCheckToServer = (emailInfo) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/signup/emailcheck`, emailInfo);
    // const res = await axios.post(`${baseURL}/user/emailcheck`, emailInfo);
    const { data } = res;
    console.log(data);

    if (data.result === 'success') {
      console.log(emailInfo);
    }

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const signupToServer = (signupInfo) => async () => {
  try {
    console.log(baseURL);
    const res = await axios.post(`${baseURL}/user/signup`, signupInfo);

    const { data } = res;
    console.log(data);
    history.push('/login');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const loginToServer = (loginInfo) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/user/login`, loginInfo);
    const { data } = res;

    if (data.result === 'fail') {
      console.log(data);
      return data;
    }

    const userInfo = {
      email: data.email,
      nickName: data.nickName,
    };

    dispatch(login(userInfo));
    console.log(data);
    saveToken(data?.token);
    history.push('/');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export {
  withdrawal,
  login,
  logout,
  emailCheckToServer,
  signupToServer,
  loginToServer,
  authorize,
};
