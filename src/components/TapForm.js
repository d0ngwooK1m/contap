import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import T from '../api/tokenInstance';

const TapForm = ({ userId }) => {
  const history = useHistory();
  const [messege, setMessege] = React.useState('');

  const handleChange = (e) => {
    setMessege(e.target.value);
  };

  const sendTap = async () => {
    await T.POST('/main/posttap', { userId });
    window.alert('Tap을 보냈어요!');
  };

  return (
    <div>
      <input type="text" value={messege} onChange={handleChange} />
      <button type="button" onClick={sendTap}>
        TAP
      </button>
      <button type="button">CLOSE</button>
      <button
        type="button"
        onClick={() => {
          history.push('/contap');
        }}
      >
        컨탭페이지 이동
      </button>
    </div>
  );
};

TapForm.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default TapForm;
