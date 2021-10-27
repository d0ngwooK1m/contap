import React from 'react';
import { Route } from 'react-router-dom';
import CardList from '../pages/CardList';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Settings from '../pages/Settings';

function App() {
  return (
    <div>
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/settings" exact component={Settings} />
      <Route path="/" exact component={CardList} />
    </div>
  );
}

export default App;
