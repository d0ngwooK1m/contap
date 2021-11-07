import { createAction } from 'redux-actions';
import { GLOBAL_NOTI, CHAT_NOTI, TAP_NOTI } from './types';

export const setNoti = createAction(GLOBAL_NOTI, (isNoti) => ({ isNoti }));
export const setChatNoti = createAction(CHAT_NOTI, (isNoti) => ({ isNoti }));
export const setTapNoti = createAction(TAP_NOTI, (isNoti) => ({ isNoti }));
