import React from 'react';
import useSocketNotiRoom from '../hooks/useSocketNotiRoom';

const WsNotiRoom = ({ children }) => {
  const [wsConnectSubscribe, wsDisConnectUnsubscribe, token] =
    useSocketNotiRoom();

  React.useEffect(() => {
    if (!token) {
      return null;
    }
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, []);
  return children;
};

export default WsNotiRoom;
