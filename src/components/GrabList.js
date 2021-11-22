import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadGrabToAxios } from '../features/taps/actions';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';
import { setContapNoti, setTapAcceptNoti } from '../features/notice/actions';

const GrabList = ({ select }) => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);
  console.log(conTap);

  React.useEffect(() => {
    console.log('디스패치');
    dispatch(loadGrabToAxios());
    dispatch(setContapNoti(false));
    dispatch(setTapAcceptNoti(false));
  }, []);

  return (
    <Wrap>
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
    </Wrap>
  );
};

GrabList.propTypes = {
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

export default GrabList;
