/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  loading,
  loadReceiveTapToAxios,
  nextPageToAxios,
} from '../features/taps/actions';
import { setContapNoti, setTapReceiveNoti } from '../features/notice/actions';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';
import ChatInfinityScroll from './Chat/ChatInfinityScroll';

const ReceiveTap = ({ select }) => {
  const dispatch = useDispatch();
  const scrollRef = React.useRef();
  const userName = useSelector((state) => state.user.userName);
  const conTap = useSelector((state) => state.taps);
  const [page, setPage] = React.useState(1);
  const { isNext, isLoading } = conTap;
  const [prevHeight, setPrevHeight] = React.useState(null);

  React.useEffect(async () => {
    if (prevHeight) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevHeight;
      console.log(prevHeight, scrollRef.current.scrollHeight);
      return setPrevHeight(null);
    }
    dispatch(loading(true))
    await dispatch(loadReceiveTapToAxios('0'));
    dispatch(setContapNoti(false));
    dispatch(setTapReceiveNoti(false));
    return null;
  }, []);

  const callNext = () => {
    if (conTap.allIds < 12 || isLoading) {
      return;
    }
    
    dispatch(loading(true))
    dispatch(nextPageToAxios(select, page));
    setPage(page + 1);
  };

  return (
    <ChatInfinityScroll
      callNext={callNext}
      isNext={isNext}
      loading={isLoading}
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
