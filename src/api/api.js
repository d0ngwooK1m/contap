/* eslint-disable */
// axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

export const apis = {
  // user
  login: () => api.post('', {}),
  signup: () => api.post('', {}),
  // tap
  getTaps: (endPoint) => api.get(`${endPoint}`),
  // cards
  // 카드 불러오기 (앞면)
  getCardFront: () => api.get('/cardFront'),
  // 카드 불러오기 (뒷면)
  getCardBack: (cardId) => api.get(`/cardBack/${cardId}`),
  // 카드 작성하기
  createCard: () => api.post('../features/cards/actions'),
  // 카드 수정하기
  editCard: () => api.put(''),
  // 카드 삭제하기
  delCard: () => api.delete(''),
};
