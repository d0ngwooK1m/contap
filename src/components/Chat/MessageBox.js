/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ColorStyle } from '../../utils/systemDesign';
import { Text } from '../../elements';
import ChatInfinityScroll from './ChatInfinityScroll';
import { nextPageToAxios } from '../../features/chat/actions';

const MessageBox = ({ roomId }) => {
  const dispatch = useDispatch();
  const messageList = useSelector((state) => state.chat.messages);
  const userInfo = useSelector((state) => state.user.email);
  const scrollRef = React.useRef();
  const page = messageList.length !== 0 ? messageList[0].id : null;
  const isNext = messageList[0]?.isNext===false ? false : true
  
  const [prevHeight, setPrevHeight] = React.useState(null);

  console.log( '리스트 =========>',messageList)
  console.log( 'page =========>',page);
  // const scrollToBottom = () => {
  //   scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  // };

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
    dispatch(nextPageToAxios(roomId, page));
  };

  return (
    <ChatInfinityScroll
      callNext={callNext}
      isNext={isNext}
      // loading={is_loading}
      scrollTo={scrollRef}
      setPrevHeight={setPrevHeight}
      type='top'
    >
      <ChatMessageBox ref={scrollRef}>
        {messageList?.map((msg, i, arr) => {
          const isMe = msg.writer === userInfo;

          const isMargin =
            arr.length === 1 ||
            i === arr.length - 1 ||
            arr[i].writer === arr[i + 1].writer
              ? false
              : true;
          
          const orderCheck = () => {
            if (arr.length === 1) {
              if (isMe) {
                return 'meFirst';
              }
              return 'first';
            }
            if (arr[i].writer !== arr[i - 1]?.writer) {
              if (isMe) {
                return 'meFirst';
              }
              return 'first';
            }
            if (arr[i].writer !== arr[i + 1]?.writer) {
              if (isMe) {
                return 'meLast';
              }
              return 'last';
            }
            if (isMe) {
              return 'meMiddle';
            }
            return 'middle';
          };
          return (
            <SpeechBubble key={i} isMe={isMe} isMargin={isMargin} orderCheck={orderCheck()}>
              <Text regular16>{msg.message}</Text>
            </SpeechBubble>
          );
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
  max-height: 660px;
  padding-bottom: 16px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    margin-left: 30px;
    width: 5px;
    height: 8px;
  }
`;

const SpeechBubble = styled.div`
  background-color: ${({ isMe }) =>
  isMe ? '#723CD4' : ColorStyle.BackGround300};
  width: fit-content;
  max-width: 450px;
  word-break: break-all;
  margin: ${({ isMe }) =>
    isMe ? '0px 0px 0px auto' : '0px auto 0px 48px'};
  margin-bottom: ${({ isMargin }) => (isMargin ? '32px' : '8px')};
  padding:20px 28px;
  border-radius: ${({ orderCheck }) =>
    orderCheck === 'meFirst'
      ? '35px 25px 5px 35px'
      : orderCheck === 'meLast'
      ? '35px 5px 25px 35px'
      : orderCheck === 'first'
      ? '25px 35px 35px 5px'
      : orderCheck === 'last'
      ? '5px 35px 35px 25px'
      : orderCheck === 'middle'
      ? '5px 35px 35px 5px'
      : '35px 5px 5px 35px'};
`;
export default MessageBox;
