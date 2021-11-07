import { createAction } from 'redux-actions';
import {
  BEFORE_NOTI,
  CHAT_NOTI,
  TAP_NOTI,
  GRAB_NOTI,
  CONTAP_NOTI,
} from './types';

export const setNoti = createAction(BEFORE_NOTI, (isNoti) => ({ isNoti }));
export const setChatNoti = createAction(CHAT_NOTI, (isNoti) => ({ isNoti }));
export const setContapNoti = createAction(CONTAP_NOTI, (isNoti) => ({
  isNoti,
}));
export const setTapNoti = createAction(TAP_NOTI, (isNoti) => ({ isNoti }));
export const setGrabNoti = createAction(GRAB_NOTI, (isNoti) => ({ isNoti }));
