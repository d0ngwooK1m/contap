import React from 'react';
import { Route } from 'react-router-dom';

import { Reset } from 'styled-reset';
import CardList from '../pages/CardList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Settings from '../pages/Settings';
import Contap from '../pages/Contap';
import Header from './Header';
import Mypage from '../pages/Mypage';
import CardEdit from '../pages/CardEdit';
import Permit from './Permit';

function App() {
  return (
    <div>
      <Reset />
      {/* <Header /> */}
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/" exact>
        <Header />
        <CardList />
      </Route>
      <Route path="/settings" exact>
        <Permit>
          <Header />
          <Settings />
        </Permit>
      </Route>
      <Route path="/contap" exact>
        <Permit>
          <Header />
          <Contap />
        </Permit>
      </Route>
      <Route path="/mypage" exact>
        <Permit>
          <Header />
          <Mypage />
        </Permit>
      </Route>
      <Route path="/edit" exact>
        <Permit>
          <Header />
          <CardEdit />
        </Permit>
      </Route>
    </div>
  );
}

export default App;
