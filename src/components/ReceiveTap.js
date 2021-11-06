import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadReceiveTapToAxios } from '../features/taps/actions';
import { MemoizedCardFront } from './CardFront';

const ReceiveTap = ({ select }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadReceiveTapToAxios());
  }, []);

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
