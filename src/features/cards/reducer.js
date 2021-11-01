/* eslint-disable */
import { handleActions } from 'redux-actions';
import { produce } from 'immer'; // reducer 불변성 유지
import {
  LOAD_CARD,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  LOAD_CURRENT_CARD,
  SET_PREVIEW,
} from './types';

const initialState = {
  byId: {},
  allIds: [],
  current: {},
  preview: null,
};

export default handleActions(
  {
    // immer를 이용한 불변성 유지! - produce 사용
    [LOAD_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.byId = {};
        draft.allIds = [];
        console.log(action.payload);
        action.payload.cardList.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
        });
      }),
    [LOAD_CURRENT_CARD]: (state, action) =>
      produce(state, (draft) => {
        const { data } = action.payload;
        console.log(action.payload);
        draft.current = data;
      }),
    [CREATE_CARD]: (state, action) =>
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
  },
  initialState,
);
