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
import Footer from './Footer';
import Mypage from '../pages/Mypage';
import CardEdit from '../pages/CardEdit';
import Permit from './Permit';
import WsNotiRoom from './WsNotiRoom';
import Grabtalk from '../pages/GrabTalk';
import AlarmCheck from './AlarmCheck';
import WithdrawalCompleteForm from '../pages/WithdrawalCompleteForm';

// import SizeCheck from './SizeCheck';
// import SizeCheck from '../pages/SizeCheck';

function App() {
  return (
    <WrapApp>
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
              <Header />
              <PublicRoute
                path={['/', '/card/:userId']}
                component={CardList}
                exact
              />
              <Permit>
                {/* <PrivateRoute path="/card/:userId" component={CardList} exact /> */}
                <PrivateRoute path="/settings" component={Settings} exact />
                <PrivateRoute path="/contap" component={Contap} exact />
                <PrivateRoute path="/mypage" component={Mypage} exact />
                <PrivateRoute path="/edit" component={CardEdit} exact />
                <PrivateRoute path="/grabtalk" component={Grabtalk} exact />
              </Permit>
              <Footer />
            </AlarmCheck>
          </WsNotiRoom>
        </Switch>
      </Wrap>
    </WrapApp>
  );
}

const WrapApp = styled.div`
  max-width: 1920px;
  min-width: 1440px;
  width: 100vw;
  max-height: 100%;
  min-height: 100%;
  margin: auto;
  padding: 0px;
  background-position: center;
  background-size: cover;
  background-color: #0f0a1a;
`;

const Wrap = styled.div`
  /* max-width: 1440px;
  min-width: 1110px; */
  max-width: 1920px;
  min-width: 1440px;
  max-height: 100%;
  min-height: 100vh;
  width: 100vw;
  margin: auto;
`;

export default App;
