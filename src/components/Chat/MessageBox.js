/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ColorStyle } from '../../utils/systemDesign';
import { Text } from '../../elements';

const MessageBox = () => {
  const messageList = useSelector((state) => state.chat.messages);
  const userInfo = useSelector((state) => state.user.email);
  const scrollRef = React.useRef();

  const scrollToBottom = () => {
    console.log('실행 됨');
    console.log(scrollRef.current.scrollHeight);
    console.log(scrollRef.current.scrollTop);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    // scrollRef.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'end',
    //   inline: 'nearest',
    // });
  };
  console.log(messageList);
  console.log('메시지 박스 열림');
  React.useEffect(() => {
    scrollToBottom();
  }, [messageList.length]);
  return (
      <ChatMessageBox ref={scrollRef}>
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
  background-color: ${ColorStyle.BackGround};
  position: absolute;
  bottom: 72px;
  width: 700px;
  max-height: 600px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    margin-left: 30px;
    width: 5px;
    height: 8px;
  }
`;

const Speechbubble = styled.div`
  background-color: ${({ isMe }) =>
    isMe ? '#723CD4' : ColorStyle.BackGround300};
  width: fit-content;
  max-width: 450px;
  word-break: break-all;
  margin: ${({ isMe }) =>
    isMe ? '24px 0px 24px auto' : '24px auto 24px 48px'};
  padding: 24px;
  border-radius: ${({ isMe }) =>
    isMe ? '30px 30px 5px 30px' : '30px 30px 30px 5px'}; ;
`;
export default MessageBox;
