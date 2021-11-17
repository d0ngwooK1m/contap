import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import T from '../api/tokenInstance';
import { ColorStyle, Opacity } from '../utils/systemDesign';
import { Text } from '../elements';
// import { ColorStyle } from '../utils/systemDesign';

const TapForm = ({ userId, category }) => {
  const [message, setMessage] = React.useState('');
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendTap = async () => {
    await T.POST('/main/posttap', { userId, msg: message });
    window.alert('Tap을 보냈어요!');
  };

  console.log(userId);

  return (
    <Wrap category={category}>
      <TextAreaWrap category={category}>
        <MessageTextarea
          type="text"
          id="textbox"
          value={message}
          maxLength="200"
          onChange={handleChange}
        />
        <div className="checkWords">
          <Text regular20>{message.length} / 200</Text>
        </div>
      </TextAreaWrap>
      <TapButton category={category}>
        <button type="button" onClick={sendTap}>
          <Text
            bold20
            color={category ? ColorStyle.Gray500 : ColorStyle.BackGround300}
          >
            Tap!
          </Text>
        </button>
      </TapButton>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  top: -80px;
  left: -2px;
  background-color: ${ColorStyle.BackGround300};
  box-sizing: border-box;
  border: 1px solid ${ColorStyle.Gray100};
  width: 755px;
  height: 250px;
  margin: auto;
  z-index: 0;
  border-radius: 0px 0px 16px 16px;
  display: flex;
  flex-direction: column;
`;

const TextAreaWrap = styled.div`
  position: relative;
  top: 15px;
  margin: auto 48px;
  height: 120px;
  background-color: red;
  border-radius: 10px;
  background-color: ${ColorStyle.Gray100 + Opacity[15]};

  .checkWords {
    position: relative;
    right: 15px;
    float: right;
  }
`;

const MessageTextarea = styled.textarea`
  overflow: hidden;
  background-color: #ffffff00;
  resize: none;
  padding: 10px;
  min-width: 637px;
  border-radius: 10px;
  min-height: 70px;
  border: 0px;
  :focus {
    outline: none;
  }

  color: ${ColorStyle.Gray500};
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 20px;
  font-weight: 400;
`;
const TapButton = styled.div`
  margin-right: 48px;
  button {
    position: relative;
    width: 130px;
    height: 44px;
    float: right;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    bottom: 10px;
    background-color: ${({ category }) =>
      category ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint};
    border: 2px solid
      ${({ category }) =>
        category ? ColorStyle.PrimaryPurple : ColorStyle.PrimaryMint};
    box-sizing: border-box;
    border-radius: 40px;

    &:hover {
      background-color: ${({ category }) => (category ? '#6235B5' : '#33C68A')};
      border: 2px solid ${({ category }) => (category ? '#6235B5' : '#33C68A')};
    }
  }
`;

TapForm.propTypes = {
  userId: PropTypes.number.isRequired,
  category: PropTypes.bool.isRequired,
};

export default TapForm;
