import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loadSendTapToAxios } from '../features/taps/actions';
import CardFront from './CardFront';

const SendTap = ({ id }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadSendTapToAxios({ snedTap: id }));
  }, []);

  return (
    <div>
      {id.map((idList) => {
        return <CardFront key={idList} id={idList} contap />;
      })}
    </div>
  );
};

SendTap.propTypes = {
  id: PropTypes.array.isRequired,
};

export default SendTap;
