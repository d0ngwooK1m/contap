import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import {
  LOAD_GRAB,
  LOAD_SEND_TAP,
  LOAD_RECEIVE_TAP,
  SHOW_MODAL,
  REMOVE_RECEIVE_TAP,
  REMOVE_GRAB,
} from './types';

const initialState = {
  byId: {},
  allIds: [],
  showModal: false,
};

export default handleActions(
  {
    [LOAD_GRAB]: (state, action) =>
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
    [LOAD_SEND_TAP]: (state, action) =>
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
    [LOAD_RECEIVE_TAP]: (state, action) =>
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
    [SHOW_MODAL]: (state, action) =>
      produce(state, (draft) => {
        console.log('페이로드 ====> ', action);
        draft.showModal = action.payload.bool;
      }),
  },
  initialState,
);
