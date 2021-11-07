import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import {
  BEFORE_NOTI,
  CHAT_NOTI,
  TAP_NOTI,
  GRAB_NOTI,
  CONTAP_NOTI,
} from './types';

const initialState = {
  isBeforeNoti: false,
  isContapNoti: false,
  isChatNoti: false,
  isTapNoti: false,
  isGrabNoti: false,
};

export default handleActions(
  {
    [BEFORE_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isBeforeNoti = action.payload.isNoti;
      }),
    [CONTAP_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isContapNoti = action.payload.isNoti;
      }),
    [CHAT_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isChatNoti = action.payload.isNoti;
      }),
    [TAP_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isTapNoti = action.payload.isNoti;
      }),
    [GRAB_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.isGrabNoti = action.payload.isNoti;
      }),
  },
  initialState,
);
