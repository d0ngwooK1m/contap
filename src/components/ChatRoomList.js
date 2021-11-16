import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { ColorStyle } from '../utils/systemDesign';
import {
  loadNoneTalkRoomListToAxios,
  loadTalkRoomListToAxios,
} from '../features/chat/actions';
import ChatRoom from './ChatRoom';

const ChatList = () => {
  const dispatch = useDispatch();

  const allChatList = useSelector((state) => state.chat.allIds);
  console.log(allChatList);

  React.useEffect(() => {
    console.log('디스패치');
    dispatch(loadTalkRoomListToAxios());
  }, []);

  const addChatRoom = () => {
    dispatch(loadNoneTalkRoomListToAxios());
  };

  return (
    <div>
      <div>채팅리스트</div>
      <button type="button" onClick={addChatRoom}>
        추가하기
      </button>
      {allChatList?.map((id) => {
        return <ChatRoom key={id} userId={id} />;
      })}
    </div>
  );
};

export default ChatList;
