import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import {
  LOAD_MESSAGES,
  GET_MESSAGE,
  WRITE_MESSAGE,
  LOAD_TALK_ROOM_LIST,
  LOAD_NONETALK_ROOM_LIST,
  LOAD_CURRENT_ROOM,
  CREATE_TALK_ROOM,
  CLOSE_NONETALK_ROOM_LIST,
  NEXT_PAGE,
  LOADING,
} from './types';

const initialState = {
  byId: {},
  allIds: [],
  current: {},
  noneChatList: [],
  roomId: null,
  messages: [],
  messageText: '',
  isLoading: false,
  isNext: true,
};

export default handleActions(
  {
    [LOAD_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = [];
        draft.messages = action.payload.messageList;
        draft.isNext = true;
        draft.isLoading = false;
      }),
    [NEXT_PAGE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.messageList.length < 15) {
          draft.isNext = false;
          action.payload.messageList.forEach((doc) => {
            draft.messages.unshift(doc);
          });
          draft.isLoading = false;
          return;
        }
        action.payload.messageList.forEach((doc) => {
          draft.messages.unshift(doc);
        });
        draft.isLoading = false;
      }),
    [GET_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.messages.push(action.payload.message);
        draft.isLoading = false;
      }),
    [WRITE_MESSAGE]: (state) =>
      produce(state, (draft) => {
        // console.log('WRITE_MESSAGE');
        // console.log(draft);
        draft.isLoading = false;
      }),
    [LOAD_TALK_ROOM_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];
        action.payload.roomList.forEach((doc) => {
          if (doc.userId !== null) {
            draft.byId[doc.userId] = doc;
            draft.allIds.push(doc.userId);
          }
        });
      }),
    [LOAD_NONETALK_ROOM_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.noneChatList = action.payload.roomList;
      }),
    [CLOSE_NONETALK_ROOM_LIST]: (state) =>
      produce(state, (draft) => {
        draft.noneChatList = [];
      }),
    [LOAD_CURRENT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.current = action.payload.roomInfo;
      }),
    [CREATE_TALK_ROOM]: (state, action) =>
      produce(state, (draft) => {
        const { userId } = action.payload.room;
        draft.byId[userId] = action.payload.room;
        draft.allIds.push(userId);
        draft.noneChatList = [];
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState,
);
