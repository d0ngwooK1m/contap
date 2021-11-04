import axios from 'axios';
import Swal from 'sweetalert2';
import { createAction } from 'redux-actions';
import T from '../../api/tokenInstance';

import { getToken } from '../../utils/auth';
import { history } from '../configureStore';
// import { apis } from '../../api/api';

import {
  LOAD_CARD,
  SEARCH_CARD,
  LOAD_CURRENT_CARD,
  EDIT_CARD_PROFILE,
  SET_PREVIEW,
  LOAD_MY_CARD,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  SEARCH_ARR,
} from './types';

// Eslint는 카멜케이스로 쓰기!! _ 사용하면 오류남
export const loadCard = createAction(LOAD_CARD, (cardList) => ({
  cardList,
}));

export const searchCard = createAction(SEARCH_CARD, (searchInfo, cardList) => ({
  searchInfo,
  cardList,
}));

export const searchArrList = createAction(SEARCH_ARR, (searchList) => ({
  searchList,
}));

export const loadCurrentCard = createAction(LOAD_CURRENT_CARD, (data) => ({
  data,
}));
export const editCardProfile = createAction(EDIT_CARD_PROFILE, (card) => ({
  card,
}));
export const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
export const loadMyCard = createAction(LOAD_MY_CARD, (card) => ({
  card,
}));
export const createCard = createAction(CREATE_CARD, (card) => ({
  card,
}));
export const updateCard = createAction(UPDATE_CARD, (card) => ({
  card,
}));
export const deleteCard = createAction(DELETE_CARD, (cardId) => ({
  cardId,
}));

// 미들웨어

const baseURL = process.env.REACT_APP_SERVER_URI;

export const loadCardFrontDB = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseURL}/main`);

    console.log('앞면카드 조회값 확인===>', res.data);

    dispatch(loadCard(res.data.users));
  } catch (err) {
    console.log(err);
  }
};

export const searchInfoDB = (searchInfo) => async (dispatch) => {
  console.log(searchInfo);
  try {
    const res = await axios.post(`${baseURL}/main/search`, searchInfo);
    // const { resultData } = res;
    // console.log(resultData);
    console.log(res.data);
    if (res.data === []) {
      return null;
    }
    dispatch(searchCard(searchInfo, res.data));
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const loadCurrentCardDB = (userId) => async (dispatch) => {
  try {
    console.log(userId);
    const res = await T.GET(`/main/${userId}`);

    console.log('뒷면카드 조회값 확인===>', res.data);

    dispatch(loadCurrentCard(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const editCardProfileDB = (formData) => async (dispatch) => {
  try {
    // console.log('Request ===>', formData);
    const res = await axios.post(`${baseURL}/mypage/frontCard`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': `${getToken()}`,
      },
    });
    console.log('앞면카드 response 확인===>', res);
    // dispatch(setPreview(null));
    dispatch(editCardProfile(res.data));
    if (res.data.result === 'fail') {
      console.log(res.data.result);
      Swal.fire({
        icon: 'error',
        title: '수정 실패',
        text: `${res.data.errorMessage}`,
      });
    }
    history.push('/mypage');
  } catch (err) {
    console.log(err);
  }
};

// export const nickNameCheckDB = () => async (dispatch) => {
//   try {
//     const res = await T.POST('/mypage/');

export const loadMyCardDB = () => async (dispatch) => {
  try {
    const res = await T.GET('/mypage/myinfo');

    console.log('내카드조회 response 확인===>', res.data);

    dispatch(loadMyCard(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const createCardDB = (content) => async (dispatch) => {
  try {
    const res = await T.POST('/mypage/backCard', content);
    console.log('뒷면카드추가 response 확인===>', res);

    dispatch(createCard(res.data));
    window.location.replace('/mypage');
  } catch (err) {
    console.log(err);
  }
};

export const updateCardDB = (cardId, updateContent) => async (dispatch) => {
  try {
    const res = await T.POST(`/mypage/backCard/${cardId}`, updateContent);
    console.log('뒷면카드수정 response 확인===>', res);

    dispatch(updateCard(res.data));
    window.location.replace('/mypage');
  } catch (err) {
    console.log(err);
  }
};

export const deleteCardDB = (cardId) => async (dispatch) => {
  try {
    const res = await T.DELETE('/mypage/backCard', cardId);
    console.log('뒷면카드수정 response 확인===>', res);

    dispatch(deleteCard(cardId));
    window.location.replace('/mypage');
  } catch (err) {
    console.log(err);
  }
};
