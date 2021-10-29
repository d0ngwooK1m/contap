/* eslint-disable */
import { handleActions } from 'redux-actions';
import { produce } from 'immer'; // reducer 불변성 유지
import {
  LOAD_CARD,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  LOAD_CURRENT_CARD,
  ON_POPUP,
} from './types';

const initialState = {
  byId: {},
  allIds: [],
  current: {},
  isPopup: false,
};

export default handleActions(
  {
    // immer를 이용한 불변성 유지! - produce 사용
    [LOAD_CARD]: (state, action) =>
      produce(state, (draft) => {
        // draft.byId = {};
        // draft.allIds = [];
        console.log(action.payload);
        action.payload.cardList.forEach((doc) => {
          draft.byId[doc.userId] = doc;
          draft.allIds.push(doc.userId);
        });
      }),
    [LOAD_CURRENT_CARD]: (state, action) =>
      produce(state, (draft) => {
        const { userId, data } = action.payload;
        draft.current = data;
        // draft.current.id = userId;
      }),
    [CREATE_CARD]: (state, action) => produce(state, (draft) => {}),
    [ON_POPUP]: (state, action) =>
      produce(state, (draft) => {
        draft.isPopup = action.payload.isPopup;
      }),
  },
  initialState,
);
