/* eslint-disable */
import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { LOAD_GRAB, LOAD_SAND_TAP, LOAD_RECEVE_TAP } from './types';

const initialState = {
  byId: {},
  allIds: [],
};

export default handleActions(
  {
    [LOAD_GRAB]: (state, action) => produce(state, (draft) => {}),
    [LOAD_SAND_TAP]: (state, action) => produce(state, (draft) => {}),
    [LOAD_RECEVE_TAP]: (state, action) => produce(state, (draft) => {}),
  },
  initialState,
);
