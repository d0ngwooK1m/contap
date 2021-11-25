/* eslint-disable */
import React from 'react';
import { Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import HashTag from './HashTag';
import {
  ColorStyle,
  Opacity,
  category,
  professionColor,
} from '../utils/systemDesign';
import BasicProfile from '../svgs/BasicProfile.svg';
import {
  createTalkRoom,
  loadCurrentRoom,
  closeNoneTalkRoomList,
} from '../features/chat/actions';

const GrapTalkAddProfile = ({ roomInfo, closeList }) => {
  const dispatch = useDispatch();
  // const roomInfo = useSelector((state) => state.chat.noneChatList[userId]);
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

  const cat = category(roomInfo.field);
  const color = professionColor(cat);
  const hashColor = professionColor(cat, 15);

  console.log(category);

  const addTalkRoom = () => {
    // 유저아이디가 왼쪽 룸 리스트에 있으면
    if (roomList.indexOf(roomInfo.userId) !== -1) {
      closeList();
      // dispatch(closeNoneTalkRoomList());
      dispatch(loadCurrentRoom(roomInfo));
      return;
    }
    closeList();
    dispatch(createTalkRoom(roomInfo));
    dispatch(loadCurrentRoom(roomInfo));
  };

  return (
    <Wrap>
      <ProfileWrap onClick={addTalkRoom}>
        <ImageBox
          className="imageBox"
          src={roomInfo.profile ? roomInfo.profile : BasicProfile}
        >
          {roomInfo.login && <OnlineBadge />}
        </ImageBox>
        <div style={{ textAlign: 'left' }}>
          <div className="name">
            <Text bold20>{roomInfo.userName}</Text>
          </div>
          <div className="stackHashTags">
            <Text color={color} regular20>
              # {stackHashTags}
            </Text>
          </div>
        </div>
        <Hash className="tags">
          {interestHashTags?.map((stack, idx) => {
            return (
              stack && (
                <HashTag
                  key={idx}
                  tag={stack}
                  hashColor={hashColor}
                  category={cat}
                />
              )
            );
          })}
        </Hash>
      </ProfileWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  border-bottom: 1px solid ${ColorStyle.Gray100 + Opacity[20]};
  padding: 18px 16px;
  max-height: 100px;
  cursor: pointer;

  .stackHashTags {
    width: 150px;
    max-width: 150px;
    margin-left: 16px;
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
  align-items: center;
  display: flex;
  .name {
    margin-top: 6px;
    padding-left: 16px;
  }
  .tags {
    width: 60%;
    display: flex;
    flex-direction: row;
  }
`;
// const ImageBox = styled.div`
//   height: 64px;
//   width: 64px;
//   margin: 0px 16px 0px 0px;

//   background-image: url('${(props) => props.src}');
//   background-position: center;
//   background-size: cover;
//   border-radius: 50px;
// `;
const ImageBox = styled.div`
  position: relative;
  height: 64px;
  width: 64px;
  box-sizing: border-box;
  border: 1px solid ${ColorStyle.Gray100 + Opacity[25]};

  background-image: url('${(props) => props.src}');
  background-position: center;
  background-size: cover;
  border-radius: 50px;
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

const Hash = styled.div`
  display: flex;
  margin-top: 15px;
  margin-left: 10px;
`;

// const Wrap = styled.div`
// background-color: red;

// `;

// const ProfileWrap = styled.div`
//   width: 580px;
//   /* background-color: red; */
//   margin: 0px auto 32px 80px;
//   display: flex;
//   .tags {
//     width: 60%;
//     display: flex;
//     flex-direction: row;
//     margin: 0px 0px 0px auto;
//   }
//   .name {
//     margin: 0px 0px 10px 0px;
//   }

// `;
// const ImageBox = styled.div`
//   height: 50px;
//   width: 50px;
//   margin: 0px 20px 20px 0px;

//   background-image: url('${(props) => props.src}');
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
//   border-radius: 25px;
// `;
// const Hash = styled.div`
//   display: flex;
//   margin: 12px 0px 0px 16px;
// `;

export default GrapTalkAddProfile;
