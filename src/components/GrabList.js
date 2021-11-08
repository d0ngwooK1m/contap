import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadGrabToAxios } from '../features/taps/actions';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';

const GrabList = ({ select }) => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);
  console.log(conTap);

  React.useEffect(() => {
    console.log('디스패치');
    dispatch(loadGrabToAxios());
  }, []);

  return (
    <Wrap>
      <Text color="#FFF" bold32>
        <span style={{ color: '#8C4DFF' }}>Grab</span> the opportunity!
        <br />
        기회를 잡아보세요
      </Text>
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
    </Wrap>
  );
};

GrabList.propTypes = {
  select: PropTypes.string.isRequired,
};

const Wrap = styled.div`
  position: relative;
  top: 75px;
  left: 125px;
  width: 100%;
`;

export default GrabList;
