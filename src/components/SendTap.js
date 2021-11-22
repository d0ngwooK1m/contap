import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadSendTapToAxios, nextPageToAxios } from '../features/taps/actions';
// import CardFront from './CardFront';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';
import ChatInfinityScroll from './Chat/ChatInfinityScroll';

const SendTap = ({ select }) => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);
  const [page, setPage] = React.useState(1);
  const { isNext } = conTap;
  const [prevHeight, setPrevHeight] = React.useState(null);
  const scrollRef = React.useRef();

  React.useEffect(() => {
    if (prevHeight) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevHeight;
      console.log(prevHeight, scrollRef.current.scrollHeight);
      return setPrevHeight(null);
    }
    return null;
  }, []);

  const callNext = () => {
    if (conTap.allIds < 12) {
      return;
    }
    dispatch(nextPageToAxios(select, page));
    setPage(page + 1);
  };
  console.log(select);

  React.useEffect(() => {
    dispatch(loadSendTapToAxios());
  }, []);

  return (
    <ChatInfinityScroll
      callNext={callNext}
      isNext={isNext}
      // loading={is_loading}
      scrollTo={scrollRef}
      setPrevHeight={setPrevHeight}
      type="bottom"
    >
      <Wrap>
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
  max-height: 688px;
  left: 100px;
  width: 100%;
  overflow-y: scroll;
`;

const CardBox = styled.div`
  width: 100%;
  display: flex;
  width: 780px;
  height: 688px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  margin: auto;
`;

export default SendTap;
