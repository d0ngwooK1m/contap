/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import {
  loadSendTapToAxios,
  nextPageToAxios,
  loading,
} from '../features/taps/actions';
// import CardFront from './CardFront';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';
import ChatInfinityScroll from './Chat/ChatInfinityScroll';
import { ReactComponent as ArrowTopLightSvg } from '../svgs/ArrowTopLight.svg';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import { ReactComponent as NoneReceiveTapSvg } from '../svgs/NoneReceiveTap.svg';

const SendTap = ({ select }) => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);
  const [page, setPage] = React.useState(1);
  const { isNext, isLoading } = conTap;
  const [prevHeight, setPrevHeight] = React.useState(null);
  const scrollRef = React.useRef();

  const scrollTop = () => {
    scrollRef.current.scrollTop = 0;
  };

  console.log('여기 샌드 탭', isNext);
  console.log('여기 샌드 탭', select);
  React.useEffect(() => {
    if (prevHeight) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevHeight;
      console.log(prevHeight, scrollRef.current.scrollHeight);
      return setPrevHeight(null);
    }
    console.log('로딩 시작');
    dispatch(loading(true));
    dispatch(loadSendTapToAxios());
    return null;
  }, []);

  const callNext = () => {
    if (conTap.allIds < 12 || isLoading) {
      return;
    }
    dispatch(loading(true));
    dispatch(nextPageToAxios(select, page));
    setPage(page + 1);
  };
  console.log(select);

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
        {conTap.allIds.length === 0 ? (
          <>
            <Text color={ColorStyle.Gray500} bold32>
              아직 보낸 Tap이 없어요
            </Text>
            <CardBox>
              <div className="none">
                <NoneReceiveTap>
                  <div className="svg">
                    <NoneReceiveTapSvg />
                  </div>
                  <Text regular20 color={ColorStyle.Gray500}>
                    Tap! 해서 함께 성장해 보세요
                  </Text>
                </NoneReceiveTap>
              </div>
            </CardBox>
          </>
        ) : (
          <>
            <Text color="#FFF" bold32>
              두근두근
              <br />
              누군가에게 보낸 Tap!
            </Text>
            <CardBox>
              {conTap.allIds.map((sendTapUserId) => {
                return (
                  <MemoizedCardFront
                    key={sendTapUserId}
                    userId={sendTapUserId}
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

SendTap.propTypes = {
  select: PropTypes.string.isRequired,
};

const Wrap = styled.div`
  position: relative;
  top: 0px;
  padding-top: 72px;
  min-height: 70vh;
  max-height: 77vh;
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

export default SendTap;
