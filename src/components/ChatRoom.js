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
import BasicProfile from '../assets/image/basicProfile.png';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import timeCheck from '../utils/timeCheck';

const NONE_MESSAGE = '_test용_';

const ChatRoom = ({ userId }) => {
  const dispatch = useDispatch();
  const roomInfo = useSelector((state) => state.chat.byId[userId]);
  const currentRoom = useSelector((state) => state.chat.current);
  const userInfo = useSelector((state) => state.user);
  const lastMessage = roomInfo.roomStatus?.split('/')[2];
  const openCheck = currentRoom.userId === roomInfo.userId;

  const openChatRoom = () => {
    if (openCheck) {
      return;
    }
    dispatch(closeNoneTalkRoomList());
    dispatch(loadTalkRoomListToAxios());
    dispatch(loadCurrentRoom(roomInfo));
  };
  const readCheck = roomInfo.roomStatus.split('/')[0];

  console.log('룸 인포======>', roomInfo);
  const isRead = () => {
    if (openCheck) {
      return true;
    }
    if (readCheck === userInfo.email) {
      return true;
    }
    if (readCheck !== '@@') {
      return false;
    }
    return true;
  };

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
        <div>
          <ImageBox
            className="imageBox"
            src={roomInfo.profile ? roomInfo.profile : BasicProfile}
          />
        </div>
        <div>
          <div className="name">
            <Text
              bold20
              color={openCheck ? ColorStyle.PrimaryPurple : ColorStyle.Gray500}
            >
              {roomInfo.userName}
            </Text>
            <Text regular16>{timeCheck(lastMessageTime)}</Text>
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
      <hr />
    </Wrap>
  );
};

const Wrap = styled.div`
position: relative;
top:40px;
  hr {
    position: relative;
    width: 95%;
    border: 1px solid ${ColorStyle.Gray100 + Opacity[30]};
    top:-20px;
    left:-10px;
  }
  .name {
    margin: 0px 0px 20px 0px;
    width: 350px;
    display: flex;
    justify-content: space-between;
  }

  .message {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 350px;
      height: 20px;
    }
  }
`;

const ProfileWrap = styled.div`

  min-height: 70px;
  max-height: 70px;
  margin: 0px 0px 32px 0px;
  display: flex;
  align-items: center;
`;

const ImageBox = styled.div`
  height: 50px;
  width: 50px;
  margin: 0px 20px 20px 0px;

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 25px;
`;
export default ChatRoom;
