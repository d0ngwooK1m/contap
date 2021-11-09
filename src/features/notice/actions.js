import { createAction } from 'redux-actions';
import {
  BEFORE_CHAT_NOTI,
  BEFORE_CONTAP_NOTI,
  CHAT_NOTI,
  TAP_NOTI,
  GRAB_NOTI,
  CONTAP_NOTI,
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
export const setChatNoti = createAction(CHAT_NOTI, (isNoti) => ({ isNoti }));
export const setContapNoti = createAction(CONTAP_NOTI, (isNoti) => ({
  isNoti,
}));
export const setTapNoti = createAction(TAP_NOTI, (isNoti) => ({ isNoti }));
export const setGrabNoti = createAction(GRAB_NOTI, (isNoti) => ({ isNoti }));
