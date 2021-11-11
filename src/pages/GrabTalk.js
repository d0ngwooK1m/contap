/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
// import { ColorStyle } from '../utils/systemDesign';

import ChatList from '../components/ChatRoomList'
const Grabtalk = () => {

  return (
    <Wrapper>
      <Menu>
        <ChatList/>
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100vh;
  margin: 0px 0px 0px 165px;
  border-right: solid 1px #a09bac4d;
`;

export default Grabtalk;
