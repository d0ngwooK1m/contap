// import axios from 'axios';
import { createAction } from 'redux-actions';
import { LOAD_RECEVE_TAP, LOAD_SAND_TAP, LOAD_GRAB } from './types';
// import T from '../../api/tokenInstance';

export const loadSendTap = createAction(LOAD_SAND_TAP, (cardBundles) => ({
  cardBundles,
}));
export const loadReceveTap = createAction(LOAD_RECEVE_TAP, (cardBundles) => ({
  cardBundles,
}));
export const loadGrab = createAction(LOAD_GRAB, (cardBundles) => ({
  cardBundles,
}));

// export const loadSendTapToAxios = () => async (dispatch) => {};
