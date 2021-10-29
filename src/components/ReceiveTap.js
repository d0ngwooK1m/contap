import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadReceiveTapToAxios } from '../features/taps/actions';
import CardFront from './CardFront';

const ReceiveTap = () => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);

  React.useEffect(() => {
    dispatch(loadReceiveTapToAxios());
  }, []);

  return (
    <div>
      {conTap.allIds.map((id) => {
        return <CardFront key={id} id={id} contap />;
      })}
    </div>
  );
};

export default ReceiveTap;
