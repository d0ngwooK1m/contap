/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadMessages } from '../../features/chat/actions';
import styled from 'styled-components';
import { ColorStyle } from '../../utils/systemDesign';
import { Text } from '../../elements';


const MessageBox = ({writer, reciever}) => {
  const dispatch = useDispatch()
  const messageList = useSelector((state) => state.chat.messages)
  const userInfo = useSelector((state)=>state.user.userName)
  console.log(userInfo)
  return (
    <ChatMessageBox>
      <div>채팅내용</div>
      {messageList?.map((msg, i) => {
        return <Speechbubble key={i}>
          <Text regular16>{msg.writer} : {msg.message}</Text>
        </Speechbubble>
      })}
    </ChatMessageBox>
  );
};

const ChatMessageBox = styled.div`
background-color: ${ColorStyle.BackGround100};
max-height: 400px;
overflow-y: scroll;
`;

const Speechbubble = styled.div`
  background-color: ${ColorStyle.PrimaryPurple};
  margin: 10px;
  padding: 10px;
  border-radius: 100px;
`;
export default MessageBox;
