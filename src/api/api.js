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
  // cards
  // 카드 불러오기
  getWork: () => api.get('../features/cards/actions'),
  // 카드 작성하기
  createWork: () => api.post('../features/cards/actions'),
  // 카드 수정하기
  editWork: () => api.put(''),
  // 카드 삭제하기
  delWork: () => api.delete(''),
};
