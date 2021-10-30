/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { LOG_IN, LOG_OUT } from './types';

const initialState = {
  email: '',
  nickname: '',
  isAuthorized: false,
};

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN: {
        console.log(action.payload);
        draft.email = action.payload.email;
        draft.nickname = action.payload.nickName;
        // draft.isAuthorized = true;
        break;
      }
      // case AUTHORIZED: {
      //   draft.email = action.payload.email;
      //   draft.nickName = action.payload.nickName;
      //   draft.isAuthorized = true;
      //   break;
      // }
      case LOG_OUT: {
        draft.email = '';
        draft.nickName = '';
        draft.isAuthorized = false;
        break;
      }
      default:
        break;
    }
  });
}

console.log(initialState);
