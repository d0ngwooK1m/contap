import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import {
  LOAD_MESSAGES,
  GET_MESSAGE,
  WRITE_MESSAGE,
  LOAD_TALK_ROOM_LIST,
  LOAD_NONETALK_ROOM_LIST,
  LOAD_CURRENT_ROOM,
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
  isLoading: true,
};

export default handleActions(
  {
    [LOAD_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = [];
        console.log('LOAD_MESSAGES');
        console.log(action.payload);
        draft.messages = action.payload.messageList;
      }),
    [GET_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        console.log('GET_MESSAGE');
        console.log('액션 ======>', action.payload);
        console.log('스테이트 ======>', state.messages);

        draft.messages.unshift(action.payload.message);
        draft.isLoading = true;
      }),
    [WRITE_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        console.log('WRITE_MESSAGE');
        console.log(action.payload);
        console.log(draft);
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
    [LOAD_CURRENT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.current = action.payload.roomInfo;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        console.log('LOADING');
        console.log(action.payload);
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState,
);
