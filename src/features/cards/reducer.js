/* eslint-disable */
import { handleActions } from 'redux-actions';
import { produce } from 'immer'; // reducer 불변성 유지
import {
  LOAD_CARD,
  SEARCH_CARD,
  SEARCH_ARR,
  EDIT_CARD_PROFILE,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  LOAD_CURRENT_CARD,
  SET_PREVIEW,
  LOAD_MY_CARD,
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
  isSearching: false,
  isSuccess: false,
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
    [LOAD_CURRENT_CARD]: (state, action) =>
      produce(state, (draft) => {
        const { data } = action.payload;
        // console.log(action.payload);
        draft.current = data;
      }),
    [EDIT_CARD_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        const { userId } = action.payload;
        console.log(action.payload);
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
        const { cardId } = action.payload.card;
        console.log(cardId);
        draft.byId[cardId] = action.payload.card;
        console.log(action.payload);
        draft.allIds.unshift(cardId);
        // 설마.... 콘솔이 실행될줄이야.....
        // console.log(draft.allIds.unshift(cardId));
      }),
    [UPDATE_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.current = action.payload;
        console.log(action.payload);
        draft.byId[action.payload.card.cardId] = action.payload.card;
        console.log(action.payload.card.cardId);
      }),
    [DELETE_CARD]: (state, action) =>
      produce(state, (draft) => {
        // draft.cardList = {};
        // draft.current = {};
        delete draft.byId[action.payload.cardId];
        // delete draft.cardList[draft.cardList.findIndex(action.payload.cardId)];
        console.log(action.payload);
        draft.allIds = draft.allIds.filter(
          (id) => id !== Number(action.payload.cardId),
        );
        console.log(draft.allIds);
      }),
    [IS_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.isSuccess = action.payload.success;
        console.log(action.payload);
      }),
  },
  initialState,
);
