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
  CLOSE_NONETALK_ROOM_LIST,
  NEXT_PAGE,
  CREATE_TALK_ROOM,
} from './types';
import T from '../../api/tokenInstance';

export const loadMessages = createAction(LOAD_MESSAGES, (messageList) => ({
  messageList,
}));

export const nextPage = createAction(NEXT_PAGE, (messageList) => ({
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

export const closeNoneTalkRoomList = createAction(
  CLOSE_NONETALK_ROOM_LIST,
  () => ({}),
);

export const createTalkRoom = createAction(CREATE_TALK_ROOM, (room) => ({
  room,
}));

export const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

export const loadMessagesToAxios = (roomId, page) => async (dispatch) => {
  try {
    console.log('/chat/getmsg', `${roomId}/${page}`);
    const { data } = await T.GET('/chat/getmsg', `${roomId}/${page}`);
    console.log('리스폰스 ============> ', data);
    dispatch(loadMessages(data));
  } catch (error) {
    console.error(error);
  }
};

export const nextPageToAxios = (roomId, page) => async (dispatch) => {
  try {
    const { data } = await T.GET('/chat/getmsg', `${roomId}/${page}`);
    // const { data } = await T.GET('/contap/getothers');
    console.log('리스폰스 ============> ', data);
    console.log(data);
    dispatch(nextPage(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadTalkRoomListToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap/getothers/1');
    // const { data } = await T.GET('/contap/getothers');
    dispatch(loadTalkRoomList(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadNoneTalkRoomListToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap/getothers/0');
    // const { data } = await T.GET('/contap/getothers');
    console.log(data);
    dispatch(loadNoneTalkRoomList(data));
  } catch (error) {
    console.error(error);
  }
};
