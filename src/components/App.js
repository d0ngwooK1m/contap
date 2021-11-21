import React from 'react';
import { Reset } from 'styled-reset';
import styled from 'styled-components';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
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
import AlarmCheck from './AlarmCheck';

function App() {
  return (
    <WrapApp>
      <Wrap>
        <Reset />
        <Switch>
          <PublicRoute restricted path="/signup" component={Signup} exact />
          <PublicRoute restricted path="/login" component={Login} exact />
          <WsNotiRoom>
            <AlarmCheck>
              <Header />
              <PublicRoute path="/" component={CardList} exact />
              <Permit>
                <PrivateRoute path="/settings" component={Settings} exact />
                <PrivateRoute path="/contap" component={Contap} exact />
                <PrivateRoute path="/mypage" component={Mypage} exact />
                <PrivateRoute path="/edit" component={CardEdit} exact />
                <PrivateRoute path="/grabtalk" component={Grabtalk} exact />
              </Permit>
            </AlarmCheck>
          </WsNotiRoom>
        </Switch>
      </Wrap>
    </WrapApp>
  );
}

const WrapApp = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  min-height: 100%;
  margin: auto;
  padding: 0px;
  background-position: center;
  background-size: cover;
  background-color: #0f0a1a;
  z-index: -3;
`;

const Wrap = styled.div`
  max-width: 1440px;
  max-height: 100%;
  min-height: 100vh;
  margin: auto;
  z-index: -3;
`;

export default App;
