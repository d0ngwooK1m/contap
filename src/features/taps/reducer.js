import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import {
  LOAD_GRAB,
  LOAD_SEND_TAP,
  LOAD_RECEIVE_TAP,
  REMOVE_RECEIVE_TAP,
  REMOVE_GRAB,
  NEXT_PAGE,
  LOADING,
} from './types';

const initialState = {
  byId: {},
  allIds: [],
  showModal: false,
  isNext: true,
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
      }),
    [LOAD_SEND_TAP]: (state, action) =>
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
      }),
    [NEXT_PAGE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        const { cardBundles } = action.payload;
        if (cardBundles.length < 12) {
          console.log('여기 걸렸음');
          draft.isNext = false;
          if (cardBundles > 0) {
            cardBundles.forEach((doc) => {
              console.log('마지막 페이지', doc);
            });
          }
          // draft.allIds.push(doc);
          return;
        }

        cardBundles.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
        });
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];

        console.log(action.payload);
        const { cardBundles } = action.payload;

        cardBundles.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
        });
      }),
    [REMOVE_RECEIVE_TAP]: (state, action) =>
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
