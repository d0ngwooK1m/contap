/* eslint-disable */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorStyle } from '../../utils/systemDesign';
import { ReactComponent as SendHorSvg } from '../../svgs/SendHor.svg'

const MessageWrite = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMsg = (message) => {
    sendMessage(message);
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
      ><SendHorSvg/></SendButton>
    </InputField>
  );
};

export default MessageWrite;

const InputField = styled.div`
  position: absolute;
  bottom: 0px;
  width: 665px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid aliceblue;
  background-color: ${ColorStyle.BackGround};
  align-items: center;
  input {
    bottom: 0px;
    width: 80%;
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
  width: 56px;
  height: 56px;
  border-radius: 40px;
  background-color: ${ColorStyle.PrimaryPurple};
  border : 0px;
`;
