import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSendTapToAxios } from '../features/taps/actions';
import CardFront from './CardFront';

const SendTap = () => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);

  React.useEffect(() => {
    dispatch(loadSendTapToAxios());
  }, []);

  return (
    <div>
      {conTap.allIds.map((id) => {
        return <CardFront key={id} id={id} contap />;
      })}
    </div>
  );
};

export default SendTap;
