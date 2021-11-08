import React from 'react';
import { Reset } from 'styled-reset';
import styled from 'styled-components';
import PrivatecRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CardList from '../pages/CardList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Settings from '../pages/Settings';
import Contap from '../pages/Contap';
import Header from './Header';
import Mypage from '../pages/Mypage';
import CardEdit from '../pages/CardEdit';
import Permit from './Permit';
import WsNotiRoom from './WsNotiRoom';

function App() {
  return (
    <FullWrap>
      <Wrap>
        <Reset />
        <PublicRoute restricted path="/login" component={Login} exact />
        <PublicRoute restricted path="/signup" component={Signup} exact />
        <>
          <WsNotiRoom>
            <Header />
            <Permit>
              <PublicRoute path="/" component={CardList} exact />
              <PrivatecRoute path="/settings" component={Settings} exact />
              <PrivatecRoute path="/contap" component={Contap} exact />
              <PrivatecRoute path="/mypage" component={Mypage} exact />
              <PrivatecRoute path="/edit" component={CardEdit} exact />
            </Permit>
          </WsNotiRoom>
        </>
      </Wrap>
    </FullWrap>
  );
}
const FullWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0f0a1a;
`;

const Wrap = styled.div`
  max-width: 1440px;
  margin: auto;
`;

export default App;
