/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ColorStyle } from '../../utils/systemDesign';
import { Text } from '../../elements';
import ChatInfinityScroll from './ChatInfinityScroll';
import {nextPageToAxios } from '../../features/chat/actions'

const MessageBox = ({ roomId }) => {
  const dispatch = useDispatch()
  const messageList = useSelector((state) => state.chat.messages);
  const userInfo = useSelector((state) => state.user.email);
  const scrollRef = React.useRef();
  const page = messageList.length !== 0 ? messageList[0].id : null;
  const isNext = messageList.length < 15 ? false : true
  const [prevHeight, setPrevHeight] = React.useState(null);

  console.log(page);
  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  React.useEffect(() => {
    if (prevHeight) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevHeight;
      console.log(prevHeight, scrollRef.current.scrollHeight);
      return setPrevHeight(null);
    } else {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    }
    // scrollToBottom();
  }, [messageList]);

  const callNext = () => {
    if (isNext === false) {
      return;
    }
    console.log(page)
    dispatch(nextPageToAxios(roomId, page));
  };

  return (
    <ChatInfinityScroll
    callNext={callNext}
    isNext={isNext}
    // loading={is_loading}
      scrollTo={scrollRef}
      prevHeight={prevHeight}
    setPrevHeight={setPrevHeight}
    >
      <ChatMessageBox ref={scrollRef}>
        {messageList?.map((msg, i) => {
          return (
              <Speechbubble key={i} isMe={msg.writer === userInfo}>
                <Text regular16>{msg.message}</Text>
              </Speechbubble>
            )
        })}
      </ChatMessageBox>
    </ChatInfinityScroll>
  );
};

const ChatMessageBox = styled.div`
  background-color: ${ColorStyle.BackGround};
  position: absolute;
  bottom: 72px;
  width: 700px;
  max-height: 670px;
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
