// import axios from 'axios';
import { createAction } from 'redux-actions';
import {
  LOAD_RECEIVE_TAP,
  LOAD_SEND_TAP,
  LOAD_GRAB,
  SHOW_MODAL,
  REMOVE_RECEIVE_TAP,
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
export const removeReceiveTap = createAction(REMOVE_RECEIVE_TAP, (userId) => ({
  userId,
}));
export const modalSwitch = createAction(SHOW_MODAL, (bool) => ({
  bool,
}));

export const loadSendTapToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap/dotap', '0');
    // const { data } = await T.GET('/contap/dotap');
    console.log('보낸탭 데이터 ============> ', data);

    dispatch(loadSendTap(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadReceiveTapToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap/gettap', '0');
    // const { data } = await T.GET('/contap/gettap');
    dispatch(loadReceiveTap(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadGrabToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap/getothers', '0');
    // const { data } = await T.GET('/contap/getothers');
    dispatch(loadGrab(data));
  } catch (error) {
    console.error(error);
  }
};

export const removeReceiveTapToAxios =
  (state, tapId, userId) => async (dispatch) => {
    try {
      await T.POST(
        `/contap/${state === 'reject' ? 'reject' : 'accept'}`,
        tapId,
      );
      dispatch(removeReceiveTap(userId));
    } catch (error) {
      console.error(error);
    }
  };
