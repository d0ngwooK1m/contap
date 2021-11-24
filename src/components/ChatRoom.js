/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '../elements';
import {
  loadCurrentRoom,
  closeNoneTalkRoomList,
  loadTalkRoomListToAxios,
} from '../features/chat/actions';
import BasicProfile from '../svgs/BasicProfile.svg';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import timeCheck from '../utils/timeCheck';
import { border, borderRadius } from '@mui/system';

const NONE_MESSAGE = '_test용_';

const ChatRoom = ({ userId, closeList }) => {
  const dispatch = useDispatch();
  const roomInfo = useSelector((state) => state.chat.byId[userId]);
  const currentRoom = useSelector((state) => state.chat.current);
  const userInfo = useSelector((state) => state.user);
  const lastMessage = roomInfo.roomStatus?.split('/')[2];
  const openCheck = currentRoom.userId === roomInfo.userId;
  console.log(roomInfo);

  React.useEffect(() => {
    if (roomInfo.roomStatus === null) {
      console.log('룸 안들어올떄');
      dispatch(loadCurrentRoom(roomInfo));
    }
  }, []);

  const openChatRoom = () => {
    if (openCheck) {
      return;
    }
    closeList();
    // dispatch(closeNoneTalkRoomList());
    dispatch(loadTalkRoomListToAxios());
    dispatch(loadCurrentRoom(roomInfo));
  };
  const readCheck = roomInfo.roomStatus?.split('/')[0];

  console.log('리드체크======>', readCheck);

  console.log('룸 인포======>', roomInfo);
  const isRead = () => {
    if (openCheck) {
      return true;
    } else if (readCheck === userInfo.email) {
      return true;
    } else if (readCheck === '@@') {
      return true;
    }
    return false;
  };

  // const isRead = readCheck !== '@@' ? false : true

  const year = roomInfo.date.substring(0, 2);
  const month = roomInfo.date.substring(2, 4);
  const day = roomInfo.date.substring(4, 6);
  const time = `${roomInfo.date.substring(6, 8)}:${roomInfo.date.substring(
    8,
    10,
  )}`;

  const lastMessageTime = `20${year}-${month}-${day} ${time}`;

  return (
    <Wrap>
      <ProfileWrap onClick={openChatRoom}>
        <div className="profile">
          <ImageBox
            className="imageBox"
            src={roomInfo.profile ? roomInfo.profile : BasicProfile}
          />
          {roomInfo.login && <OnlineBadge />}
        </div>
        <div className="desc">
          <div className="name">
            <Text
              bold20
              color={
                openCheck
                  ? ColorStyle.PrimaryPurple
                  : isRead()
                  ? ColorStyle.Gray100
                  : ColorStyle.Gray500
              }
            >
              {roomInfo.userName}
            </Text>
            <Text regular16 color={ColorStyle.Gray100}>
              {timeCheck(lastMessageTime)}
            </Text>
          </div>
          <div className="message">
            <Text
              regular20
              color={isRead() ? ColorStyle.Gray100 : ColorStyle.Gray500}
            >
              {lastMessage !== NONE_MESSAGE && lastMessage}
            </Text>
          </div>
        </div>
      </ProfileWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  border-bottom: 1px solid ${ColorStyle.Gray100 + Opacity[20]};
  align-items: center;
  padding: 18px 16px;
  max-height: 100px;
  cursor: pointer;

  .desc {
    min-width: 309px;
  }
  .name {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }

  .message {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 28px;
    }
  }

  .basicProfile {
    border: 1px solid ${ColorStyle.Gray100 + Opacity[25]};
    height: 64px;
    width: 64px;
    box-sizing: border-box;
    border-radius: 32px;
    margin: 0px 16px 0px 0px;
  }

  &:hover {
    background-color: ${ColorStyle.BackGround100};
  }
`;

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;

  .profile {
    position: relative;
  }
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

const ImageBox = styled.div`
  height: 64px;
  width: 64px;
  margin: 0px 16px 0px 0px;
  box-sizing: border-box;
  border: 1px solid ${ColorStyle.Gray100 + Opacity[25]};

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-size: cover;
  border-radius: 60px;
`;
export default ChatRoom;
