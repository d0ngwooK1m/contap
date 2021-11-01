// import axios from 'axios';
import { createAction } from 'redux-actions';
import {
  LOAD_RECEIVE_TAP,
  LOAD_SEND_TAP,
  LOAD_GRAB,
  SHOW_MODAL,
} from './types';
import T from '../../api/tokenInstance';
// import { apis } from '. ./../api/api';

export const loadSendTap = createAction(LOAD_SEND_TAP, (cardBundles) => ({
  cardBundles,
}));
export const loadReceiveTap = createAction(LOAD_RECEIVE_TAP, (cardBundles) => ({
  cardBundles,
}));
export const loadGrab = createAction(LOAD_GRAB, (cardBundles) => ({
  cardBundles,
}));

export const modalSwitch = createAction(SHOW_MODAL, (bool) => ({
  bool,
}));

export const loadSendTapToAxios = () => async (dispatch) => {
  const { data } = await T.GET('/contap', 'dotap');
  console.log(data);
  dispatch(loadSendTap(data));
};

export const loadReceiveTapToAxios = () => async (dispatch) => {
  const { data } = await T.GET('/contap', 'gettap');
  console.log(data);
  dispatch(loadReceiveTap(data));
};

export const loadGrabToAxios = () => async (dispatch) => {
  const { data } = await T.GET('/contap', 'getothers');
  console.log(data);
  dispatch(loadGrab(data));
};
