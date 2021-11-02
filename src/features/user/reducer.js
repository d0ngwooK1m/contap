/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { LOG_IN, LOG_OUT, AUTHORIZED } from './types';

const initialState = {
  email: '',
  userName: '',
  isAuthorized: false,
};

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN:
      case AUTHORIZED: {
        draft.email = action.payload.email;
        draft.nickName = action.payload.nickName;
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
