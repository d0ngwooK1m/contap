/* eslint-disable */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorStyle } from '../../utils/systemDesign';

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
        placeholder="여기에 입력해 주세요"
        onChange={handleMessage}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMsg(message);
            setMessage('');
          }
        }}
      />
      <SendButton type='button' onClick={() => {
        sendMsg(message);
        setMessage('');
      }} />
    </InputField>
  );
};

export default MessageWrite;

const InputField = styled.div`
  width: 600px;
  height: 5.93vh;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid aliceblue;
  background-color: ${ColorStyle.BackGround};
  position: absolute;
  bottom: 0px;
  input {
    width: 90%;
    background-color: ${ColorStyle.BackGround};
    height: 100%;
    color: ${ColorStyle.Gray100};
    ::placeholder {
      font-size: 12px;
      color: aliceblue;
    }
  }
`;

const SendButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 40px;
  position: relative;
  left: 20px;
  background-color: ${ColorStyle.PrimaryPurple};
`;
