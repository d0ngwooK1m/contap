import { createAction } from 'redux-actions';
import { apis } from '../../api/api';
import { LOAD_CARD, CREATE_CARD } from './types';

// Eslint는 카멜케이스로 쓰기!! _ 사용하면 오류남
export const loadCard = createAction(LOAD_CARD, (cardList) => ({
  cardList,
}));
export const createCard = createAction(CREATE_CARD, (card) => ({ card }));

export const loadCardDB = () => async (dispatch) => {
  try {
    const res = await apis.getCard();
    // console.log(res.data);

    // const { data } = res;
    dispatch(loadCard(res.data));
  } catch (err) {
    console.log(err);
  }
};
