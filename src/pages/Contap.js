/*eslint-disable*/
import React from 'react';
import styled from 'styled-components'
import PropTyps from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadGrabToAxios,
  loadSendTapToAxios,
  loadReceiveTapToAxios,
} from '../features/taps/actions';

import { Grid } from '../elements/index'
import TabMenu from '../components/TabMenu';
import SendTap from '../components/SendTap'
import ReceiveTap from '../components/ReceiveTap'
import GrabList from '../components/GrabList'

const Contap = () => {
  const dispatch = useDispatch();
  
  // React.useEffect(() => {
  //   dispatch(loadReceiveTapToAxios());
  // }, []);

  const content = [
    {
      id: 'ReceiveTap',
      tab: '받은 탭',
      content: <ReceiveTap select='ReceiveTap'/>,
    },
    {
      id: 'SendTap',
      tab: '보낸 탭',
      content: <SendTap select='SendTap'/>,
    },
    {
      id: 'GrabList',
      tab: '나의 그랩',
      content: <GrabList  select='GrabList'/>,
    },
  ];
  

 

  return (
    <Grid>
      <div>컨탭 페이지</div>
      <TabMenu content={content} />
    </Grid>
  );
};

// Contap.propTypes = {
//   sendTap: PropTyps.arrayOf,
//   reciveTap: PropTyps.arrayOf,
//   grabList: PropTyps.arrayOf,
// };

// Contap.defaultProps = {
//   sendTap: ['1', '2'],
//   reciveTap: ['3', '4'],
//   grabList: ['5'],
// };

export default Contap;
