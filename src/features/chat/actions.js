import { createAction } from 'redux-actions';
import { LOAD_MESSAGES, GET_MESSAGE, LOADING, WRITE_MESSAGE } from './types';
import T from '../../api/tokenInstance';

export const loadMessages = createAction(LOAD_MESSAGES, (messageList) => ({
  messageList,
}));
export const getMessage = createAction(GET_MESSAGE, (message) => ({
  message,
}));
export const writeMessage = createAction(WRITE_MESSAGE, (messageText) => ({
  messageText,
}));
export const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

export const loadMessagesToAxios = (roomId) => async (dispatch) => {
  try {
    const { data } = await T.GET('/chat/getmsg', roomId);
    console.log(data);
    dispatch(loadMessages(data));
  } catch (error) {
    console.error(error);
  }
};
