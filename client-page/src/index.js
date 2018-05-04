import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers/rootReducer';
import logger from 'redux-logger';
import App from './containers/App';
import { loadState, saveState } from './localStorage';
import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
WebFont.load({
  google: {
    families: ['Raleway:400', 'Roboto:700', 'sans-serif']
  }
});
