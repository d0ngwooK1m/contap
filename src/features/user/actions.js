/* eslint-disable no-unused-vars */
import axios from 'axios';
import Swal from 'sweetalert2';
import { WITHDRAWAL, LOG_IN, LOG_OUT, AUTHORIZED, EMAIL_AUTH } from './types';
import { saveToken, removeToken } from '../../utils/auth';
import tokenAxios from '../../api/tokenInstance';
import { history } from '../configureStore';

// 나중에 백엔드 URL로 바꿀 것
const baseURL = process.env.REACT_APP_SERVER_URI;
// const baseURL = process.env.REACT_APP_TEST_SERVER_URI;
console.log(baseURL);

// 회원 탈퇴 미정
const withdrawal = (withdrawalInfo) => ({
  type: WITHDRAWAL,
  withdrawalInfo,
});

const emailAuth = () => ({
  type: EMAIL_AUTH,
});

const login = (payload) => ({
  type: LOG_IN,
  payload,
});

// 로그아웃 미들웨어 없음
const logout = () => ({ type: LOG_OUT });

const authorize = (email, userName) => ({
  type: AUTHORIZED,
  payload: { email, userName },
});

// 기존 프로젝트의 미들웨어
// const emailCheckToServer = (emailInfo) => async () => {
//   try {
//     const res = await axios.post(`${baseURL}/signup/emailcheck`, emailInfo);
//     const { data } = res;
//     console.log(data);

//     if (data.result === 'success') {
//       console.log(emailInfo);
//     }

//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error.message);
//   }
// };

// const userNameCheckToServer = (userNameInfo) => async () => {
//   try {
//     // const res = await axios.post(`${baseURL}/user/namecheck`, userNameInfo);
//     const res = await axios.post(`${baseURL}/signup/namecheck`, userNameInfo);

//     const { data } = res;
//     console.log(data);

//     if (data.result === 'success') {
//       console.log(userNameInfo);
//     }

//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const sendEmailAuth = (emailInfo) => async () => {
  try {
    console.log(emailInfo);
    const res = await axios.post(`${baseURL}/email/send`, emailInfo);
    const { data } = res;
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const sendAuthInfo = (authInfo) => async (dispatch) => {
  try {
    console.log(authInfo);
    const res = await axios.post(`${baseURL}/email/confirm`, authInfo);
    const { data } = res;
    console.log(data);
    dispatch(emailAuth());
    return data;
  } catch (error) {
    console.log(error);
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

    if (data.result === 'fail') {
      console.log(data);
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: `${data.errorMessage}`,
      });
      return data;
    }

    if (data.result === 'success') {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: '회원가입 성공!',
      });
      history.push('/login');
      return data;
    }

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
    console.log('로그인 res =====>', res);
    console.log('로그인 data =====>', data);

    if (data.result === 'fail') {
      console.log(data);
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: `${data.errorMessage}`,
      });
      return data;
    }

    // console.log(data);
    const userInfo = {
      email: data.email,
      userName: data.userName,
    };

    // console.log(data);

    // if (data.result === 'success') {
    //   console.log(data);
    //   Swal.fire({
    //     icon: 'success',
    //     title: '로그인 성공!',
    //   });
    //   dispatch(login(userInfo));
    //   saveToken(data?.token);
    //   history.push('/');
    //   return data;
    // }
    dispatch(login(userInfo));
    saveToken(data?.token);
    history.push('/');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const passwordChangeToServer = (passwordInfo) => async () => {
  try {
    const res = await tokenAxios.POST(
      `${baseURL}/setting/password`,
      passwordInfo,
    );

    const { data } = res;
    console.log(data);

    if (data.result === 'fail') {
      console.log(data);
      Swal.fire({
        icon: 'error',
        title: '비밀번호 변경 실패',
        text: `${data.errorMessage}`,
      });
      return data;
    }

    if (data.result === 'success') {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: '비밀번호 변경 성공!',
      });
      history.push('/');
      return data;
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const withdrawalToServer = (passwordInfo) => async (dispatch) => {
  try {
    const res = await tokenAxios.WITHDRAWAL(baseURL, passwordInfo);

    const { data } = res;
    console.log(data);

    if (data.result === 'fail') {
      console.log(data);
      Swal.fire({
        icon: 'error',
        title: '탈퇴 실패',
        text: `${data.errorMessage}`,
      });

      return data;
    }
    removeToken();
    window.location.href = '/';
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  login,
  logout,
  sendEmailAuth,
  sendAuthInfo,
  signupToServer,
  loginToServer,
  passwordChangeToServer,
  withdrawalToServer,
  authorize,
};
