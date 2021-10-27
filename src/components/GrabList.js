import React from 'react';
import { useDispatch } from 'react-redux';
import { loadGrabToAxios } from '../features/taps/actions';

const GrabList = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadGrabToAxios());
  }, []);

  return (
    <div>
      <div>zz</div>
    </div>
  );
};

export default GrabList;
