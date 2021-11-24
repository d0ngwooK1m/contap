import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../elements';
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
import { ColorStyle, Opacity } from '../utils/systemDesign';

const Grabtalk = () => {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state) => state.chat.current);
  const noneTalkList = useSelector((state) => state.chat.noneChatList);
  const [isAddRoom, setIsAddRoom] = React.useState(false);

  const addChatRoom = async () => {
    if (isAddRoom) {
      return;
    }
    await dispatch(loadNoneTalkRoomListToAxios());
    dispatch(loadCurrentRoom({}));
    setIsAddRoom(true);
  };

  const closeList = () => {
    setIsAddRoom(false);
    dispatch(closeNoneTalkRoomList());
  };

  return (
    <div style={{ display: 'flex' }}>
      <Menu>
        <div className="roomListHeader">
          <Text bold32>메세지함</Text>
          <IconButton className="addBtn" type="button" onClick={addChatRoom}>
            <ChatAddSvg
              stroke={isAddRoom ? ColorStyle.PrimaryPurple : ColorStyle.Gray500}
            />
          </IconButton>
        </div>
        <ChatRoomList />
      </Menu>
      <Wrapper>
        {isAddRoom && (
          <GrabTalkAdd noneTalkList={noneTalkList} closeList={closeList} />
        )}
        <Room>
          {!currentRoom.userId && !isAddRoom && (
            <SvgWrap>
              <GrabTalkBasicSvg />
              <Text bold24>그랩이 되면 대화할 수 있어요</Text>
            </SvgWrap>
          )}
          {currentRoom.userId && (
            <Chat current={currentRoom} className="chat">
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
                  <Close stroke={ColorStyle.Gray500} />
                </IconButton>
              </Header>
            </Chat>
          )}
        </Room>
      </Wrapper>
    </div>
  );
};

const Menu = styled.div`
  position: relative;
  top: 0px;
  display: flex;
  flex-direction: column;
  padding-top: 120px;
  width: 445px;
  max-width: 445px;
  min-height: 80vh;
  height: 84vh;
  margin: 0px 0px 0px 165px;
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

const Wrapper = styled.div`
  position: relative;
  top: 0px;
  padding-top: 120px;
  display: flex;
  width: 665px;
`;

const Room = styled.div`
  position: relative;
  width: 100%;
  background-color: antiquewhite;

  .mseeageRoom {
    background-color: red;
  }
`;

const SvgWrap = styled.div`
  width: fit-content;
  margin: auto;
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
  width: 665px;
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
  border: 1px solid ${ColorStyle.Gray100 + Opacity[25]};

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-size: cover;
  border-radius: 60px;
`;

export default Grabtalk;
