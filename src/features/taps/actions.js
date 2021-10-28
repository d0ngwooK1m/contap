// import axios from 'axios';
import { createAction } from 'redux-actions';
import { LOAD_RECEIVE_TAP, LOAD_SEND_TAP, LOAD_GRAB } from './types';
// import T from '../../api/tokenInstance';
import { apis } from '../../api/api';

export const loadSendTap = createAction(LOAD_SEND_TAP, (cardBundles) => ({
  cardBundles,
}));
export const loadReceiveTap = createAction(LOAD_RECEIVE_TAP, (cardBundles) => ({
  cardBundles,
}));
export const loadGrab = createAction(LOAD_GRAB, (cardBundles) => ({
  cardBundles,
}));

export const loadSendTapToAxios = (id) => async (dispatch) => {
  console.log(id);
  const { data } = await apis.getTaps();
  dispatch(loadSendTap(data));
};

export const loadReceiveTapToAxios = () => async (dispatch) => {
  const { data } = await apis.getTaps();
  dispatch(loadReceiveTap(data));
};

export const loadGrabToAxios = () => async (dispatch) => {
  const { data } = await apis.getTaps();
  dispatch(loadGrab(data));
};
