/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '../elements';
import {
  loadCurrentRoom,
  closeNoneTalkRoomList,
} from '../features/chat/actions';
import BasicProfile from '../assets/image/basicProfile.png';
import { ColorStyle } from '../utils/systemDesign';

const NONE_MESSAGE = '_test용_';

const ChatRoom = ({ userId }) => {
  const dispatch = useDispatch();
  const roomInfo = useSelector((state) => state.chat.byId[userId]);
  const currentRoom = useSelector((state) => state.chat.current);
  const lastMessage = roomInfo.roomStatus?.split('/')[2];
  const openCheck = currentRoom.userId === roomInfo.userId;

  const openChatRoom = () => {
    if (openCheck) {
      return
    }
    dispatch(closeNoneTalkRoomList());
    dispatch(loadCurrentRoom(roomInfo));
  };

  return (
    <>
      <Wrap onClick={openChatRoom}>
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
            <Text regular16>1시간전</Text>
          </div>
          <div className="message">
            <Text regular20>{lastMessage !== NONE_MESSAGE && lastMessage}</Text>
          </div>
        </div>
      </Wrap>
      <hr />
    </>
  );
};

const Wrap = styled.div`
  min-height: 70px;
  max-height: 70px;
  margin: 10px 0px;
  display: flex;
  align-items: center;

  .name {
    margin: 0px 0px 20px 0px;
    width: 320px;
    display: flex;
    justify-content: space-between;
  }

  .message {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 300px;
      height: 20px;
    }
  }
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
