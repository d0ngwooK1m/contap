import React from 'react';
import { Grid } from '../elements/index';
import TabMenu from '../components/TabMenu';
import SendTap from '../components/SendTap';
import ReceiveTap from '../components/ReceiveTap';
import GrabList from '../components/GrabList';

const Contap = () => {
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
    <Grid>
      <div>컨탭 페이지</div>
      <TabMenu content={content} />
    </Grid>
  );
};

export default Contap;
