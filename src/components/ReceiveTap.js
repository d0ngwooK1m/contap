import React from 'react';
import { useDispatch } from 'react-redux';
import { loadReceiveTapToAxios } from '../features/taps/actions';

const ReceiveTap = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadReceiveTapToAxios());
  }, []);

  return (
    <div>
      <div>zz</div>
    </div>
  );
};

export default ReceiveTap;
