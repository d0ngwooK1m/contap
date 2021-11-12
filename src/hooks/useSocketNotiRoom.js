import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StompJs from 'stompjs';
import SockJS from 'sockjs-client';
import { getToken } from '../utils/auth';
import T from '../api/tokenInstance';
import {
  setChatNoti,
  setTapRecieveNoti,
  setTapAcceptNoti,
  setTapRefuseNoti,
} from '../features/notice/actions';

const baseURL = process.env.REACT_APP_SERVER_URI;

export default function useSocketNotiRoom() {
  const dispatch = useDispatch();
  const isChatNoti = useSelector((state) => state.notice.isChatNoti);

  const sock = new SockJS(`${baseURL}/ws-stomp`);
  const ws = StompJs.over(sock);
  const token = getToken();

  const wsConnectSubscribe = React.useCallback(async () => {
    if (!token) {
      return null;
    }
    try {
      const { data } = await T.GET('/auth');
      ws.connect({}, () => {
        ws.subscribe(
          `/user/sub/user`,
          (noti) => {
            if (!isChatNoti) {
              const newNoti = JSON.parse(noti.body);
              console.log(newNoti.type);
              // chat 보냈을 때 채팅방에 둘다 있을 때 타입 0
              // chat 보냈을 때 채팅방에 한명만 있고 상대방은 로그인 했을 때 타입 1
              // chat 보냈을 때 상대방이 로그아웃 타입 2
              // tap 요청 받았을 때 타입 3
              // tap 요청 거절한게 타입 4
              // tap 요청 수락한게 타입 5
              if (newNoti.type === 1) {
                dispatch(setChatNoti(true));
              }
              if (newNoti.type === 3) {
                dispatch(setTapRecieveNoti(true));
              }
              if (newNoti.type === 4) {
                dispatch(setTapRefuseNoti(true));
              }
              if (newNoti.type === 5) {
                dispatch(setTapAcceptNoti(true));
              }
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

  return [wsConnectSubscribe, wsDisConnectUnsubscribe, token, isChatNoti];
}
