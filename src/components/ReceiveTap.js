/*eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadReceiveTapToAxios } from '../features/taps/actions';
// import CardFront from './CardFront';
import { MemoizedCardFront } from './CardFront';

const ReceiveTap = ({ select }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadReceiveTapToAxios());
    console.log('디스패치');
  }, []);
  console.log('랜더링 2번');

  console.log(select);

  const conTap = useSelector((state) => state.taps);

  return (
    <div>
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
    </div>
  );
};

ReceiveTap.propTypes = {
  select: PropTypes.string.isRequired,
};

export default ReceiveTap;
