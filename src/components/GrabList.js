/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import {
  loadGrabToAxios,
  nextPageToAxios,
  loading,
} from '../features/taps/actions';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';
import { setContapNoti, setTapAcceptNoti } from '../features/notice/actions';
import ChatInfinityScroll from './Chat/ChatInfinityScroll';
import { ReactComponent as ArrowTopLightSvg } from '../svgs/ArrowTopLight.svg';
import { ColorStyle, Opacity } from '../utils/systemDesign';
//import { ReactComponent as NoneReceiveTapSvg } from '../svgs/NoneReceiveTap.svg';
import NoneReceiveTapPng from '../assets/image/noneReceiveTap.png';
import { size } from '../utils/sizeCheck';

const GrabList = ({ select }) => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);
  const [page, setPage] = React.useState(1);
  const { isNext, isLoading } = conTap;
  const [prevHeight, setPrevHeight] = React.useState(null);
  const scrollRef = React.useRef();

  const scrollTop = () => {
    scrollRef.current.scrollTop = 0;
  };

  console.log(conTap);

  React.useEffect(() => {
    if (prevHeight) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevHeight;
      console.log(prevHeight, scrollRef.current.scrollHeight);
      return setPrevHeight(null);
    }
    dispatch(loading(true));
    dispatch(loadGrabToAxios());
    dispatch(setContapNoti(false));

    return () => {
      console.log('사라져야지');
      dispatch(setTapAcceptNoti(false));
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
      // loading={is_loading}
      scrollTo={scrollRef}
      setPrevHeight={setPrevHeight}
      type="bottom"
    >
      <Wrap ref={scrollRef} size={size}>
        {conTap.allIds.length === 0 ? (
          <>
            <Text color={ColorStyle.Gray500} bold32>
              아직 그랩이 없어요
            </Text>
            <CardBox>
              <div className="none">
                <NoneReceiveTapWrap>
                  <div className="svg">
                    <img src={NoneReceiveTapPng} width="150px" height="150px" />
                  </div>
                  <Text regular20 color={ColorStyle.Gray500}>
                    그랩이 되면 자유롭게 채팅으로 대화할 수 있어요
                  </Text>
                </NoneReceiveTapWrap>
              </div>
            </CardBox>
          </>
        ) : (
          <>
            <Text color="#FFF" bold32>
              기회를 잡아보세요
              <br />
              <span style={{ color: '#8C4DFF' }}>Grab</span> the opportunity!
            </Text>
            <CardBox>
              {conTap.allIds.map((grabUserId) => {
                return (
                  <MemoizedCardFront
                    key={grabUserId}
                    userId={grabUserId}
                    select={select}
                    contap
                    grab
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

GrabList.propTypes = {
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

const NoneReceiveTapWrap = styled.div`
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

export default GrabList;
