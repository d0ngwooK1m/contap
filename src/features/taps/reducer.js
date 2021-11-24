import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import {
  LOAD_GRAB,
  LOAD_SEND_TAP,
  LOAD_RECEIVE_TAP,
  REMOVE_RECEIVE_TAP,
  REMOVE_SEND_TAP,
  REMOVE_GRAB,
  NEXT_PAGE,
  LOADING,
} from './types';

const initialState = {
  byId: {},
  allIds: [],
  showModal: false,
  isNext: true,
  isLoading: false,
};

export default handleActions(
  {
    [LOAD_GRAB]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];
        draft.isNext = true;

        console.log(action.payload);

        const { cardBundles } = action.payload;

        cardBundles.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
        });
        draft.isLoading = false;
      }),
    [LOAD_SEND_TAP]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];
        draft.isNext = true;
        const { cardBundles } = action.payload;

        cardBundles.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
        });
        draft.isLoading = false;
        console.log('로딩 로딩 끝');
      }),
    [LOAD_RECEIVE_TAP]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];
        draft.isNext = true;

        console.log(action.payload);
        const { cardBundles } = action.payload;

        cardBundles.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
        });

        draft.isLoading = false;
      }),
    [NEXT_PAGE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        const { cardBundles } = action.payload;
        if (cardBundles.length < 12) {
          console.log('여기 걸렸음');
          draft.isNext = false;
          cardBundles.forEach((doc) => {
            draft.byId[doc.userId] = doc;
            draft.allIds.push(doc.userId);
            console.log('마지막 페이지', doc);
          });
          // draft.allIds.push(doc);
          draft.isLoading = false;
          return;
        }

        cardBundles.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
        });
        draft.isLoading = false;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
    [REMOVE_RECEIVE_TAP]: (state, action) =>
      produce(state, (draft) => {
        delete draft.byId[action.payload.userId];
        draft.allIds = draft.allIds.filter(
          (id) => id !== Number(action.payload.userId),
        );
      }),
    [REMOVE_SEND_TAP]: (state, action) =>
      produce(state, (draft) => {
        delete draft.byId[action.payload.userId];
        draft.allIds = draft.allIds.filter(
          (id) => id !== Number(action.payload.userId),
        );
      }),
    [REMOVE_GRAB]: (state, action) =>
      produce(state, (draft) => {
        delete draft.byId[action.payload.userId];
        draft.allIds = draft.allIds.filter(
          (id) => id !== Number(action.payload.userId),
        );
      }),
  },
  initialState,
);
