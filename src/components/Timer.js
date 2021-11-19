import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../elements';
import { ColorStyle } from '../utils/systemDesign';

const Timer = ({ mm, ss }) => {
  const [minutes, setMinutes] = React.useState(parseInt(mm, 10));
  const [seconds, setSeconds] = React.useState(parseInt(ss, 10));

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
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </div>
  );
};

Timer.propTypes = {
  mm: PropTypes.number,
  ss: PropTypes.number,
};

Timer.defaultProps = {
  mm: 3,
  ss: 0,
};

export default Timer;
