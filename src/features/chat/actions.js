import { createAction } from 'redux-actions';
// import axios from 'axios';
import {
  LOAD_MESSAGES,
  GET_MESSAGE,
  LOADING,
  WRITE_MESSAGE,
  LOAD_NONETALK_ROOM_LIST,
  LOAD_TALK_ROOM_LIST,
} from './types';
import T from '../../api/tokenInstance';

export const loadMessages = createAction(LOAD_MESSAGES, (messageList) => ({
  messageList,
}));
export const getMessage = createAction(GET_MESSAGE, (message) => ({
  message,
}));
export const writeMessage = createAction(WRITE_MESSAGE, (messageText) => ({
  messageText,
}));
export const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

export const loadTalkRoomList = createAction(
  LOAD_TALK_ROOM_LIST,
  (roomList) => ({
    roomList,
  }),
);

export const loadNoneTalkRoomList = createAction(
  LOAD_NONETALK_ROOM_LIST,
  (roomList) => ({
    roomList,
  }),
);

export const loadMessagesToAxios = (roomId) => async (dispatch) => {
  try {
    const { data } = await T.GET('/chat/getmsg', roomId);
    console.log('리스폰스 ============> ', data);
    dispatch(loadMessages(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadTalkRoomListToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap/getothers/1');
    console.log(data);
    console.log(dispatch);
    // dispatch(loadTalkRoomList())
  } catch (error) {
    console.error(error);
  }
};

export const loadNoneTalkRoomListToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap/getothers/2');
    console.log(data);
    console.log(dispatch);
    // dispatch(loadTalkRoomList())
  } catch (error) {
    console.error(error);
  }
};
