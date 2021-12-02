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
  CARD_CHECK,
} from './types';

// Eslint는 카멜케이스로 쓰기!! _ 사용하면 오류남
export const loadCard = createAction(LOAD_CARD, (cardList, selectCategory) => ({
  cardList,
  selectCategory,
}));

export const deleteMyCard = createAction(DELETE_MY_CARD, (userId) => ({
  userId,
}));

export const searchCard = createAction(
  SEARCH_CARD,
  (searchInfo, cardList, selectCategory) => ({
    searchInfo,
    cardList,
    selectCategory,
  }),
);

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
export const cardCheck = createAction(CARD_CHECK, (check) => ({ check }));

// 미들웨어

const baseURL = process.env.REACT_APP_SERVER_URI;

export const loadCardFrontDB = (selectCategory) => async (dispatch) => {
  // try {
  //   const res = await T.GET(`${baseURL}/main`);

  //   dispatch(loadCard(res.data.users));
  // } catch (err) {
  //   console.error(err);
  // }
  try {
    const searchInfo = {
      searchTags: [],
      type: 0,
      page: 0,
      field: 3,
    };
    const res = await T.POST(`/main/search`, searchInfo);
    // const res = await T.GET(`${baseURL}/main`);
    // console.log(res);
    if (res.data === []) {
      return null;
    }
    if (res.data !== []) {
      // return dispatch(searchCard(searchInfo, res.data, ''));
      return dispatch(loadCard(res.data, selectCategory || ''));
    }
  } catch (err) {
    console.error(err);
  }
  return null;
};

export const searchInfoDB =
  (searchInfo, selectCategory) => async (dispatch) => {
    try {
      const res = await T.POST(`/main/search`, searchInfo);
      // const { resultData } = res;
      // console.log(res);
      if (res.data === []) {
        return null;
      }
      if (res.data !== []) {
        return dispatch(searchCard(searchInfo, res.data, selectCategory || ''));
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

export const loadCurrentCardDB = (userId) => async (dispatch) => {
  try {
    const res = await T.GET(`/main/${userId}`);

    dispatch(loadCurrentCard(res.data));
  } catch (err) {
    console.error(err);
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
    // dispatch(setPreview(null));
    dispatch(editCardProfile(res.data));
    if (res.data.result === 'fail') {
      Swal.fire({
        icon: 'error',
        title: '수정 실패',
        text: `${res.data.errorMessage}`,
      });
    }
    dispatch(profileChange(res.data.profile));
    history.push('/mypage');
  } catch (err) {
    console.error(err);
  }
};

export const searchTagListDB = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseURL}/main/hashtag`);

    const stackTagData = [];
    const hobbyTagData = [];
    res.data.forEach((val, idx) => {
      if (idx <= 39) {
        stackTagData.push(val.name);
      } else {
        hobbyTagData.push(val.name);
      }
    });
    dispatch(loadStack(stackTagData));
    dispatch(loadHobby(hobbyTagData));
  } catch (err) {
    console.error(err);
  }
};

export const loadMyCardDB = () => async (dispatch) => {
  try {
    const res = await T.GET('/mypage/myinfo');

    dispatch(loadMyCard(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const createCardDB = (content) => async (dispatch) => {
  try {
    const res = await T.POST('/mypage/backCard', content);
    dispatch(createCard(res.data));
    history.push('/mypage');
  } catch (err) {
    console.error(err);
  }
};

export const updateCardDB = (cardId, updateContent) => async (dispatch) => {
  try {
    const res = await T.POST(`/mypage/backCard/${cardId}`, updateContent);
    dispatch(updateCard(res.data));
    history.push('/mypage');
  } catch (err) {
    console.error(err);
  }
};

export const deleteCardDB = (cardId) => async (dispatch) => {
  try {
    // console.log('카드 삭제 시 cardId ====', cardId);
    const res = await T.DELETE('/mypage/backCard', cardId);
    // console.log('카드 삭제 시 res ====', res);
    dispatch(deleteCard(res.data.cardId));
    history.push('/mypage');
  } catch (err) {
    console.error(err);
  }
};

export const cardCheckDB = () => async () => {
  try {
    await T.GET('/main/info');
  } catch (err) {
    console.errorlog(err);
  }
};
