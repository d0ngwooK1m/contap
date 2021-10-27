/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  SIGN_UP,
  WITHDRAWAL,
  LOG_IN,
  LOG_OUT,
  PASSWORD_CHANGE,
  AUTHORIZED,
} from './types';

// 나중에 백엔드 URL로 바꿀 것
const baseURL = process.env.REACT_APP_LOCAL_SERVER_URI;

const signup = (signupInfo) => ({
  type: SIGN_UP,
  signupInfo,
});

const passwordChange = (changedPassword) => ({
  type: PASSWORD_CHANGE,
  changedPassword,
});

// 회원 탈퇴 미정
const withdrawal = (withdrawalInfo) => ({
  type: WITHDRAWAL,
  withdrawalInfo,
});

const login = (loginInfo) => ({
  type: LOG_IN,
  loginInfo,
});

// 로그아웃 미들웨어 없음
const logout = () => ({ type: LOG_OUT });

const authorize = (email, username) => ({
  type: AUTHORIZED,
  payload: { email, username },
});

// 기존 프로젝트의 미들웨어
const signupToServer = (signupInfo) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/signup`, signupInfo);

    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const loginToServer = (loginInfo) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/login`, loginInfo);
    const { data } = res;

    if (data.result === 'fail') {
      return data;
    }

    dispatch(login({ email: data.email, nickName: data.nickName }));

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export {
  signup,
  withdrawal,
  login,
  logout,
  signupToServer,
  loginToServer,
  authorize,
};
