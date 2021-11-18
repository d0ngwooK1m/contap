import { createAction } from 'redux-actions';
import {
  BEFORE_CHAT_NOTI,
  BEFORE_CONTAP_NOTI,
  CHAT_NOTI,
  CONTAP_NOTI,
  TAP_ACCEPT_NOTI,
  TAP_RECEIVE_NOTI,
  TAP_REFUSE_NOTI,
} from './types';

export const setBeforeChatNoti = createAction(BEFORE_CHAT_NOTI, (isNoti) => ({
  isNoti,
}));
export const setBeforeContapNoti = createAction(
  BEFORE_CONTAP_NOTI,
  (isNoti) => ({
    isNoti,
  }),
);
export const setChatNoti = createAction(CHAT_NOTI, (isNoti, roomId) => ({
  isNoti,
  roomId,
}));
export const setContapNoti = createAction(CONTAP_NOTI, (isNoti) => ({
  isNoti,
}));
export const setTapReceiveNoti = createAction(TAP_RECEIVE_NOTI, (isNoti) => ({
  isNoti,
}));
export const setTapAcceptNoti = createAction(TAP_ACCEPT_NOTI, (isNoti) => ({
  isNoti,
}));
export const setTapRefuseNoti = createAction(TAP_REFUSE_NOTI, (isNoti) => ({
  isNoti,
}));
