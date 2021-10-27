/* eslint-disable */
import { handleActions } from 'redux-actions';
import { produce } from 'immer'; // reducer 불변성 유지
import { LOAD_CARD, CREATE_CARD, UPDATE_CARD, DELETE_CARD } from './types';

const initialState = {
  byId: {},
  allIds: [],
  current: {},
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
          draft.byId[doc.id] = doc;
          draft.allIds.push(doc.id);
        });
      }),

    [CREATE_CARD]: (state, action) => produce(state, (draft) => {}),
  },
  initialState,
);
