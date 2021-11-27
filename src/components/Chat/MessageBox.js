/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ColorStyle } from '../../utils/systemDesign';
import { Text } from '../../elements';
import ChatInfinityScroll from './ChatInfinityScroll';
import { nextPageToAxios, loading } from '../../features/chat/actions';
import { size } from '../../utils/sizeCheck';

const MessageBox = ({ roomId }) => {
  const dispatch = useDispatch();
  const { messages, isNext, isLoading } = useSelector((state) => state.chat);
  const userInfo = useSelector((state) => state.user.email);
  const scrollRef = React.useRef();
  const page = messages.length !== 0 ? messages[0].id : null;
  // const isNext = messages[0]?.isNext===false ? false : true

  const [prevHeight, setPrevHeight] = React.useState(null);

  console.log('리스트 =========>', messages);
  console.log('page =========>', page);
  // const scrollToBottom = () => {
  //   scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  // };
  const is730px = !!window.matchMedia('(max-height: 730px)').matches;
  const is616px = !!window.matchMedia('(max-height: 616px)').matches;
  console.log(is730px);
  console.log(is616px);

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
  }, [messages]);

  const callNext = () => {
    if (!page) {
      return;
    }
    dispatch(loading(true));
    dispatch(nextPageToAxios(roomId, page));
  };

  return (
    <ChatInfinityScroll
      callNext={callNext}
      isNext={isNext}
      loading={isLoading}
      scrollTo={scrollRef}
      setPrevHeight={setPrevHeight}
      type="top"
    >
      <ChatMessageBox ref={scrollRef} size={size }>
        {messages?.map((msg, i, arr) => {
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
            <SpeechBubble
              key={i}
              isMe={isMe}
              isMargin={isMargin}
              orderCheck={orderCheck()}
            >
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
  bottom: 0px;
  width: 665px;
  max-height: 82%;
  /* padding-bottom: 31px; */
  /* 616일때 */
  padding-bottom: ${({ size }) => (size === '616' ? '60px' : '31px')};
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
  margin: ${({ isMe }) => (isMe ? '0px 0px 0px auto' : '0px auto 0px 48px')};
  margin-bottom: ${({ isMargin }) => (isMargin ? '32px' : '8px')};
  padding: 20px 28px;
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
