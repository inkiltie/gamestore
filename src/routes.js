"use strict";

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import GamesList from './components/gamesList';
import Cart from './components/cart';
import GamesForm from './components/gamesForm';
import Main from './main';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={GamesList} />
      <Route path="/admin" component={GamesForm} />
      <Route path="/cart" component={Cart} />
    </Route>
  </Router>
);

export default routes;
