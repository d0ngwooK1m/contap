/*eslint-disable*/
import React from 'react';
import styled from 'styled-components'
import PropTyps from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  loadGrabToAxios,
  loadSendTapToAxios,
  loadReceiveTapToAxios,
} from '../features/taps/actions';

import { Grid } from '../elements/index'

const Contap = ({ sendTap, reciveTap, grabList }) => {
  const dispatch = useDispatch();
  console.log(sendTap, reciveTap, grabList);

  React.useEffect(() => {

  }, []);

  return (
    <Grid>
      <div>컨탭 페이지</div>
    </Grid>
  );
};

// Contap.propTypes = {
//   sendTap: PropTyps.arrayOf,
//   reciveTap: PropTyps.arrayOf,
//   grabList: PropTyps.arrayOf,
// };

Contap.defaultProps = {
  sendTap: ['1', '2'],
  reciveTap: ['3', '4'],
  grabList: ['5'],
};

export default Contap;
