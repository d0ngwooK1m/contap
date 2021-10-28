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

        const {
          cardBundles: { grabList },
        } = action.payload;

        grabList.forEach((doc) => {
          draft.byId[doc.id] = doc;
          draft.allIds.push(doc.id);
        });
      }),
    [LOAD_SEND_TAP]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];

        const {
          cardBundles: { sendTap },
        } = action.payload;

        sendTap.forEach((doc) => {
          draft.byId[doc.id] = doc;
          draft.allIds.push(doc.id);
        });
      }),
    [LOAD_RECEIVE_TAP]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];

        const {
          cardBundles: { receiveTap },
        } = action.payload;

        receiveTap.forEach((doc) => {
          draft.byId[doc.id] = doc;
          draft.allIds.push(doc.id);
        });
      }),
  },
  initialState,
);
