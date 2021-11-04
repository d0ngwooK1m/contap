import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { LOAD_MESSAGES, GET_MESSAGE, WRITE_MESSAGE, LOADING } from './types';

const initialState = {
  roomId: null,
  messages: [],
  messageText: '',
  isLoading: false,
};

export default handleActions(
  {
    [LOAD_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        console.log('LOAD_MESSAGES');
        console.log(action.payload);
        console.log(draft);
      }),
    [GET_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        console.log('GET_MESSAGE');
        draft.messages.unshift(action.payload.message);
        draft.isLoading = true;
      }),
    [WRITE_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        console.log('WRITE_MESSAGE');
        console.log(action.payload);
        console.log(draft);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        console.log('LOADING');
        console.log(action.payload);
        console.log(draft);
      }),
  },
  initialState,
);
