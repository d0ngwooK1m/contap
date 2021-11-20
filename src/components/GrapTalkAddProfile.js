/* eslint-disable */
import React from 'react';
import { Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import HashTag from './HashTag';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import BasicProfile from '../assets/image/basicProfile.png';
import {
  createTalkRoom,
  loadCurrentRoom,
  closeNoneTalkRoomList,
} from '../features/chat/actions';

const GrapTalkAddProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const roomInfo = useSelector((state) => state.chat.noneChatList[userId]);
  const roomList = useSelector((state) => state.chat.allIds);
  console.log(roomInfo);
  const stackHashTags = roomInfo.hashTags
    ?.split('_')[0]
    ?.split('@')
    .slice(1, 2);
  const interestHashTags = roomInfo.hashTags
    ?.split('_')[1]
    ?.split('@')
    .slice(1, 4);

  const category = roomInfo.field === 2 ? false : true;

  console.log(category)


  const addTalkRoom = () => {
    // 유저아이디가 왼쪽 룸 리스트에 있으면
    if (roomList.indexOf(roomInfo.userId) !== -1) {
      dispatch(closeNoneTalkRoomList());
      dispatch(loadCurrentRoom(roomInfo));
      return;
    }
    dispatch(createTalkRoom(roomInfo));
    dispatch(loadCurrentRoom(roomInfo));
  };

  return (
    <Wrap>
      <ProfileWrap onClick={addTalkRoom}>
        <ImageBox
          className="imageBox"
          src={roomInfo.profile ? roomInfo.profile : BasicProfile}
        />
        <div>
          <div className="name">
            <Text bold20>{roomInfo.userName}</Text>
          </div>
          <div>
            <Text
              // color={ColorStyle.PrimaryPurple}
              color={
                category ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint
              }
              regular20
            >
              # {stackHashTags}
            </Text>
          </div>
        </div>
        <Hash className="tags">
          {interestHashTags?.map((stack, idx) => {
            return stack && <HashTag key={idx} tag={stack} category={category} />;
          })}
        </Hash>
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
    top:-20px;
    width: 95%;
    border: 1px solid ${ColorStyle.Gray100 + Opacity[30]};
  }
`;

const ProfileWrap = styled.div`
  width: 580px;
  /* background-color: red; */
  margin: 0px auto 32px 80px;
  display: flex;
  .tags {
    width: 60%;
    display: flex;
    flex-direction: row;
    margin: 0px 0px 0px auto;
  }
  .name {
    margin: 0px 0px 10px 0px;
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
const Hash = styled.div`
  display: flex;
  margin: 12px 0px 0px 16px;
`;

export default GrapTalkAddProfile;
