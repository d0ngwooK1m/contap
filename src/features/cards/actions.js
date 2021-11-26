import axios from 'axios';
import Swal from 'sweetalert2';
import { createAction } from 'redux-actions';
import { profileChange } from '../user/actions';

import T from '../../api/tokenInstance';

import { getToken } from '../../utils/auth';
import { history } from '../configureStore';
// import { apis } from '../../api/api';

import {
  LOAD_CARD,
  SEARCH_CARD,
  SET_LOADING,
  LOAD_CURRENT_CARD,
  EDIT_CARD_PROFILE,
  SET_PREVIEW,
  LOAD_MY_CARD,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  SEARCH_DATA,
  SEARCH_ARR,
  SEARCH_STACK,
  SEARCH_HOBBY,
  SET_STACK,
  DELETE_STACK,
  SET_HOBBY,
  // SET_ALL_HOBBY,
  DELETE_HOBBY,
  // IS_SUCCESS,
  LOAD_HOBBY,
  LOAD_STACK,
  DELETE_MY_CARD,
  LOADING,
} from './types';

// Eslint는 카멜케이스로 쓰기!! _ 사용하면 오류남
export const loadCard = createAction(LOAD_CARD, (cardList) => ({
  cardList,
}));

export const deleteMyCard = createAction(DELETE_MY_CARD, (userId) => ({
  userId,
}));

export const searchCard = createAction(SEARCH_CARD, (searchInfo, cardList) => ({
  searchInfo,
  cardList,
}));

export const setLoading = createAction(SET_LOADING, (loadingInfo) => ({
  loadingInfo,
}));

export const searchDataList = createAction(SEARCH_DATA, (searchDataArr) => ({
  searchDataArr,
}));

export const searchArrList = createAction(SEARCH_ARR, (searchList) => ({
  searchList,
}));
export const searchStackList = createAction(SEARCH_STACK, (stackList) => ({
  stackList,
}));
export const searchHobbyList = createAction(SEARCH_HOBBY, (hobbyList) => ({
  hobbyList,
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
export const updateStack = createAction(SET_STACK, (stack) => ({
  stack,
}));
export const deleteStack = createAction(DELETE_STACK, () => ({}));
export const updateHobby = createAction(SET_HOBBY, (hobby) => ({
  hobby,
}));
// export const updateAllHobby = createAction(SET_ALL_HOBBY, (hobbyArr) => ({
//   hobbyArr,
// }));
export const deleteHobby = createAction(DELETE_HOBBY, (hobby) => ({
  hobby,
}));
// export const isSuccess = createAction(IS_SUCCESS, (success) => ({ success }));
export const loadStack = createAction(LOAD_STACK, (tags) => ({ tags }));
export const loadHobby = createAction(LOAD_HOBBY, (tags) => ({ tags }));
export const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

// 미들웨어

const baseURL = process.env.REACT_APP_SERVER_URI;

export const loadCardFrontDB = () => async (dispatch) => {
  try {
    const res = await T.GET(`${baseURL}/main`);

    console.log('앞면카드 조회값 확인===>', res.data);

    dispatch(loadCard(res.data.users));
  } catch (err) {
    console.log(err);
  }
};

export const searchInfoDB = (searchInfo) => async (dispatch) => {
  console.log('requset ======>', searchInfo);
  try {
    const res = await axios.post(`${baseURL}/main/search`, searchInfo);
    // const { resultData } = res;
    // console.log(resultData);
    console.log('response ======>', res.data);
    if (res.data === []) {
      return null;
    }
    if (res.data !== []) {
      return dispatch(searchCard(searchInfo, res.data));
    }
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
    dispatch(profileChange(res.data.profile));
    history.push('/mypage');
  } catch (err) {
    console.log(err);
  }
};

export const searchTagListDB = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseURL}/main/hashtag`);

    console.log('검색 태그 목록 response 확인 ====>', res);

    const stackTagData = [];
    const hobbyTagData = [];
    res.data.forEach((val, idx) => {
      console.log(idx);
      if (idx <= 39) {
        stackTagData.push(val.name);
      } else {
        hobbyTagData.push(val.name);
      }
    });
    console.log('태그 데이터들 ===>', stackTagData, hobbyTagData);
    dispatch(loadStack(stackTagData));
    dispatch(loadHobby(hobbyTagData));
  } catch (err) {
    console.log(err);
  }
};

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
    history.push('/mypage');
  } catch (err) {
    console.log(err);
  }
};

export const updateCardDB = (cardId, updateContent) => async (dispatch) => {
  try {
    const res = await T.POST(`/mypage/backCard/${cardId}`, updateContent);
    console.log('뒷면카드수정 response 확인===>', res);

    dispatch(updateCard(res.data));
    history.push('/mypage');
  } catch (err) {
    console.log(err);
  }
};

export const deleteCardDB = (cardId) => async (dispatch) => {
  try {
    const res = await T.DELETE('/mypage/backCard', cardId);
    console.log('뒷면카드삭제 response 확인===>', res);

    dispatch(deleteCard(res.data.cardId));
    history.push('/mypage');
  } catch (err) {
    console.log(err);
  }
};
