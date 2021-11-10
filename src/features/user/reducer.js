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
} from './types';

const initialState = {
  email: '',
  userName: '',
  isAuthorized: false,
  isEmailChecked: false,
  isAuthNumChecked: false,
  isSignupDone: false,
  checkedEmail: '',
};

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN: {
        draft.email = action.payload.email;
        draft.userName = action.payload.userName;
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
        draft.isAuthorized = true;
        break;
      }
      case LOG_OUT: {
        draft.email = '';
        draft.userName = '';
        draft.isAuthorized = false;
        break;
      }
      default:
        break;
    }
  });
}

console.log(initialState);
