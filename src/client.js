"use strict";

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { addToCart } from './actions/cartActions';
import { postGames, deleteGames, updateGames } from './actions/gamesActions';
import reducers from './reducers/index';
import routes from './routes';

// Store
const middleware = applyMiddleware(thunk, logger);
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
);

// App view
render(Routes, document.getElementById('react'));
