/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
// import { ColorStyle } from '../utils/systemDesign';

import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentRoom, loadNoneTalkRoomListToAxios } from '../features/chat/actions';
import Chat from '../components/Chat/Chat';
import ChatRoomList from '../components/ChatRoomList';
import GrabTalkAdd from '../components/GrabTalkAdd';

const Grabtalk = () => {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state) => state.chat.current);
  const noneTalkList = useSelector((state)=> state.chat.noneChatListIds)
  const addChatRoom = () => {
    dispatch(loadCurrentRoom({}))
    dispatch(loadNoneTalkRoomListToAxios());
  };

  return (
    <Wrapper>
      <Menu>
        <div>
          <button type="button" onClick={addChatRoom}>
            추가하기
          </button>
        </div>
        <ChatRoomList />
      </Menu>
      {noneTalkList.length !== 0 && <GrabTalkAdd noneTalkList={ noneTalkList}/>}
      <Room>{currentRoom.userId && <Chat current={currentRoom} />}</Room>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;
  overflow-y: hidden;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  max-width: 400px;
  min-height: 89vh;
  margin: 0px 0px 0px 165px;
  border-right: solid 1px #a09bac4d;
`;

const Room = styled.div`
  width: 100%;
`;

export default Grabtalk;
