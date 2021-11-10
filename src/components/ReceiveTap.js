import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadReceiveTapToAxios } from '../features/taps/actions';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';

const ReceiveTap = ({ select }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadReceiveTapToAxios());
  }, []);

  const userName = useSelector((state) => state.user.userName);
  const conTap = useSelector((state) => state.taps);
  return (
    <Wrap>
      <Text color="#FFF" bold32>
        똑똑,
        <br />
        누군가 {userName}님을 탭!했어요
      </Text>

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
    </Wrap>
  );
};

ReceiveTap.propTypes = {
  select: PropTypes.string.isRequired,
};

const Wrap = styled.div`
  position: relative;
  top: 75px;
  left: 125px;
  width: 100%;
`;

export default ReceiveTap;
