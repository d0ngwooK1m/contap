/* eslint-disable */
import { handleActions } from 'redux-actions';
import { produce } from 'immer'; // reducer 불변성 유지
import {
  LOAD_CARD,
  SEARCH_CARD,
  SEARCH_ARR,
  SEARCH_STACK,
  SEARCH_HOBBY,
  EDIT_CARD_PROFILE,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  LOAD_CURRENT_CARD,
  SET_PREVIEW,
  LOAD_MY_CARD,
  SET_STACK,
  DELETE_STACK,
  SET_HOBBY,
  DELETE_HOBBY,
  IS_SUCCESS,
} from './types';

const initialState = {
  byId: {},
  allIds: [],
  current: {},
  preview: null,
  cardList: {},
  searchInfo: {},
  searchArr: [],
  stackArr: [],
  hobbyArr: [],
  isSearching: false,
  stack: [],
  hobby: [],
};

export default handleActions(
  {
    // immer를 이용한 불변성 유지! - produce 사용
    [LOAD_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];
        // console.log(action.payload);
        action.payload.cardList.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
        });
      }),
    [SEARCH_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.isSearching = true;
        console.log(draft.isSearching);
        draft.searchInfo = action.payload.searchInfo;
        console.log(draft.searchInfo);
        if (action.payload.searchInfo.page === 1) {
          draft.byId = {};
          draft.allIds = [];

          action.payload.cardList.forEach((doc) => {
            draft.byId[doc.userId] = doc;
            draft.allIds.push(doc.userId);
          });
        } else {
          action.payload.cardList.forEach((doc) => {
            draft.byId[doc.userId] = doc;
            draft.allIds.push(doc.userId);
          });
        }
      }),
    [SEARCH_ARR]: (state, action) =>
      produce(state, (draft) => {
        draft.searchArr = action.payload.searchList;
      }),
    [SEARCH_STACK]: (state, action) =>
      produce(state, (draft) => {
        draft.stackArr = action.payload.stackList;
      }),
    [SEARCH_HOBBY]: (state, action) =>
      produce(state, (draft) => {
        draft.hobbyArr = action.payload.hobbyList;
      }),
    [LOAD_CURRENT_CARD]: (state, action) =>
      produce(state, (draft) => {
        const { data } = action.payload;
        // console.log(action.payload);
        draft.current = data;
      }),
    [EDIT_CARD_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        const { userId } = action.payload;
        // console.log(action.payload);
        draft.byId[userId] = action.payload;
        draft.allIds.unshift(userId);
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [LOAD_MY_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];
        console.log(action.payload);
        const { card } = action.payload;
        const cardList = action.payload.card.cardDtoList;
        console.log(cardList);
        draft.current = card;
        draft.cardList = cardList;
        cardList.forEach((doc) => {
          draft.byId[doc.cardId] = doc;
          draft.allIds.push(doc.cardId);
        });
      }),
    [CREATE_CARD]: (state, action) =>
      produce(state, (draft) => {
        const { cardId } = action.payload;
        console.log(action.payload);
        draft.byId[cardId] = action.payload;
        draft.allIds.unshift(cardId);
      }),
    [UPDATE_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.current = action.payload;
        console.log(action.payload);
        draft.byId[action.payload.id] = action.payload;
      }),
    [DELETE_CARD]: (state, action) =>
      produce(state, (draft) => {
        delete draft.byId[action.payload];
        draft.allIds = draft.allIds.filter(
          (id) => id !== Number(action.payload),
        );
      }),
    [SET_STACK]: (state, action) =>
      produce(state, (draft) => {
        draft.stack.push(action.payload.stack);
      }),
    [DELETE_STACK]: (state, action) =>
      produce(state, (draft) => {
        if (draft.stack.length !== 0) {
          draft.stack = [];
        }
      }),
    [SET_HOBBY]: (state, action) =>
      produce(state, (draft) => {
        if (draft.hobby.length === 3) {
          draft.hobby.shift();
          draft.hobby.push(action.payload.hobby);
        }
        else {
          draft.hobby.push(action.payload.hobby);
        }
      }),
    [DELETE_HOBBY]: (state, action) =>
      produce(state, (draft) => {
        if (draft.hobby.length >= 1) {
          const deletedArr = [];
          draft.hobby.filter((val) => {
            if (val !== action.payload.hobby) {
              deletedArr.push(val);
            }
          });
          draft.hobby = deletedArr;
        }
      }),
    [IS_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.isSuccess = action.payload.success;
        console.log(action.payload);
      }),
  },
  initialState,
);
