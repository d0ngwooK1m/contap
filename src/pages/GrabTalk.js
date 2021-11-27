/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../elements';
import {
  loadCurrentRoom,
  loadNoneTalkRoomListToAxios,
  // closeNoneTalkRoomList,
} from '../features/chat/actions';
import Chat from '../components/Chat/Chat';
import ChatRoomList from '../components/ChatRoomList';
import GrabTalkAdd from '../components/GrabTalkAdd';
import { ReactComponent as Close } from '../svgs/CloseRound.svg';
// import { ReactComponent as GrabTalkBasicSvg } from '../svgs/GrabTalkBasic.svg';
import GrabTalkBasicPng from '../assets/image/noneGrab.png';
import { ReactComponent as ChatAddSvg } from '../svgs/ChatAdd.svg';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import BasicProfile from '../svgs/BasicProfile.svg';
import { size } from '../utils/sizeCheck';

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
  };
  const is730px = !!window.matchMedia('(max-height: 730px)').matches;
  const is616px = !!window.matchMedia('(max-height: 616px)').matches;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Menu>
        <div className="roomListHeader">
          <Text bold32>메세지함</Text>
          <IconButton className="addBtn" type="button" onClick={addChatRoom}>
            <ChatAddSvg
              stroke={isAddRoom ? ColorStyle.PrimaryPurple : ColorStyle.Gray500}
            />
          </IconButton>
        </div>
        <ChatRoomList closeList={closeList} />
      </Menu>
      <Wrapper>
        {isAddRoom && (
          <GrabTalkAdd noneTalkList={noneTalkList} closeList={closeList} />
        )}
        <Room>
          {!currentRoom.userId && !isAddRoom && (
            <BasicImageWrap>
              <div className="svg">
                <img src={GrabTalkBasicPng} width="140px" height="140px" />
              </div>
              <Text regular20>그랩이 되면 대화할 수 있어요</Text>
            </BasicImageWrap>
          )}
          {currentRoom.userId && (
            <Chat current={currentRoom} className="chat">
              <Header className="header">
                <ImageBox
                  className="imageBox"
                  src={currentRoom.profile ? currentRoom.profile : BasicProfile}
                >
                  {currentRoom.login && <OnlineBadge />}
                </ImageBox>

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
  padding-top: 100px;
  width: 445px;
  max-width: 445px;
  margin: 0px 0px 0px 165px;
  box-sizing: border-box;
  border-right: solid 1px #a09bac4d;
  /* padding-bottom: 31px; */
  /* 616 픽셀일 때 */
  padding-bottom: 60px;

  .addBtn {
    position: relative;
    right: 10px;
  }
  .roomListHeader {
    display: flex;
    justify-content: space-between;
    min-height: 90px;
    max-height: 90px;
    align-items: center;
  }
`;

const Wrapper = styled.div`
  position: relative;
  top: 0px;
  padding-top: 100px;
  display: flex;
  box-sizing: border-box;
  width: 665px;
  padding-bottom: 31px;
`;

const Room = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 31px;
`;

const BasicImageWrap = styled.div`
  word-break: break-all;
  text-align: center;
  border-radius: 16px;
  margin: 0px;
  padding: 42px;
  width: 617px;
  margin-top: 96px;
  margin-left: 48px;
  background-color: ${ColorStyle.BackGround100 + Opacity[70]};
  box-sizing: border-box;
  .svg {
    margin-bottom: 32px;
  }
`;

const Header = styled.div`
  display: flex;
  position: relative;
  background-color: ${ColorStyle.BackGround};
  align-items: center;
  width: 665px;
  min-height: 90px;
  max-height: 90px;
  z-index: 1;

  button {
    position: absolute;
    right: 0px;
  }
`;

const ImageBox = styled.div`
  position: relative;
  height: 64px;
  width: 64px;
  margin: 20px 32px 20px 48px;
  box-sizing: border-box;
  border: 1px solid ${ColorStyle.Gray100 + Opacity[25]};

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-size: cover;
  border-radius: 60px;
`;

const OnlineBadge = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 40px;
  left: 42px;
  border-radius: 20px;
  background: #2bac76;
  border: 4px solid #0f0a1a;
  box-sizing: border-box;
`;

export default Grabtalk;
