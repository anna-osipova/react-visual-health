import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import './index.css';
import Root from './screens/Root';
import rootReducer from './reducers';
import { saveState, loadState } from './helpers';
import { loginWithToken } from './actions';

momentDurationFormatSetup(moment);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  loadState(),
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
store.subscribe(throttle(() => saveState(store.getState()), 1000));
store.dispatch(loginWithToken());
// registerServiceWorker();
