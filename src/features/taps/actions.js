// import axios from 'axios';
import { createAction } from 'redux-actions';
import {
  LOAD_RECEIVE_TAP,
  LOAD_SEND_TAP,
  LOAD_GRAB,
  REMOVE_RECEIVE_TAP,
  REMOVE_GRAB,
  NEXT_PAGE,
  LOADING,
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
export const removeGrab = createAction(REMOVE_GRAB, (userId) => ({
  userId,
}));
export const nextPage = createAction(NEXT_PAGE, (cardBundles) => ({
  cardBundles,
}));
export const loading = createAction(LOADING, (isLoading) => ({
  isLoading,
}));

export const loadSendTapToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap/dotap/0');
    // const { data } = await T.GET('/contap/dotap');
    console.log('보낸탭 데이터 ============> ', data);

    dispatch(loadSendTap(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadReceiveTapToAxios = () => async (dispatch) => {
  try {
    console.log('받은탭 ============> ', '/contap/gettap/0');
    const { data } = await T.GET('/contap/gettap/0');
    console.log('받은탭 데이터============> ', data);
    // const { data } = await T.GET('/contap/gettap');
    dispatch(loadReceiveTap(data));
  } catch (error) {
    console.error(error);
  }
};

export const loadGrabToAxios = () => async (dispatch) => {
  try {
    const { data } = await T.GET('/contap/getothers/0/0');
    // const { data } = await T.GET('/contap/getothers');
    dispatch(loadGrab(data));
  } catch (error) {
    console.error(error);
  }
};

export const nextPageToAxios = (callPage, page) => async (dispatch) => {
  try {
    console.log('넥스트페이지 들어옴============> ', callPage);
    if (callPage === 'ReceiveTap') {
      console.log('리시브 탭============> ', `/contap/gettap/${page}`);

      const { data } = await T.GET('/contap/gettap', page);
      console.log('받은탭 데이터============> ', callPage, data);
      dispatch(nextPage(data));
    } else if (callPage === 'SendTap') {
<<<<<<< HEAD
      const { data } = await T.GET('/contap/dotap', callPage, page);
      console.log('보낸탭 데이터 ============> ', data);
      dispatch(nextPage(data));
    } else if (callPage === 'GrabList') {
      const { data } = await T.GET('/contap/getothers/0', callPage, page);
=======
      const { data } = await T.GET('/contap/dotap', page);
      console.log('보낸탭 데이터 ============> ', data);
      dispatch(nextPage(data));
    } else if (callPage === 'GrabList') {
      const { data } = await T.GET('/contap/getothers/0', page);
>>>>>>> 64a4e75fb9798d5b44fdddd2dec857d4940d3797
      console.log('그랩 ============> ', data);
      dispatch(nextPage(data));
    }
    // const { data } = await T.GET('/contap/gettap');
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

export const removeGrabToAxios = (userId) => async (dispatch) => {
  try {
    await T.POST(`/contap/deletefriend/${userId}`);
    dispatch(removeGrab(userId));
  } catch (error) {
    console.error(error);
  }
};
