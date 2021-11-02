import React from 'react';
import { Route } from 'react-router-dom';

import CardList from '../pages/CardList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Settings from '../pages/Settings';
import Contap from '../pages/Contap';
import Header from './Header';
import Mypage from '../pages/Mypage';
import Permit from './Permit';
import CardEdit from '../pages/CardEdit';
import CardBackWrite from './CardBackWrite';

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
      <Route path="/settings" exact component={Settings} />
      <Route path="/contap" exact component={Contap} />
      <Route path="/mypage" exact component={Mypage} />
      <Route path="/edit" exact component={CardEdit} />
      <Route path="/write" exact component={CardBackWrite} />
    </div>
  );
}

export default App;
