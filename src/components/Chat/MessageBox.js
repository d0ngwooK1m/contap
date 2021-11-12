/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadMessages } from '../../features/chat/actions';
import styled from 'styled-components';
import { ColorStyle } from '../../utils/systemDesign';
import { Text } from '../../elements';


const MessageBox = () => {
  const dispatch = useDispatch()
  const messageList = useSelector((state) => state.chat.messages)
  console.log(messageList)
  return (
    <ChatMessageBox>
      <div>채팅내용</div>
      {messageList?.map((msg, i) => {
        return <div key={i}>
          <Text regular16>{msg.writer} : {msg.message}</Text>
        </div>
      })}
    </ChatMessageBox>
  );
};

const ChatMessageBox = styled.div`
background-color: ${ColorStyle.BackGround100};
`;
export default MessageBox;
