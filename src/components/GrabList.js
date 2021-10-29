import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadGrabToAxios } from '../features/taps/actions';
import CardFront from './CardFront';

const GrabList = () => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);

  React.useEffect(() => {
    dispatch(loadGrabToAxios());
  }, []);

  return (
    <div>
      {conTap.allIds.map((id) => {
        return <CardFront key={id} id={id} contap />;
      })}
    </div>
  );
};

export default GrabList;
