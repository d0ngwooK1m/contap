/* eslint-disable no-unused-vars */
// import axios from 'axios';
// import Swal from 'sweetalert2';
import {
  WITHDRAWAL,
  LOG_IN,
  LOG_OUT,
  AUTHORIZED,
  EMAIL_AUTH,
  EMAIL_TIMER,
  AUTH_CHECK,
  BACK_TO_PREV,
  SIGNUP_DONE,
  ALARM_CHECK,
  SETTING_ALARM,
  SETTING_PHONENUM,
  PROFILE_TUTORIAL,
  PHONE_TUTORIAL,
} from './types';

// import { setChatNoti, setContapNoti } from '../notice/actions';
// import { saveToken, removeToken } from '../../utils/auth';
// import tokenAxios from '../../api/tokenInstance';
// import { history } from '../configureStore';

// 나중에 백엔드 URL로 바꿀 것
const baseURL = process.env.REACT_APP_SERVER_URI;
// const baseURL = process.env.REACT_APP_TEST_SERVER_URI;
console.log(baseURL);

// 회원 탈퇴 미정
const withdrawal = (withdrawalInfo) => ({
  type: WITHDRAWAL,
  withdrawalInfo,
});

const emailAuth = (emailInfo) => ({
  type: EMAIL_AUTH,
  emailInfo,
});

const emailTimer = (timerInfo) => ({
  type: EMAIL_TIMER,
  timerInfo,
});

const authCheck = () => ({
  type: AUTH_CHECK,
});

const backToPrev = () => ({
  type: BACK_TO_PREV,
});

const signupDone = () => ({
  type: SIGNUP_DONE,
});

const login = (payload) => ({
  type: LOG_IN,
  payload,
});

// 로그아웃 미들웨어 없음
const logout = () => ({ type: LOG_OUT });

const authorize = (email, userName, profile) => ({
  type: AUTHORIZED,
  payload: { email, userName, profile },
});

const alarmCheck = (alarmInfo) => ({
  type: ALARM_CHECK,
  alarmInfo,
});

const settingAlarm = (settingAlarmInfo) => ({
  type: SETTING_ALARM,
  settingAlarmInfo,
});

const settingPhoneNum = (settingPhoneInfo) => ({
  type: SETTING_PHONENUM,
  settingPhoneInfo,
});

const profileTutorialCheck = (profileInfo) => ({
  type: PROFILE_TUTORIAL,
  profileInfo,
});

const phoneTutorialCheck = (phoneInfo) => ({
  type: PHONE_TUTORIAL,
  phoneInfo,
});

// const phoneTutorialCheck = (tutorialInfo) => ({
// });

// const sendEmailAuth = (emailInfo) => async (dispatch) => {
//   try {
//     console.log(emailInfo);
//     const res = await axios.post(`${baseURL}/email/send`, emailInfo);
//     const { data } = res;
//     console.log(data);
//     dispatch(emailAuth(emailInfo));

//     return data;
//   } catch (error) {
//     console.log(error);
//     // throw new Error(error.message);
//     return error.Message;
//   }
// };

// const sendAuthInfo = (authInfo) => async (dispatch) => {
//   try {
//     console.log(authInfo);
//     const res = await axios.post(`${baseURL}/email/confirm`, authInfo);
//     const { data } = res;
//     console.log(data);
//     dispatch(authCheck());
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error.message);
//   }
// };

// const signupToServer = (signupInfo) => async (dispatch) => {
//   try {
//     console.log(baseURL);
//     console.log(signupInfo);
//     const res = await axios.post(`${baseURL}/user/signup`, signupInfo);
//     const { data } = res;
//     console.log(data);

//     if (data.result === 'fail') {
//       console.log(data);
//       Swal.fire({
//         icon: 'error',
//         title: '실패',
//         text: `${data.errorMessage}`,
//       });
//       return data;
//     }

//     dispatch(signupDone());

//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error.message);
//   }
// };

// const loginToServer = (loginInfo) => async (dispatch) => {
//   try {
//     const res = await axios.post(`${baseURL}/user/login`, loginInfo);
//     const { data } = res;
//     console.log('로그인 res =====>', res);
//     console.log('로그인 data =====>', data.CHAT);
//     if (data.CHAT !== '0') {
//       dispatch(setChatNoti(true));
//     }
//     if (data.ACCEPT_TAP !== '0' || data.TAP_RECEIVE !== '0') {
//       dispatch(setContapNoti(true));
//     }
//     if (data.result === 'fail') {
//       console.log(data);
//       Swal.fire({
//         icon: 'error',
//         title: '로그인 실패',
//         text: `${data.errorMessage}`,
//       });
//       return data;
//     }

//     // console.log(data);
//     const userInfo = {
//       email: data.email,
//       userName: data.userName,
//     };

//     dispatch(login(userInfo));
//     saveToken(data?.token);
//     history.push('/');
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error.message);
//   }
// };

// const passwordChangeToServer = (passwordInfo) => async () => {
//   try {
//     const res = await tokenAxios.POST('/setting/password', passwordInfo);

//     const { data } = res;
//     console.log(data);

//     if (data.result === 'fail') {
//       console.log(data);
//       Swal.fire({
//         icon: 'error',
//         title: '비밀번호 변경 실패',
//         text: `${data.errorMessage}`,
//       });
//       return data;
//     }

//     if (data.result === 'success') {
//       console.log(data);
//       Swal.fire({
//         icon: 'success',
//         title: '비밀번호 변경 성공!',
//       });
//       history.push('/');
//       return data;
//     }
//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// const withdrawalToServer = (passwordInfo) => async (dispatch) => {
//   try {
//     const res = await tokenAxios.POST('/setting/withdrawal', passwordInfo);

//     const { data } = res;
//     console.log(data);

//     if (data.result === 'fail') {
//       console.log(data);
//       Swal.fire({
//         icon: 'error',
//         title: '탈퇴 실패',
//         text: `${data.errorMessage}`,
//       });

//       return data;
//     }
//     removeToken();
//     window.location.href = '/';
//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

export {
  login,
  logout,
  backToPrev,
  authCheck,
  emailTimer,
  signupDone,
  alarmCheck,
  settingAlarm,
  settingPhoneNum,
  profileTutorialCheck,
  phoneTutorialCheck,
  // sendEmailAuth,
  // sendAuthInfo,
  // signupToServer,
  // loginToServer,
  // passwordChangeToServer,
  // withdrawalToServer,
  authorize,
  emailAuth,
};
