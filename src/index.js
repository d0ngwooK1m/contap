import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider as ReduxProvider } from 'react-redux';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import store, { history } from './features/configureStore';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
