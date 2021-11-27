import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../elements';
import { ColorStyle } from '../utils/systemDesign';

const Timer = ({ mm, ss, reset }) => {
  const [minutes, setMinutes] = React.useState(parseInt(mm, 10));
  const [seconds, setSeconds] = React.useState(parseInt(ss, 10));

  React.useEffect(() => {
    setMinutes(parseInt(3, 10));
    setSeconds(parseInt(0, 10));
  }, [reset]);

  React.useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds, 10) > 0) {
        setSeconds(parseInt(seconds, 10) - 1);
      }
      if (parseInt(seconds, 10) === 0) {
        if (parseInt(minutes, 10) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes, 10) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <div>
      <Text color={ColorStyle.Gray500} regular20>
        {minutes}분&nbsp;{seconds < 10 ? `0${seconds}` : seconds}초
      </Text>
    </div>
  );
};

Timer.propTypes = {
  mm: PropTypes.number,
  ss: PropTypes.number,
  reset: PropTypes.bool,
};

Timer.defaultProps = {
  mm: 3,
  ss: 0,
  reset: false,
};

export default Timer;
