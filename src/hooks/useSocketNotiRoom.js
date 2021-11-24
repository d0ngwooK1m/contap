import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StompJs from 'stompjs';
import SockJS from 'sockjs-client';
import { getToken } from '../utils/auth';
import T from '../api/tokenInstance';
import {
  setChatNoti,
  setTapReceiveNoti,
  setTapAcceptNoti,
  setTapRefuseNoti,
} from '../features/notice/actions';
import { loadTalkRoomListToAxios } from '../features/chat/actions';
import { loadReceiveTapToAxios } from '../features/taps/actions';

const baseURL = process.env.REACT_APP_SERVER_URI;

export default function useSocketNotiRoom() {
  const dispatch = useDispatch();
  const isChatNoti = useSelector((state) => state.notice.isChatNoti);

  const sock = new SockJS(`${baseURL}/ws-stomp`);
  const ws = StompJs.over(sock);
  const token = getToken();

  console.log('현재 페이지 =====>', window.location.pathname);
  const history = useHistory();

  const wsConnectSubscribe = React.useCallback(async () => {
    if (!token) {
      return null;
    }
    try {
      const { data } = await T.GET('/auth');
      ws.connect({}, () => {
        ws.subscribe(
          `/user/sub/user`,
          async (noti) => {
            if (!isChatNoti) {
              const newNoti = JSON.parse(noti.body);
              console.log('노티 들어옴!!!!!!!!!!!!!!!!!!!!!!!!', newNoti);

              // chat 보냈을 때 채팅방에 둘다 있을 때 타입 1
              // chat 보냈을 때 채팅방에 한명만 있고 상대방은 로그인 했을 때 타입 2
              // chat 보냈을 때 상대방이 로그아웃 타입 4
              // tap 요청 받았을 때 타입 8
              // tap 요청 거절한게 타입 16
              // tap 요청 수락한게 타입 32
              if (newNoti.type === 2) {
                if (history.location.pathname === '/grabtalk') {
                  console.log('디패 로드 톡룸');
                  await dispatch(loadTalkRoomListToAxios());
                }
                dispatch(setChatNoti(true));
              }
              if (newNoti.type === 8) {
                console.log('tap 요청 받았어!');
                if (history.location.pathname === '/contap') {
                  console.log('디패 로드 톡룸');
                  await dispatch(loadReceiveTapToAxios());
                }
                dispatch(setTapReceiveNoti(true));
              }
              if (newNoti.type === 16) {
                console.log('거절 되었어!');
                dispatch(setTapRefuseNoti(true));
              }
              if (newNoti.type === 32) {
                console.log('그랩되었어!');
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
