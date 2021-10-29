import React from 'react';
import { Route } from 'react-router-dom';

import CardList from '../pages/CardList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Settings from '../pages/Settings';
import Contap from '../pages/Contap';
import Header from './Header';

function App() {
  return (
    <div>
      <Header />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/" exact component={CardList} />
      <Route path="/settings" exact component={Settings} />
      <Route path="/contap" exact component={Contap} />
    </div>
  );
}

export default App;
