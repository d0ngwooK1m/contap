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

const signup = (payload) => ({
  type: SIGN_UP,
  payload,
});

// 회원 탈퇴 미정
const withdrawal = () => ({ type: WITHDRAWAL });

const login = (payload) => ({
  type: LOG_IN,
  payload,
});

// 로그아웃 미들웨어 없음
const logout = () => ({ type: LOG_OUT });

const authorize = (email, username) => ({
  type: AUTHORIZED,
  payload: { email, username },
});

// 기존 프로젝트의 미들웨어
const signupToServer = (email, pw, pwCheck, userName) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/signup`, {
      email,
      pw,
      pwCheck,
      userName,
    });

    const { data } = res;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const loginToServer = (email, pw) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/login`, { email, pw });
    const { data } = res;

    if (data.result === 'fail') {
      return data;
    }

    dispatch(login({ email: data.email, nickName: data.nickName }));

    return data;
  } catch (error) {
    console.log(error);
    // throw new Error(error.message);
    return false;
  }
};

export { signup, withdrawal, login, logout, loginToServer, authorize };
