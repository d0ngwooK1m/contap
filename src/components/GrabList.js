import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadGrabToAxios } from '../features/taps/actions';
import CardFront from './CardFront';

const GrabList = ({ select }) => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);
  console.log(select);

  React.useEffect(() => {
    dispatch(loadGrabToAxios());
  }, []);

  return (
    <div>
      {conTap.allIds.map((grabUserId) => {
        return <CardFront key={grabUserId} userId={grabUserId} contap />;
      })}
    </div>
  );
};

GrabList.propTypes = {
  select: PropTypes.string.isRequired,
};

export default GrabList;
