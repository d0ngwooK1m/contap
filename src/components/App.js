import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../features/configureStore';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

function App() {
  return (
    <div>
      <ConnectedRouter history={history}>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
