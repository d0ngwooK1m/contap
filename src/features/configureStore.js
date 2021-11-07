import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import user from './user/reducer';
import cards from './cards/reducer';
import taps from './taps/reducer';
import chat from './chat/reducer';
import notice from './notice/reducer';

export const history = createBrowserHistory();
const middlewares = [thunk.withExtraArgument({ history })];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const rootReducer = combineReducers({
  user,
  cards,
  taps,
  chat,
  notice,
  router: connectRouter(history),
});

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);

export default store;
