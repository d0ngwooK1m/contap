import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { ColorStyle } from '../utils/systemDesign';
import { loadTalkRoomListToAxios } from '../features/chat/actions';
import ChatRoom from './ChatRoom';

const ChatList = ({ closeList }) => {
  const dispatch = useDispatch();

  const allChatList = useSelector((state) => state.chat.allIds);
  console.log(allChatList);

  React.useEffect(() => {
    console.log('디스패치');
    dispatch(loadTalkRoomListToAxios());
  }, []);

  return (
    <div
      style={{ paddingRight: '24px', paddingTop: '8px', overflowY: 'scroll' }}
    >
      {allChatList?.map((id) => {
        return <ChatRoom key={id} userId={id} closeList={closeList} />;
      })}
    </div>
  );
};

ChatList.propTypes = {
  closeList: PropTypes.func.isRequired,
};

export default ChatList;
