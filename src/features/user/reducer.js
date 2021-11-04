/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { LOG_IN, LOG_OUT, AUTHORIZED, EMAIL_AUTH } from './types';

const initialState = {
  email: '',
  userName: '',
  isAuthorized: false,
  isEmailAuth: false,
};

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN:
      case EMAIL_AUTH: {
        draft.isEmailAuth = true;
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
