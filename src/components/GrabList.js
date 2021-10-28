import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loadGrabToAxios } from '../features/taps/actions';
import CardFront from './CardFront';

const GrabList = ({ id }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadGrabToAxios());
  }, []);

  return (
    <div>
      {id.map((idList) => {
        return <CardFront key={idList} id={idList} contap />;
      })}
    </div>
  );
};

GrabList.propTypes = {
  id: PropTypes.array.isRequired,
};

export default GrabList;
