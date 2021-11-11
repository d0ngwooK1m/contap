import React from 'react';
import PropTypes from 'prop-types';
import T from '../api/tokenInstance';

const TapForm = ({ userId }) => {
  const [messege, setMessege] = React.useState('');
  const handleChange = (e) => {
    setMessege(e.target.value);
  };
  console.log(messege);
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
    </div>
  );
};

TapForm.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default TapForm;
