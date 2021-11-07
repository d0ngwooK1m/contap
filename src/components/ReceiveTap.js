import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loadReceiveTapToAxios } from '../features/taps/actions';
import { MemoizedCardFront } from './CardFront';
import Text from '../elements/Text';

const ReceiveTap = ({ select }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadReceiveTapToAxios());
  }, []);

  const conTap = useSelector((state) => state.taps);

  return (
    <div>
      <p style={{ color: 'white' }}>zzz</p>
      <Text color="red" regular14>
        zzz
      </Text>
      <Text color="blue" regular16>
        zzz
      </Text>
      <Text color="white" regular20>
        zzz
      </Text>
      <Text color="white" bold20>
        zzz
      </Text>
      <Text color="white" bold24>
        zzz
      </Text>
      <Text color="white" bold32>
        zzz
      </Text>

      <p />
      {conTap.allIds.map((ReceiveTapUserId) => {
        return (
          <MemoizedCardFront
            key={ReceiveTapUserId}
            userId={ReceiveTapUserId}
            select={select}
            contap
          />
        );
      })}
    </div>
  );
};

ReceiveTap.propTypes = {
  select: PropTypes.string.isRequired,
};

export default ReceiveTap;
