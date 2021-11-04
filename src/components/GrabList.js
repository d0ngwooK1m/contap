import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadGrabToAxios } from '../features/taps/actions';
import { MemoizedCardFront } from './CardFront';

const GrabList = ({ select }) => {
  const dispatch = useDispatch();
  const conTap = useSelector((state) => state.taps);
  console.log(conTap);

  React.useEffect(() => {
    console.log('디스패치');
    dispatch(loadGrabToAxios());
  }, []);

  return (
    <div>
      {conTap.allIds.map((grabUserId) => {
        return (
          <div key={grabUserId}>
            <MemoizedCardFront
              userId={grabUserId}
              select={select}
              contap
              grab
            />
          </div>
        );
      })}
    </div>
  );
};

GrabList.propTypes = {
  select: PropTypes.string.isRequired,
};

export default GrabList;
