import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loadReceiveTapToAxios } from '../features/taps/actions';
import CardFront from './CardFront';

const ReceiveTap = ({ id }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadReceiveTapToAxios());
  }, []);

  return (
    <div>
      {id.map((idList) => {
        return <CardFront key={idList} id={idList} contap />;
      })}
    </div>
  );
};

ReceiveTap.propTypes = {
  id: PropTypes.array.isRequired,
};

export default ReceiveTap;
