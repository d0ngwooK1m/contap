import React from 'react';
import { Reset } from 'styled-reset';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CardList from '../pages/CardList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Settings from '../pages/Settings';
import Contap from '../pages/Contap';
import Header from './Header';
import Footer from './Footer';
import Mypage from '../pages/Mypage';
import CardEdit from '../pages/CardEdit';
import Permit from './Permit';
import WsNotiRoom from './WsNotiRoom';
import Grabtalk from '../pages/GrabTalk';
import AlarmCheck from './AlarmCheck';
import WithdrawalCompleteForm from '../pages/WithdrawalCompleteForm';
import MobileBlock from '../pages/MobileBlock';
import NotFound from './NotFound';
import MetaTag from './MetaTag';

// import SizeCheck from './SizeCheck';
// import SizeCheck from '../pages/SizeCheck';

function App() {
  const isWebView = window.matchMedia('(max-width: 768px)').matches;

  return (
    <WrapApp>
      <MetaTag />
      <Wrap>
        <Reset />
        <Switch>
          <PublicRoute restricted path="/signup" component={Signup} exact />
          <PublicRoute restricted path="/login" component={Login} exact />
          <PublicRoute
            path="/withdrawal"
            component={WithdrawalCompleteForm}
            exact
          />

          <WsNotiRoom>
            <AlarmCheck>
              {!isWebView && <Header />}
              <PublicRoute
                path={['/', '/card/:userId']}
                component={isWebView ? MobileBlock : CardList}
                exact
              />
              <Permit>
                {/* <PrivateRoute path="/card/:userId" component={CardList} exact /> */}
                <PrivateRoute path="/settings" component={Settings} exact />
                <PrivateRoute path="/contap" component={Contap} exact />
                <PrivateRoute path="/mypage" component={Mypage} exact />
                <PrivateRoute
                  // path={['/mypage/:userId/edit']}
                  path="/mypage/:userId/edit"
                  component={CardEdit}
                  exact
                />
                <PrivateRoute path="/grabtalk" component={Grabtalk} exact />
              </Permit>
            </AlarmCheck>
          </WsNotiRoom>

          {console.log('스위치 여까지 옴')}
          <Route path="*" component={NotFound} />
        </Switch>
      </Wrap>
      {!isWebView && <Footer />}
    </WrapApp>
  );
}

const WrapApp = styled.div`
  position: relative;
  /* max-width: 1920px; */
  /* min-width: 1440px; */
  /* width: 100vw; */
  /* max-height: 100%; */
  /* min-height: 100%; */
  height: 100%;
  width: 100%;
  /* top: 0px; */
  /* bottom: 0px; */
  /* left: 0px; */
  /* right: 0px; */
  margin: auto;
  padding: 0px;
  overflow: auto;
  background-position: center;
  background-size: cover;
  background-color: #0f0a1a;
`;

const Wrap = styled.div`
  max-width: 1440px;
  min-width: 1110px;
  /* max-width: 1920px;
  min-width: 1440px; */
  /* max-height: 100%; */
  width: 100%;
  margin: auto;
`;

export default App;
