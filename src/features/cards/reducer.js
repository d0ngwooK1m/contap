/* eslint-disable */
import { handleActions } from 'redux-actions';
import { produce } from 'immer'; // reducer 불변성 유지
import {
  LOAD_CARD,
  SEARCH_CARD,
  SET_LOADING,
  SEARCH_DATA,
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
  // SET_ALL_HOBBY,
  DELETE_HOBBY,
  // IS_SUCCESS,
} from './types';
import { DraftsRounded } from '@mui/icons-material';

const initialState = {
  byId: {},
  allIds: [],
  current: {},
  preview: null,
  cardList: {},
  searchInfo: {},
  searchData: [],
  searchArr: [],
  stackArr: [],
  hobbyArr: [],
  isLoading: false,
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
        //console.log(action.payload);
        action.payload.cardList.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
          //console.log(draft.allIds);
        });
      }),
    [SEARCH_CARD]: (state, action) =>
      produce(state, (draft) => {
        console.log('카드리스트 서치되는지 확인 ===>', action.payload.cardList);
        if (action.payload.cardList.length < 9) {
          draft.isSearching = false;
          return;
        }
        draft.isSearching = true;
        // console.log(draft.isSearching);
        draft.searchInfo = action.payload.searchInfo;
        // console.log(draft.searchInfo);
        if (action.payload.searchInfo.page === 0) {
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
    [SET_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.loadingInfo;
      }),
    [SEARCH_DATA]: (state, action) =>
      produce(state, (draft) => {
        draft.searchData = action.payload.searchDataArr;
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
        console.log(action.payload);
        draft.byId[userId] = action.payload;
        draft.allIds.unshift(userId);
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
        console.log(action.payload.preview);
      }),
    [LOAD_MY_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];
        console.log(action.payload);
        const { card } = action.payload;
        const cardList = card.cardDtoList;
        console.log(cardList);
        draft.current = card;
        // draft.cardList = cardList;
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
        draft.allIds.unshift(cardId);
      }),
    [UPDATE_CARD]: (state, action) =>
      produce(state, (draft) => {
        // draft.current = action.payload;
        console.log(action.payload);
        draft.byId[action.payload.card.cardId] = action.payload.card;
        console.log(action.payload.card.cardId);
      }),
    [DELETE_CARD]: (state, action) =>
      produce(state, (draft) => {
        delete draft.byId[action.payload.cardId];
        console.log(action.payload.cardId);
        draft.allIds = draft.allIds.filter(
          (id) => id !== Number(action.payload.cardId),
        );
        console.log(draft.allIds);
      }),
    [SET_STACK]: (state, action) =>
      produce(state, (draft) => {
        console.log(
          '태그 리듀서 확인====>',
          Array.isArray(action.payload.stack),
        );
        console.log('태그 리듀서 액션 확인====>', action.payload.stack);
        if (
          Array.isArray(action.payload.stack) &&
          action.payload.stack !== ['']
        ) {
          draft.stack = action.payload.stack;
          return;
        }
        if (draft.stack.length !== 0) {
          draft.stack.shift();
          draft.stack.push(action.payload.stack);
        } else {
          draft.stack.push(action.payload.stack);
        }
      }),
    [DELETE_STACK]: (state, action) =>
      produce(state, (draft) => {
        if (draft.stack.length !== 0) {
          draft.stack = [];
        }
      }),
    [SET_HOBBY]: (state, action) =>
      produce(state, (draft) => {
        console.log(Array.isArray(action.payload.hobby));
        if (
          Array.isArray(action.payload.hobby) &&
          action.payload.hobby !== ['']
        ) {
          draft.hobby = action.payload.hobby;
          return;
        }
        if (draft.hobby.length === 3) {
          draft.hobby.shift();
          draft.hobby.push(action.payload.hobby);
        } else {
          draft.hobby.push(action.payload.hobby);
        }
      }),
    // [SET_ALL_HOBBY]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.hobby = action.payload.hobby;
    //   }),
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
    // [IS_SUCCESS]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.isSuccess = action.payload.success;
    //     console.log(action.payload);
    //   }),
  },
  initialState,
);
