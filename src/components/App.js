import React from 'react';
import { Route } from 'react-router-dom';

import CardList from '../pages/CardList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Settings from '../pages/Settings';
import Contap from '../pages/Contap';
import Header from './Header';
import Mypage from '../pages/Mypage';
import CardBackWrite from './CardBackWrite';
import CardEdit from '../pages/CardEdit';
import Permit from './Permit';

function App() {
  return (
    <div>
      <Header />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/" exact component={CardList} />
      <Route path="/settings" exact>
        <Permit>
          <Settings />
        </Permit>
      </Route>
      <Route path="/contap" exact>
        <Permit>
          <Contap />
        </Permit>
      </Route>
      <Route path="/mypage" exact>
        <Permit>
          <Mypage />
        </Permit>
      </Route>
      <Route path="/edit" exact>
        <Permit>
          <CardEdit />
        </Permit>
      </Route>
      <Route path="/write" exact>
        <Permit>
          <CardBackWrite />
        </Permit>
      </Route>
    </div>
  );
}

export default App;
