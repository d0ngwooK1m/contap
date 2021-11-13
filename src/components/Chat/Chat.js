/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// 소켓
import StompJs from 'stompjs';
import SockJS from 'sockjs-client';
import {
  loadMessagesToAxios,
  writeMessage,
  loading,
  getMessage,
} from '../../features/chat/actions';

import { getToken } from '../../utils/auth';
import MessageWrite from './MessageWrite';
import MessageBox from './MessageBox';

const Chat = ({ userId }) => {
  const baseURL = process.env.REACT_APP_SERVER_URI;

  const grapList = useSelector((state) => state.taps.byId);
  const userInfo = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.chat.isLoading);

  console.log(isLoading);
  const { roomId } = grapList[userId];

  console.log(userInfo);
  console.log(grapList[userId]);
  // http://52.79.248.107:8080
  const dispatch = useDispatch();
  const sock = new SockJS(`${baseURL}/ws-stomp`);
  const ws = StompJs.over(sock);
  const token = getToken();
  console.log(ws);

  const wsConnectSubscribe = React.useCallback(() => {
    const data = {
      roomId,
      message: '',
      writer: userInfo.email,
      userEmail: userInfo.email,
    };

    try {
      ws.connect({}, () => {
        ws.subscribe(
          `/sub/chat/room/${roomId}`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            console.log(userInfo);
            dispatch(getMessage(newMessage));
          },

          { token, userEmail: userInfo.email },
        );
      });
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
    dispatch(loadMessagesToAxios(roomId));
    console.log(ws);
    console.log(roomId);

    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [dispatch, userId, wsConnectSubscribe, wsDisConnectUnsubscribe]);

  // 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (ws, callback) => {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      0.1, // 밀리초 간격으로 실행
    );
  };

  // 메시지 보내기
  const sendMessage = (message) => {
    try {
      // token이 없으면 로그인 페이지로 이동
      // if (!token) {
      //   alert("토큰이 없습니다. 다시 로그인 해주세요.");
      //   history.replace("/login");
      // }

      if (message === '') {
        return;
      }

      // send할 데이터

      const data = {
        roomId,
        message,
        writer: userInfo.email,
        // receiver: grapList[userId].userName,
        receiver: grapList[userId].email,
      };

      //   빈문자열이면 리턴
      //   로딩 중
      waitForConnection(ws, function () {
        ws.send('/pub/chat/message', {}, JSON.stringify(data));
        dispatch(writeMessage(''));
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const closeChat = () => {
  //   setOpen(false);
  //   wsDisConnectUnsubscribe();
  // };

  // 웹소켓 연결, 구독

  // 연결해제, 구독해제;

  // 메시지 보내기

  // const sendMessage = React.useCallback((message) => {
  //   ws.send(
  //     '/pub/chat/message',
  //     {},
  //     JSON.stringify({ roomId: roomId, message: message, writer: userId }),
  //   );
  // console.log(ws);

  // },[]);

  return (
    <div>
      <MessageBox />

      <MessageWrite sendMessage={sendMessage} />
    </div>
  );
};

Chat.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Chat;
