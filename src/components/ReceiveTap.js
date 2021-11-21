/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadReceiveTapToAxios } from '../features/taps/actions';
import { setContapNoti, setTapReceiveNoti } from '../features/notice/actions';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';
import ChatInfinityScroll from './Chat/ChatInfinityScroll';

const ReceiveTap = ({ select }) => {
  const dispatch = useDispatch();
  const scrollRef = React.useRef();

  React.useEffect(async () => {
    console.log('1번 디패');
    await dispatch(loadReceiveTapToAxios('0'));
    console.log('2번 디패');
    dispatch(setContapNoti(false));
    console.log('3번 디패');
    dispatch(setTapReceiveNoti(false));
  }, []);

  const userName = useSelector((state) => state.user.userName);
  const conTap = useSelector((state) => state.taps);
  const page = 2;
  const isNext = true;
  const [prevHeight, setPrevHeight] = React.useState(null);

  React.useEffect(() => {
    if (prevHeight) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevHeight;
      console.log(prevHeight, scrollRef.current.scrollHeight);
      return setPrevHeight(null);
    }
    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

    // scrollToBottom();
  }, []);

  const callNext = () => {
    console.log('한무 스크롤 가능!')
    dispatch(loadReceiveTapToAxios(page));
  };
  return (
    <ChatInfinityScroll
      callNext={callNext}
      isNext={isNext}
      // loading={is_loading}
      scrollTo={scrollRef}
      setPrevHeight={setPrevHeight}
      type="bottom"
    >
      <Wrap ref={scrollRef}>
        <Text color="#FFF" bold32>
          똑똑,
          <br />
          누군가 {userName}님을 Tap!
        </Text>
        <CardBox>
          {conTap.allIds.map((ReceiveTapUserId) => {
            return (
              <MemoizedCardFront
                key={ReceiveTapUserId}
                userId={ReceiveTapUserId}
                select={select}
                contap
              />
            );
          })}
        </CardBox>
      </Wrap>
    </ChatInfinityScroll>
  );
};

ReceiveTap.propTypes = {
  select: PropTypes.string.isRequired,
};

const Wrap = styled.div`
  position: relative;
  top: 0px;
  padding-top: 72px;
  max-height: 688px;
  left: 100px;
  width: 100%;
  overflow-y: scroll;
`;

const CardBox = styled.div`
  width: 100%;
  display: flex;
  width: 780px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  margin: auto;
`;

export default ReceiveTap;
