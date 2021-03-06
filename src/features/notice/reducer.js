import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import {
  BEFORE_CHAT_NOTI,
  BEFORE_CONTAP_NOTI,
  CHAT_NOTI,
  CONTAP_NOTI,
  // TAP_REFUSE_NOTI,
  TAP_RECEIVE_NOTI,
  TAP_ACCEPT_NOTI,
} from './types';

const initialState = {
  isBeforeChatNoti: false,
  isBeforeContapNoti: false,
  isTapReceiveNoti: false,
  isTapAcceptNoti: false,
  // isContapNoti: !!(isTapReceiveNoti || isTapAcceptNoti),
  isChatNoti: false,
  // isTapRefuseNoti: false,
};

export default handleActions(
  {
    [BEFORE_CHAT_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isBeforeNoti = action.payload.isNoti;
      }),
    [BEFORE_CONTAP_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isBeforeContapNoti = action.payload.isNoti;
      }),
    [CONTAP_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isContapNoti = action.payload.isNoti;
      }),
    [CHAT_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isChatNoti = action.payload.isNoti;
      }),
    [TAP_RECEIVE_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isTapReceiveNoti = action.payload.isNoti;
        if (action.payload.isNoti) {
          draft.isContapNoti = true;
        }
      }),
    [TAP_ACCEPT_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isTapAcceptNoti = action.payload.isNoti;
        if (action.payload.isNoti) {
          draft.isContapNoti = true;
        }
      }),
    // [TAP_REFUSE_NOTI]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.isTapRefuseNoti = action.payload.isNoti;
    //     draft.isContapNoti = true;
    //   }),
  },
  initialState,
);
