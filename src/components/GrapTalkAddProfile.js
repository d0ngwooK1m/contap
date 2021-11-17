/* eslint-disable */
import React from 'react';
import { Text } from '../elements';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import HashTag from './HashTag';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import BasicProfile from '../assets/image/basicProfile.png';
import { createTalkRoom } from '../features/chat/actions';

const GrapTalkAddProfile = ({ userId }) => {
  const dispatch = useDispatch()
  const roomInfo = useSelector((state) => state.chat.noneChatList[userId]);
  console.log(roomInfo);
  const stackHashTags = roomInfo.hashTags
    ?.split('_')[0]
    ?.split('@')
    .slice(1, 2);
  const interestHashTags = roomInfo.hashTags
    ?.split('_')[1]
    ?.split('@')
    .slice(1, 4);
  
  const addTalkRoom = () => {
    dispatch(createTalkRoom(roomInfo))
  }
  
  return (
    <>
      <Wrap onClick={addTalkRoom}>
    <ImageBox
          className="imageBox"
          src={roomInfo.profile ? roomInfo.profile : BasicProfile}
        />
      <div className="name">
        <div>
          <Text bold20>{roomInfo.userName}</Text>
        </div>
        <div>
          <Text
            color={ColorStyle.PrimaryPurple}
            // color={
            //   category() ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint
            // }
            regular20
          >
            # {stackHashTags}
          </Text>
        </div>
      </div>
      <Hash className="tags">
        {interestHashTags?.map((stack, idx) => {
          // return (
          //   stack && <HashTag key={idx} tag={stack} category={category()} />
          // );
          return (
            stack && <HashTag key={idx} tag={stack} />
          );
        })}
      </Hash>
      </Wrap>
      <hr/>
    </>
  );
};

const Wrap = styled.div`
  width: 580px;
  /* background-color: red; */
  margin: 16px auto 16px 80px;
  min-height: 70px;
  display: flex;
  align-items: center;
  .tags {
    margin: auto;
    display: flex;
    flex-direction: row;
  }
`;
const ImageBox = styled.div`
  height: 50px;
  width: 50px;
  margin: 22px;

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
