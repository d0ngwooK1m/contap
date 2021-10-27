import React from 'react';
import { useDispatch } from 'react-redux';
import { loadSendTapToAxios } from '../features/taps/actions';

const SendTap = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadSendTapToAxios());
  }, []);

  return (
    <div>
      <div>zz</div>
    </div>
  );
};

export default SendTap;
