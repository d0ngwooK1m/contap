/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ColorStyle } from '../../utils/systemDesign';
import { Text } from '../../elements';

const MessageBox = () => {
  const messageList = useSelector((state) => state.chat.messages);
  const userInfo = useSelector((state) => state.user.email);
  console.log(userInfo);
  console.log('메시지 박스 열림');
  return (
    <ChatMessageBox>
      <div>채팅내용</div>
      {messageList?.map((msg, i) => {
        return (
          <Speechbubble key={i} isMe={msg.writer === userInfo}>
            <Text regular16>{msg.message}</Text>
          </Speechbubble>
        );
      })}
    </ChatMessageBox>
  );
};

const ChatMessageBox = styled.div`
  background-color: ${ColorStyle.BackGround100};
  max-width: 100%;
  max-height: 670px;
  overflow-y: scroll;
`;

const Speechbubble = styled.div`
  background-color: ${({ isMe }) =>
    isMe ? '#723CD4' : ColorStyle.BackGround300};
  width: fit-content;
  max-width: 450px;
  word-break: break-all;
  margin: ${({ isMe }) =>
    isMe ? '24px 156px 24px auto' : '24px auto 24px 80px'};
  padding: 24px;
  border-radius: ${({ isMe }) =>
    isMe ? '30px 30px 5px 30px' : '30px 30px 30px 5px'}; ;
`;
export default MessageBox;
