/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import {
  LOG_IN,
  LOG_OUT,
  AUTHORIZED,
  EMAIL_AUTH,
  AUTH_CHECK,
  BACK_TO_PREV,
  SIGNUP_DONE,
  ALARM_CHECK,
  SETTING_ALARM,
  SETTING_PHONENUM,
  PROFILE_TUTORIAL,
  PHONE_TUTORIAL,
} from './types';

const initialState = {
  email: '',
  userName: '',
  profile: '',
  isAuthorized: false,
  isEmailChecked: false,
  isAuthNumChecked: false,
  isSignupDone: false,
  checkedEmail: '',
  phoneNumber: '',
  alarm: 0,
  canOtherRead: 0,
  tutorial: {
    phoneTutorial: null,
    profileTutorial: null,
  },
};

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN: {
        draft.email = action.payload.email;
        draft.userName = action.payload.userName;
        draft.profile = action.payload.profile;
        draft.isAuthorized = true;
        break;
      }
      case EMAIL_AUTH: {
        draft.isEmailChecked = true;
        console.log(action.emailInfo.email);
        draft.checkedEmail = action.emailInfo.email;
        console.log(draft.checkedEmail);
        break;
      }
      case AUTH_CHECK: {
        draft.isAuthNumChecked = true;
        break;
      }
      case BACK_TO_PREV: {
        draft.isEmailChecked = false;
        break;
      }
      case SIGNUP_DONE: {
        draft.isSignupDone = true;
        break;
      }
      case AUTHORIZED: {
        draft.email = action.payload.email;
        draft.userName = action.payload.userName;
        draft.profile = action.payload.profile;
        draft.isAuthorized = true;
        break;
      }
      case LOG_OUT: {
        draft.email = '';
        draft.userName = '';
        draft.isAuthorized = false;
        break;
      }
      case ALARM_CHECK: {
        if (action.alarmInfo.phoneTutorial !== 0) {
          draft.tutorial.phoneTutorial = true;
        } else {
          draft.tutorial.phoneTutorial = false;
        }

        if (action.alarmInfo.profileTutorial !== 0) {
          draft.tutorial.profileTutorial = true;
        } else {
          draft.tutorial.profileTutorial = false;
        }

        if (action.alarmInfo.canOtherRead !== 0) {
          //  내 뒷면 카드가 있을 때 다른 사람 카드 읽기 가능
          draft.canOtherRead = 1;
        } else {
          // 내 뒷면 카드가 없을 때  다른 사람 못 읽게 하기
          draft.canOtherRead = 0;
        }

        if (action.alarmInfo.alarm !== 0) {
          draft.alarm = 1;
        } else {
          draft.alarm = 0;
        }
        break;
      }
      case SETTING_ALARM: {
        draft.alarm = action.settingAlarmInfo.alarmState;
        break;
      }
      case SETTING_PHONENUM: {
        draft.phoneNumber = action.settingPhoneInfo.phoneNumber;
        break;
      }
      case PROFILE_TUTORIAL: {
        console.log(action.profileInfo);
        draft.tutorial.profileTutorial = action.profileInfo;
        break;
      }
      case PHONE_TUTORIAL: {
        console.log(action.phoneInfo);
        draft.tutorial.profileTutorial = action.phoneInfo;
        break;
      }
      default:
        break;
    }
  });
}

console.log(initialState);
