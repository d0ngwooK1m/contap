// import axios from 'axios';
import { createAction } from 'redux-actions';
import { LOAD_RECEIVE_TAP, LOAD_SAND_TAP, LOAD_GRAB } from './types';
// import T from '../../api/tokenInstance';
import { apis } from '../../api/api';

export const loadSendTap = createAction(LOAD_SAND_TAP, (cardBundles) => ({
  cardBundles,
}));
export const loadReceiveTap = createAction(LOAD_RECEIVE_TAP, (cardBundles) => ({
  cardBundles,
}));
export const loadGrab = createAction(LOAD_GRAB, (cardBundles) => ({
  cardBundles,
}));

export const loadSendTapToAxios = () => async (dispatch) => {
  const { data } = await apis.getCard();
  dispatch(loadSendTap(data));
};

export const loadReceiveTapToAxios = () => async (dispatch) => {
  const { data } = await apis.getCard();
  dispatch(loadReceiveTap(data));
};

export const loadGrabToAxios = () => async (dispatch) => {
  const { data } = await apis.getCard();
  dispatch(loadGrab(data));
};
