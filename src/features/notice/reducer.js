import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { GLOBAL_NOTI, CHAT_NOTI, TAP_NOTI } from './types';

const initialState = {
  isGlobalNoti: false,
};

export default handleActions(
  {
    [GLOBAL_NOTI]: (state, action) =>
      produce(state, (draft) => {
        console.log('페이로드 ===> ', action.payload);
        draft.isGlobalNoti = action.payload.isNoti;
      }),
    [CHAT_NOTI]: (state, action) =>
      produce(state, (draft) => {
        console.log('페이로드 ===> ', action.payload);
        console.log(draft);
      }),
    [TAP_NOTI]: (state, action) =>
      produce(state, (draft) => {
        console.log('페이로드 ===> ', action.payload);
        console.log(draft);
      }),
  },
  initialState,
);
