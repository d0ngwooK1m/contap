import axios from 'axios';
import { createAction } from 'redux-actions';
import T from '../../api/tokenInstance';
import { getToken } from '../../utils/auth';
// import { apis } from '../../api/api';
import {
  LOAD_CARD,
  CREATE_CARD,
  LOAD_CURRENT_CARD,
  SET_PREVIEW,
} from './types';

// Eslint는 카멜케이스로 쓰기!! _ 사용하면 오류남
export const loadCard = createAction(LOAD_CARD, (cardList) => ({
  cardList,
}));
export const loadCurrentCard = createAction(LOAD_CURRENT_CARD, (data) => ({
  data,
}));
export const createCard = createAction(CREATE_CARD, (card) => ({ card }));
export const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// 미들웨어

const baseURL = process.env.REACT_APP_SERVER_URI;

export const loadCardFrontDB = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseURL}/main`);
    // const res = await apis.getCardFront();
    // console.log(res.data.users);
    console.log(res.data);

    // const { data } = res;
    // dispatch(loadCard(res.data.users));
    dispatch(loadCard(res.data.users));
  } catch (err) {
    console.log(err);
  }
};

export const loadCurrentCardDB = (userId) => async (dispatch) => {
  try {
    const res = await T.GET(`/main/${userId}`);
    // const res = await apis.getCardBack(userId);
    console.log('뒷면 값 확인===>', res.data);

    // dispatch(loadCurrentCard(Number(userId), res.data));
    dispatch(loadCurrentCard(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const createCardDB = (formData) => async (dispatch) => {
  try {
    // const res = await apis.createCard(contents);
    // const token = localStorage.getItem('token');
    // console.log(token);
    const res = await axios.post(`${baseURL}/mypage/frontCard`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': `${getToken()}`,
      },
    });
    console.log('작성값 확인===>', res);
    dispatch(setPreview(null));
    dispatch(createCard(res.data));
  } catch (err) {
    console.log(err);
  }
};
