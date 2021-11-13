import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadReceiveTapToAxios } from '../features/taps/actions';
import { setContapNoti, setTapReceiveNoti } from '../features/notice/actions';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';

const ReceiveTap = ({ select }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log('1번 디패');
    dispatch(loadReceiveTapToAxios());
    console.log('2번 디패');
    dispatch(setContapNoti(false));
    console.log('3번 디패');
    dispatch(setTapReceiveNoti(false));
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
  );
};

ReceiveTap.propTypes = {
  select: PropTypes.string.isRequired,
};

const Wrap = styled.div`
  position: relative;
  top: 75px;
  max-height: 780px;
  left: 100px;
  width: 100%;
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

export default ReceiveTap;
