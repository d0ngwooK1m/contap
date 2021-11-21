import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadSendTapToAxios } from '../features/taps/actions';
// import CardFront from './CardFront';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';

const SendTap = ({ select }) => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);
  console.log(select);

  React.useEffect(() => {
    dispatch(loadSendTapToAxios());
  }, []);

  return (
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
  );
};

SendTap.propTypes = {
  select: PropTypes.string.isRequired,
};

const Wrap = styled.div`
  position: relative;
  top: 75px;
  max-height: 780px;
  left: 100px;
`;

const CardBox = styled.div`
  width: 100%;
  display: flex;
  width: 780px;
  height: 600px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
  overflow-y: scroll;
`;

export default SendTap;
