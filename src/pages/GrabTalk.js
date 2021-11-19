/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
// import { ColorStyle } from '../utils/systemDesign';
import { IconButton } from '@mui/material';
import { Text } from '../elements';

import { useDispatch, useSelector } from 'react-redux';
import {
  loadCurrentRoom,
  loadNoneTalkRoomListToAxios,
  closeNoneTalkRoomList,
} from '../features/chat/actions';
import Chat from '../components/Chat/Chat';
import ChatRoomList from '../components/ChatRoomList';
import GrabTalkAdd from '../components/GrabTalkAdd';
import { ReactComponent as Close } from '../svgs/CloseRound.svg';
import BasicProfile from '../assets/image/basicProfile.png';
import { ReactComponent as GrabTalkBasicSvg } from '../svgs/GrabTalkBasic.svg';
import { ReactComponent as ChatAddSvg } from '../svgs/ChatAdd.svg';
import { ColorStyle } from '../utils/systemDesign';

const Grabtalk = () => {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state) => state.chat.current);
  const noneTalkList = useSelector((state) => state.chat.noneChatListIds);
  const [isAddRoom, setIsAddRoom] = React.useState(false);
  const addChatRoom = () => {
    if (noneTalkList.length !== 0) {
      return;
    }
    setIsAddRoom(true);
    dispatch(loadCurrentRoom({}));
    dispatch(loadNoneTalkRoomListToAxios());
  };

  const closeList = () => {
    setIsAddRoom(false);
  dispatch(closeNoneTalkRoomList());
  }
  

  return (
    <Wrapper>
      <Menu>
        <div className="roomListHeader">
          <Text bold32>메세지함</Text>
          <IconButton className="addBtn" type="button" onClick={addChatRoom}>
            {isAddRoom ? <ChatAddSvg stroke={ColorStyle.PrimaryPurple}/> : <ChatAddSvg stroke={ColorStyle.Gray500}/>}
          </IconButton>
        </div>
        <ChatRoomList />
      </Menu>
      {noneTalkList.length !== 0 && <GrabTalkAdd noneTalkList={noneTalkList} closeList={closeList}/>}
      <Room>
        {!currentRoom.userId && noneTalkList.length == 0 && (
          <SvgWrap>
            <GrabTalkBasicSvg />
            <Text bold32>그랩이 되면 대화할 수 있어요</Text>
          </SvgWrap>
        )}
        {currentRoom.userId && (
          <>
            <Header className="header">
              <ImageBox
                className="imageBox"
                src={currentRoom.profile ? currentRoom.profile : BasicProfile}
              />
              <Text bold32>{currentRoom.userName}</Text>
              <IconButton
                onClick={() => {
                  dispatch(loadCurrentRoom({}));
                }}
              >
                <Close />
              </IconButton>
            </Header>
            <Chat current={currentRoom} />
          </>
        )}
      </Room>
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
  min-width: 445px;
  max-width: 445px;
  min-height: 89vh;
  margin: 0px 0px 0px 128px;
  border-right: solid 1px #a09bac4d;
  .addBtn {
    position: relative;
    right: 10px;
  }
  .roomListHeader {
    display: flex;
    justify-content: space-between;
    min-height: 80px;
    max-height: 80px;
    align-items: center;
  }
`;

const Room = styled.div`
  width: 700px;
  position: relative;
`;

const SvgWrap = styled.div`
  position: absolute;
  top: 40px;
  left: 200px;
  p {
    position: relative;
    top: -50px;
  }
`;

const Header = styled.div`
  display: flex;
  position: relative;
  background-color: ${ColorStyle.BackGround};
  align-items: center;
  width: 700px;
  min-height: 80px;
  max-height: 80px;
  z-index: 1;

  button {
    position: absolute;
    right: 0px;
  }
`;

const ImageBox = styled.div`
  height: 60px;
  width: 60px;
  margin: 20px 32px 20px 48px;

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 60px;
`;

export default Grabtalk;
