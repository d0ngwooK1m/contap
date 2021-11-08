import React from 'react';
import useSocketNotiRoom from '../hooks/useSocketNotiRoom';

const WsNotiRoom = ({ children }) => {
  const [wsConnectSubscribe, token] = useSocketNotiRoom();

  React.useEffect(() => {
    if (!token) {
      return null;
    }
    wsConnectSubscribe();
    return null;
  }, []);
  return children;
};

export default WsNotiRoom;
