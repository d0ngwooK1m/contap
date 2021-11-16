import { createAction } from 'redux-actions';
// import axios from 'axios';
import {
  LOAD_MESSAGES,
  GET_MESSAGE,
  LOADING,
  WRITE_MESSAGE,
  LOAD_NONETALK_ROOM_LIST,
  LOAD_TALK_ROOM_LIST,
  LOAD_CURRENT_ROOM,
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

export const loadCurrentRoom = createAction(LOAD_CURRENT_ROOM, (roomInfo) => ({
  roomInfo,
}));

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

export const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

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
    // const { data } = await T.GET('/contap/getothers/1');
    const { data } = await T.GET('/contap/getothers');
    dispatch(loadTalkRoomList(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadNoneTalkRoomListToAxios = () => async (dispatch) => {
  try {
    // const { data } = await T.GET('/contap/getothers/2');
    const { data } = await T.GET('/contap/getothers');
    console.log(data);
    dispatch(loadNoneTalkRoomList(data));
  } catch (error) {
    console.error(error);
  }
};
