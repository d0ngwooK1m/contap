import React from 'react';
import { Reset } from 'styled-reset';
import styled from 'styled-components';
import { Switch } from 'react-router-dom';
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
import Grabtalk from '../pages/GrabTalk';

function App() {
  return (
    <WrapApp>
      <Wrap>
        <Reset />
        <Switch>
          <PublicRoute restricted path="/signup" component={Signup} exact />
          <PublicRoute restricted path="/login" component={Login} exact />
          <WsNotiRoom>
            <Header />
            <PublicRoute path="/" component={CardList} exact />
            <Permit>
              <PrivatecRoute path="/settings" component={Settings} exact />
              <PrivatecRoute path="/contap" component={Contap} exact />
              <PrivatecRoute path="/mypage" component={Mypage} exact />
              <PrivatecRoute path="/edit" component={CardEdit} exact />
              <PrivatecRoute path="/grabtalk" component={Grabtalk} exact />
            </Permit>
          </WsNotiRoom>
        </Switch>
      </Wrap>
    </WrapApp>
  );
}

const WrapApp = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  margin: 0px;
  padding: 0px;
  background-position: center;
  background-size: cover;
  background-color: #0f0a1a;
`;

const Wrap = styled.div`
  max-width: 1440px;
  height: 100%;
  margin: auto;
`;

export default App;
