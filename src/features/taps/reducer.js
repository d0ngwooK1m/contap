import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { LOAD_GRAB, LOAD_SEND_TAP, LOAD_RECEIVE_TAP } from './types';

const initialState = {
  byId: {},
  allIds: [],
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
  },
  initialState,
);
