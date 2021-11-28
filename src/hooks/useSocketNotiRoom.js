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
  // setTapRefuseNoti,
} from '../features/notice/actions';
import { loadTalkRoomListToAxios } from '../features/chat/actions';
import { loadReceiveTapToAxios } from '../features/taps/actions';

const baseURL = process.env.REACT_APP_SERVER_URI;

export default function useSocketNotiRoom() {
  const dispatch = useDispatch();
  // 채팅 알람
  const isChatNoti = useSelector((state) => state.notice.isChatNoti);
  // 컨탭 알람
  const isTapReceiveNoti = useSelector(
    (state) => state.notice.isTapReceiveNoti,
  );
  const isTapAcceptNoti = useSelector((state) => state.notice.isTapAcceptNoti);
  const isContapNoti = !!(isTapReceiveNoti || isTapAcceptNoti);

  const sock = new SockJS(`${baseURL}/ws-stomp`);
  const ws = StompJs.over(sock);
  const token = getToken();
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
            console.log('알림 ===', noti);
            // 채팅 알람이 없을 때
            const newNoti = JSON.parse(noti.body);
            if (!isChatNoti) {
              // chat 보냈을 때 채팅방에 둘다 있을 때 타입 1
              // chat 보냈을 때 채팅방에 한명만 있고 상대방은 로그인 했을 때 타입 2
              // chat 보냈을 때 상대방이 로그아웃 타입 4
              // tap 요청 받았을 때 타입 8
              // tap 요청 거절한게 타입 16
              // tap 요청 수락한게 타입 32

              // 채팅방에 혼자 있으면
              if (newNoti.type === 2) {
                // 그랩톡 페이지에 있을 땐
                if (history.location.pathname === '/grabtalk') {
                  // 왼쪽에 있는 채팅방 리스트를 새로 가져오고
                  await dispatch(loadTalkRoomListToAxios());
                } else {
                  // 그랩톡 페이지에 없을 땐 채팅 알람을 줘
                  await dispatch(setChatNoti(true));
                }
              }
            }
            // 컨탭 알람이 없으면
            if (!isContapNoti) {
              // 탭 요청을 받았으면
              if (newNoti.type === 8) {
                // 컨탭 페이지에 있을 땐
                if (history.location.pathname === '/contap') {
                  // 받은탭 목록을 새로 가져와줘
                  await dispatch(loadReceiveTapToAxios());
                }
                // 받은 탭 알람을 켜줘
                dispatch(setTapReceiveNoti(true));
              }
              // if (newNoti.type === 16) {
              //   console.log('거절 되었어!');
              //   dispatch(setTapRefuseNoti(true));
              // }

              // 상대방이 탭 요청을 수락 했으면
              if (newNoti.type === 32) {
                // 탭 수락 알람을 켜줘
                dispatch(setTapAcceptNoti(true));
              }
            }
          },
          { token, userEmail: data.email },
        );
      });
    } catch (error) {
      console.error(error);
    }
    return null;
  }, []);

  const wsDisConnectUnsubscribe = React.useCallback(() => {
    try {
      ws.disconnect(() => {
        ws.unsubscribe('sub-0');
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [wsConnectSubscribe, wsDisConnectUnsubscribe, token, isChatNoti];
}
