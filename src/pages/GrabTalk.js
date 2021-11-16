/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
// import { ColorStyle } from '../utils/systemDesign';

import { useDispatch, useSelector } from 'react-redux';
import Chat from '../components/Chat/Chat';
import ChatRoomList from '../components/ChatRoomList'
const Grabtalk = () => {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state) => state.chat.current)
  console.log(currentRoom)
  return (
    <Wrapper>
      <Menu>
        <ChatRoomList/>
      </Menu>
      <Room>
        {currentRoom.userId && <Chat current={currentRoom} />}
      </Room>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  height: 100vh;
  margin: 0px 0px 0px 165px;
  border-right: solid 1px #a09bac4d;
`;

const Room = styled.div`
  background-color: aqua;
  width: 100%;
`;

export default Grabtalk;
