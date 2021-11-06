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
  try {
    const { data } = await T.GET('/contap', 'dotap');
    dispatch(loadSendTap(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadReceiveTapToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap', 'gettap');
    dispatch(loadReceiveTap(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadGrabToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap', 'getothers');
    dispatch(loadGrab(data));
  } catch (error) {
    console.error(error);
  }
};
