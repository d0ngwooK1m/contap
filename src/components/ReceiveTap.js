import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadReceiveTapToAxios } from '../features/taps/actions';
import CardFront from './CardFront';

const ReceiveTap = ({ select }) => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);

  console.log(select);
  React.useEffect(() => {
    dispatch(loadReceiveTapToAxios());
  }, []);

  return (
    <div>
      {conTap.allIds.map((ReceiveTapUserId) => {
        return (
          <CardFront key={ReceiveTapUserId} userId={ReceiveTapUserId} contap />
        );
      })}
    </div>
  );
};

ReceiveTap.propTypes = {
  select: PropTypes.string.isRequired,
};

export default ReceiveTap;
