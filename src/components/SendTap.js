import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadSendTapToAxios } from '../features/taps/actions';
import CardFront from './CardFront';

const SendTap = ({ select }) => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);
  console.log(select);

  React.useEffect(() => {
    dispatch(loadSendTapToAxios());
  }, []);

  return (
    <div>
      {conTap.allIds.map((sendTapUserId) => {
        return (
          <CardFront
            key={sendTapUserId}
            userId={sendTapUserId}
            select={select}
            contap
          />
        );
      })}
    </div>
  );
};

SendTap.propTypes = {
  select: PropTypes.string.isRequired,
};

export default SendTap;
