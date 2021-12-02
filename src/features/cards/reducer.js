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
  LOAD_HOBBY,
  LOAD_STACK,
  DELETE_MY_CARD,
  LOADING,
  CARD_CHECK,
} from './types';
import { DraftsRounded } from '@mui/icons-material';

const initialState = {
  byId: {},
  allIds: [],
  current: {},
  preview: null,
  cardList: {},
  profileCard: {},
  backCard: {},
  backCardIdx: [],
  searchInfo: {},
  searchData: [],
  searchArr: [],
  stackArr: [],
  hobbyArr: [],
  isLoading: false,
  isSearching: false,
  stack: [],
  hobby: [],
  stackTag: [],
  hobbyTag: [],
  isLoading: false,
  cardCheck: {},
  selectCategory : '',
};

export default handleActions(
  {
    // immer를 이용한 불변성 유지! - produce 사용
    [LOAD_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.isSearching = true;
        draft.byId = {};
        draft.allIds = [];
        draft.selectCategory = action.payload.selectCategory;
        //console.log(action.payload);
        action.payload.cardList.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
          //console.log(draft.allIds);
        });
      }),
    [SEARCH_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.isSearching = true;
        // console.log(draft.isSearching);
        draft.searchInfo = action.payload.searchInfo;
        draft.selectCategory = action.payload.selectCategory
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
        if (action.payload.cardList.length < 9) {
          draft.isSearching = false;
          return;
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
        draft.isLoading = false;
      }),
    [EDIT_CARD_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        // const { userId } = action.payload;
        draft.profileCard = action.payload;
        // draft.allIds.unshift(userId);
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [LOAD_MY_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.backCard = {};
        draft.backCardIdx = [];
        const { card } = action.payload;
        const cardList = card.cardDtoList;
        draft.current = card;
        // draft.cardList = cardList;
        cardList.forEach((doc) => {
          draft.backCard[doc.cardId] = doc;
          draft.backCardIdx.push(doc.cardId);
        });
      }),
    [CREATE_CARD]: (state, action) =>
      produce(state, (draft) => {
        const { cardId } = action.payload.card;
        draft.backCard[cardId] = action.payload.card;
        draft.backCardIdx.unshift(cardId);
      }),
    [UPDATE_CARD]: (state, action) =>
      produce(state, (draft) => {
        // draft.current = action.payload;
        draft.backCard[action.payload.card.cardId] = action.payload.card;
      }),
    [DELETE_CARD]: (state, action) =>
      produce(state, (draft) => {
        delete draft.backCard[action.payload.cardId];
        draft.backCardIdx = draft.backCardIdx.filter(
          (id) => id !== Number(action.payload.cardId),
        );
      }),
    [DELETE_MY_CARD]: (state, action) =>
      produce(state, (draft) => {
        delete draft.byId[action.payload.userId];
        draft.allIds = draft.allIds.filter(
          (id) => id !== Number(action.payload.userId),
        );
      }),
    [SET_STACK]: (state, action) =>
      produce(state, (draft) => {
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
        if (
          Array.isArray(action.payload.hobby) &&
          action.payload.hobby !== ['']
        ) {
          draft.hobby = action.payload.hobby;
          return;
        }
        if (action.payload.hobby === undefined) {
          draft.hobby = [];
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
    [LOAD_STACK]: (state, action) =>
      produce(state, (draft) => {
        draft.stackTag = action.payload.tags;
      }),
    [LOAD_HOBBY]: (state, action) =>
      produce(state, (draft) => {
        draft.hobbyTag = action.payload.tags;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
    [CARD_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.cardCheck = action.payload.check;
      }),
    // [IS_SUCCESS]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.isSuccess = action.payload.success;
    //     console.log(action.payload);
    //   }),
  },
  initialState,
);
