/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '../elements';
import { loadCurrentRoom } from '../features/chat/actions';

const ChatRoom = ({ userId }) => {
  const dispatch = useDispatch();
  const roomInfo = useSelector((state) => state.chat.byId[userId]);
  const lastMessage = roomInfo.roomStatus?.split('/')[2];
  const openChatRoom = () => {
    dispatch(loadCurrentRoom(roomInfo));
  };
  return (
    <Wrap onClick={openChatRoom}>
      <div>
        <Text bold20>사진</Text>
      </div>
      <div>
        <div className="name">
          <Text bold20>{roomInfo.userName}</Text>
          <Text regular16>1시간전</Text>
        </div>
        <div>
          <Text regular20>{lastMessage}</Text>
          <hr />
        </div>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: red;
  min-height: 70px;
  margin: 10px 0px;
  display: flex;

  .name {
    background-color: blue;
    display: flex;
    justify-content: space-between;
  }
`;

export default ChatRoom;
