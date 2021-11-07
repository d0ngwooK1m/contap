import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StompJs from 'stompjs';
import SockJS from 'sockjs-client';
import { getToken } from '../utils/auth';
import T from '../api/tokenInstance';
import { setNoti } from '../features/notice/actions';

const baseURL = process.env.REACT_APP_SERVER_URI;

export default function useSocketNotiRoom() {
  const dispatch = useDispatch();
  const isNoti = useSelector((state) => state.notice.isGlobalNoti);

  const sock = new SockJS(`${baseURL}/ws-stomp`);
  const ws = StompJs.over(sock);
  const token = getToken();

  const wsConnectSubscribe = React.useCallback(async () => {
    if (!token) {
      return null;
    }
    try {
      const { data } = await T.GET('/auth');
      console.log(data);
      ws.connect({}, () => {
        ws.subscribe(
          `/user/sub/user`,
          () => {
            if (!isNoti) {
              dispatch(setNoti(true));
            }
          },
          { token, userEmail: data.email },
        );
      });
    } catch (error) {
      console.log(error);
    }
    return null;
  }, []);

  const wsDisConnectUnsubscribe = React.useCallback(() => {
    try {
      ws.disconnect(() => {
        ws.unsubscribe('sub-0');
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return [wsConnectSubscribe, wsDisConnectUnsubscribe, token];
}
