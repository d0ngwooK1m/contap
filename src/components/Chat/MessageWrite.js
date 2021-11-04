/* eslint-disable */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

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
        placeholder="메세지를 입력해주세요."
        onChange={handleMessage}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMsg(message);
            setMessage('');
          }
        }}
      />
    </InputField>
  );
};

export default MessageWrite;

const InputField = styled.div`
  width: 100%;
  height: 5.93vh;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid aliceblue;
  background-color: white;
  position: absolute;
  bottom: 0;
  input {
    width: 90%;
    height: 100%;
    ::placeholder {
      font-size: 12px;
      color: aliceblue;
    }
  }
 
`;
