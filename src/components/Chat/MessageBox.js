/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadMessages } from '../../features/chat/actions';

const MessageBox = () => {
  const dispatch = useDispatch()
  const messageList = useSelector((state) => state.chat.messages)
  console.log(messageList)
  return (
    <div>
      <div>채팅내용</div>
      {messageList?.map((msg, i) => {
        return <div key={i}>
          <p>{msg.writer} : {msg.message}</p>
        </div>
      })}
    </div>
  );
};

export default MessageBox;
