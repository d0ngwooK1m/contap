import React from 'react';
import { Route } from 'react-router-dom';
import CardList from '../pages/CardList';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

function App() {
  return (
    <div>
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/" exact component={CardList} />
    </div>
  );
}

export default App;
