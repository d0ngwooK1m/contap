/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadGrab,
  loadReceveTap,
  loadSendTapToAxios,
} from '../features/taps/actions';

const TapForm = ({ id }) => {
  const dispatch = useDispatch();
  const [messege, setMessege] = React.useState('');
  console.log(id);

  const handleChange = (e) => {
    setMessege(e.target.value);
  };

  const sendTap = () => {
    console.log({
      token: 'token',
      id,
      messege,
      state : 'ready'
    });
    dispatch(loadSendTapToAxios())
  };

  return (
    <div>
      <input type="text" value={messege} onChange={handleChange} />
      <button type="button" onClick={sendTap}>
        TAP
      </button>
      <button type="button">CLOSE</button>
    </div>
  );
};

TapForm.propTypes = {
  id: PropTypes.number,
};

TapForm.defaultProps = {
  id: 1,
};

export default TapForm;
