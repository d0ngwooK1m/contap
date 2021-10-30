/* eslint-disable no-unused-vars */
import axios from 'axios';
import { WITHDRAWAL, LOG_IN, LOG_OUT, AUTHORIZED } from './types';
import { saveToken } from '../../utils/auth';
import tokenAxios from '../../api/tokenInstance';
import { history } from '../configureStore';

// 나중에 백엔드 URL로 바꿀 것
const baseURL = process.env.REACT_APP_SERVER_URI;

// 회원 탈퇴 미정
const withdrawal = (withdrawalInfo) => ({
  type: WITHDRAWAL,
  withdrawalInfo,
});

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
const emailCheckToServer = (emailInfo) => async () => {
  try {
    const res = await axios.post(`${baseURL}/user/emailcheck`, emailInfo);
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

const userNameCheckToServer = (userNameInfo) => async () => {
  try {
    // const res = await axios.post(`${baseURL}/user/namecheck`, userNameInfo);
    const res = await axios.post(`${baseURL}/signup/namecheck`, userNameInfo);

    const { data } = res;
    console.log(data);

    if (data.result === 'success') {
      console.log(userNameInfo);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const signupToServer = (signupInfo) => async () => {
  try {
    console.log(baseURL);
    console.log(signupInfo);
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

    // console.log(data);
    const userInfo = {
      email: data.email,
      nickname: data.nickname,
    };

    dispatch(login(userInfo));
    // console.log(data);
    saveToken(data?.token);
    history.push('/');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

// passwordChangeToServer = (passwordInfo) => (dispatch) => {
//   try {
//     const res = tokenAxios.POST(baseURL, 'settings/password')
//   }
// }

export {
  withdrawal,
  login,
  logout,
  emailCheckToServer,
  userNameCheckToServer,
  signupToServer,
  loginToServer,
  authorize,
};
