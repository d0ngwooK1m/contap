import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ColorStyle, Opacity } from '../../utils/systemDesign';
import { ReactComponent as SendHorSvg } from '../../svgs/SendHor.svg';
import { BLANCK_CHECK } from '../../utils/validation';

const MessageWrite = ({ sendMessage }) => {
  const [message, setMessage] = useState('');
  const isNull = message.length === 0;

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  // 공백 입력 방지

  const sendMsg = (msg) => {
    if (msg.replace(BLANCK_CHECK, '') === '') {
      return;
    }
    sendMessage(msg);
  };

  // 오토 포커스 대상
  const autoFocus = useRef(null);
  React.useEffect(() => {
    autoFocus.current?.focus();
  }, []);

  return (
    <InputField>
      <input
        type="text"
        value={message}
        ref={autoFocus}
        maxLength="1000"
        placeholder="  여기에 입력해 주세요"
        onChange={handleMessage}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMsg(message);
            setMessage('');
          }
        }}
      />
      <SendButton
        type="button"
        onClick={() => {
          sendMsg(message);
          setMessage('');
        }}
        isNull={isNull}
      >
        <div className="svg">
          <SendHorSvg />
        </div>
      </SendButton>
    </InputField>
  );
};

MessageWrite.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default MessageWrite;

const InputField = styled.div`
  position: absolute;
  bottom: -73px;
  max-width: 665px;
  width: 665px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${ColorStyle.Gray300 + Opacity[30]};
  background-color: ${ColorStyle.BackGround};
  align-items: center;
  input {
    margin-left: 50px;
    width: 510px;
    bottom: 0px;
    background-color: ${ColorStyle.BackGround};
    height: 95%;
    border: 0px;
    color: ${ColorStyle.Gray500};
    caret-color: ${ColorStyle.Gray500};

    font-family: 'Pretendard';
    font-style: normal;
    font-size: 20px;
    font-weight: 700;
    ::placeholder {
      font-family: 'Pretendard';
      font-style: normal;
      font-size: 20px;
      font-weight: 700;
      color: ${ColorStyle.Gray100};
    }
    :focus {
      outline: none;
    }
  }
`;

const SendButton = styled.button`
  position: relative;
  margin-top: 8px;
  width: 50px;
  height: 50px;
  border-radius: 40px;
  background-color: ${({ isNull }) =>
    isNull ? ColorStyle.Gray300 : ColorStyle.PrimaryPurple};
  border: 0px;
  cursor: pointer;
  .svg {
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;
