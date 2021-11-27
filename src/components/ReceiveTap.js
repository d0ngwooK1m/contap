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
import { ReactComponent as ArrowTopLightSvg } from '../svgs/ArrowTopLight.svg';
//import { ReactComponent as NoneReceiveTapSvg } from '../svgs/NoneReceiveTap.svg';
import NoneReceiveTapPng from '../assets/image/noneReceiveTap.png';
import { IconButton } from '@mui/material';
import { ColorStyle, FontFamily, Opacity } from '../utils/systemDesign';
import { size } from '../utils/sizeCheck';

const ReceiveTap = ({ select }) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const conTap = useSelector((state) => state.taps);
  const [page, setPage] = React.useState(1);
  const { isNext, isLoading } = conTap;
  const [prevHeight, setPrevHeight] = React.useState(null);

  const scrollRef = React.useRef();
  const scrollTop = () => {
    scrollRef.current.scrollTop = 0;
  };

  React.useEffect(() => {
    if (prevHeight) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevHeight;
      console.log(prevHeight, scrollRef.current.scrollHeight);
      return setPrevHeight(null);
    }
    dispatch(loading(true));
    dispatch(loadReceiveTapToAxios('0'));
    dispatch(setContapNoti(false));
    return () => {
      dispatch(setTapReceiveNoti(false));
    };
  }, []);

  const callNext = () => {
    if (conTap.allIds < 12 || isLoading) {
      return;
    }

    dispatch(loading(true));
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
      <Wrap ref={scrollRef} size={size}>
        {conTap.allIds.length === 0 ? (
          <>
            <Text color={ColorStyle.Gray500} bold32>
              아직 받은 Tap이 없어요
            </Text>
            <CardBox>
              <div className="none">
                <NoneReceiveTap>
                  <div className="svg">
                    <img src={NoneReceiveTapPng} width="150px" height="150px" />
                  </div>
                  <Text regular20 color={ColorStyle.Gray500}>
                    다른 사람이 Tap! 할 수 있게 카드로 나를 표현 해주세요!
                  </Text>
                </NoneReceiveTap>
              </div>
            </CardBox>
          </>
        ) : (
          <>
            <Text color={ColorStyle.Gray500} bold32>
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
          </>
        )}

        {/* <IconButton className="floatingBtn" onClick={scrollTop}>
          <ArrowTopLightSvg />
        </IconButton> */}
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
  min-height: 70vh;
  max-height: ${({ size }) => (size === '616' ? '71vh' : '85vh')};
  ${({ size }) => size === '616' && 'padding-bottom: 31px;'}
  box-sizing: border-box;
  left: 125px;
  width: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;

  .floatingBtn {
    width: 64px;
    height: 64px;
    background-color: ${ColorStyle.Gray100 + Opacity[25]};
    position: fixed;
    bottom: 20px;
    right: 20px;
    &:hover {
      background-color: ${ColorStyle.Gray500 + Opacity[25]};
    }
  }
`;

const CardBox = styled.div`
  width: 100%;
  display: flex;
  width: 730px;
  flex-wrap: wrap;
  padding-top: 64px;
  justify-content: space-between;
  align-content: flex-start;
  margin: auto;

  .none {
    padding-top: 16px;
  }
`;

const NoneReceiveTap = styled.div`
  word-break: break-all;
  text-align: center;
  border-radius: 16px;
  height: 342px;
  margin: 0px;
  padding: 64px;
  width: 730px;
  background-color: ${ColorStyle.BackGround100 + Opacity[70]};
  box-sizing: border-box;
  .svg {
    margin-bottom: 36px;
  }
`;

export default ReceiveTap;
