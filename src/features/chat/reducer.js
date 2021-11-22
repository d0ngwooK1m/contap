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
  noneChatList: {},
  noneChatListIds: [],
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
        // draft.isLoading = false;
      }),
    [NEXT_PAGE]: (state, action) =>
      produce(state, (draft) => {
        console.log('NEXT_PAGE');
        console.log(action.payload.messageList.length);
        if (action.payload.messageList.length < 15) {
          console.log('여기 걸렸음');

          action.payload.messageList.forEach((doc) => {
            doc.isNext = false;
            console.log('마지막 페이지', doc);
            draft.messages.unshift(doc);
          });
          return;
        }
        action.payload.messageList.forEach((doc) => {
          doc.isNext = true;
          console.log(doc);
          draft.messages.unshift(doc);
        });

        // draft.isLoading = false;
      }),
    [GET_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        console.log('GET_MESSAGE');
        console.log('액션 ======>', action.payload);
        console.log('스테이트 ======>', state.messages);

        draft.messages.push(action.payload.message);
        // draft.isLoading = true;
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
        draft.noneChatList = {};
        draft.noneChatListIds = [];
        action.payload.roomList.forEach((doc) => {
          draft.noneChatList[doc.userId] = doc;
          draft.noneChatListIds.push(doc.userId);
        });
      }),
    [CLOSE_NONETALK_ROOM_LIST]: (state) =>
      produce(state, (draft) => {
        draft.noneChatListIds = [];
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
        draft.noneChatListIds = [];
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
