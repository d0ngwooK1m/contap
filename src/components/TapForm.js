import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import T from '../api/tokenInstance';
import { ColorStyle } from '../utils/systemDesign';
// import { ColorStyle } from '../utils/systemDesign';

const TapForm = ({ userId, categoryColor }) => {
  const [message, setMessage] = React.useState('');
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  console.log(categoryColor);
  const sendTap = async () => {
    await T.POST('/main/posttap', { userId });
    window.alert('Tap을 보냈어요!');
  };

  return (
    <Wrap categoryColor={categoryColor}>
      <MessageInput
        type="text"
        categoryColor={categoryColor}
        value={message}
        onChange={handleChange}
      />
      <button type="button" onClick={sendTap}>
        TAP
      </button>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  top: -80px;
  left: -2px;
  background-color: ${({ categoryColor }) =>
    categoryColor ? '#723CD4' : '#68DAAF'};
  border: 1px solid;
  width: 755px;
  height: 250px;
  margin: auto;
  z-index: 0;
  border-radius: 0px 0px 16px 16px;
`;

const MessageInput = styled.textarea`
  position: relative;
  top: 60px;
  display: block;
  width: 677px;
  height: 100px;
  border: 1px solid ${ColorStyle.Gray500};
  background-color: ${({ categoryColor }) =>
    categoryColor ? '#723CD4' : '#68DAAF'};
  margin: auto;
  text-align: start;
  color: aliceblue;
`;

TapForm.propTypes = {
  userId: PropTypes.number.isRequired,
  categoryColor: PropTypes.bool.isRequired,
};

export default TapForm;
