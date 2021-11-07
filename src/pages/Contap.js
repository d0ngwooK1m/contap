import React from 'react';
import styled from 'styled-components';
import TabMenu from '../components/TabMenu';
import SendTap from '../components/SendTap';
import ReceiveTap from '../components/ReceiveTap';
import GrabList from '../components/GrabList';
import useSocketNotiRoom from '../hooks/useSocketNotiRoom';

const Contap = () => {
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

  const content = [
    {
      id: 'ReceiveTap',
      tab: '받은 탭',
      content: <ReceiveTap select="ReceiveTap" />,
    },
    {
      id: 'SendTap',
      tab: '보낸 탭',
      content: <SendTap select="SendTap" />,
    },
    {
      id: 'GrabList',
      tab: '나의 그랩',
      content: <GrabList select="GrabList" />,
    },
  ];

  return (
    <Wrap>
      <TabMenu content={content} />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0f0a1a;
`;

export default Contap;
