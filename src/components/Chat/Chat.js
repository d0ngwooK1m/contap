/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size } from '../../utils/sizeCheck';

// 소켓
import StompJs from 'stompjs';
import SockJS from 'sockjs-client';
import {
  loadMessagesToAxios,
  writeMessage,
  getMessage,
  loadTalkRoomListToAxios,
  loading,
} from '../../features/chat/actions';

import { getToken } from '../../utils/auth';
import MessageWrite from './MessageWrite';
import MessageBox from './MessageBox';

const Chat = ({ current, children }) => {
  const baseURL = process.env.REACT_APP_SERVER_URI;
  const userInfo = useSelector((state) => state.user);
  console.log('유저정보 확인 =======>', current);

  // const size = () => {
  //   if (is616px) {
  //     return '616'
  //   } else if (is768px) {
  //     return '768'
  //   } else {
  //     'nomal'
  //   }
  // }
  // console.log(size);

  const { roomId, userId, email } = current;

  const dispatch = useDispatch();
  const sock = new SockJS(`${baseURL}/ws-stomp`);
  const ws = StompJs.over(sock);
  const token = getToken();

  const wsConnectSubscribe = React.useCallback(() => {
    try {
      ws.connect({}, async () => {
        // dispatch(loading(true));
        console.log('커넥트 시작');
        ws.subscribe(
          `/sub/chat/room/${roomId}`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            console.log(userInfo);
            dispatch(getMessage(newMessage));
            dispatch(loadTalkRoomListToAxios());
          },
          { token, userEmail: userInfo.email },
        );
      });
      dispatch(loadMessagesToAxios(roomId, 0));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, userId, ws]);

  // 연결해제, 구독해제;
  const wsDisConnectUnsubscribe = React.useCallback(() => {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe('sub-0');
        },
        // { token }
      );
    } catch (error) {
      console.log(error);
    }
  }, [ws]);

  //  렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [dispatch, userId, wsConnectSubscribe, wsDisConnectUnsubscribe]);

  // 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (waitWs, callback) => {
    setTimeout(
      () => {
        // 연결되었을 때 콜백함수 실행
        if (waitWs.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(waitWs, callback);
        }
      },
      0.1, // 밀리초 간격으로 실행
    );
  };

  // 메시지 보내기
  const sendMessage = (message) => {
    try {
      // dispatch(loading(true));
      const data = {
        roomId,
        message,
        writer: userInfo.email,
        reciever: email,
      };

      waitForConnection(ws, () => {
        ws.send('/pub/chat/message', {}, JSON.stringify(data));
        // dispatch(loading(false));
        // dispatch(writeMessage(''));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MessageWrap size={size}>
      {children}
      <MessageBox className="messageBox" roomId={roomId} />
      <MessageWrite sendMessage={sendMessage} />
    </MessageWrap>
  );
};

const MessageWrap = styled.div`
  position: relative;
  width: 665px;
  height: ${({ size }) => (size === '616' ? '71vh' : '75vh')};
  /* height: 75vh; */
  /* 616픽셀일떄 */
  /* height: 71vh; */

  .messageBox {
  }
`;

Chat.propTypes = {
  current: PropTypes.any.isRequired,
};

export default Chat;
