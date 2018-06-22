"use strict";

import { combineReducers } from 'redux';
import { gamesReducers } from './gamesReducers';
import { cartReducers } from './cartReducers';

export default combineReducers({
  games: gamesReducers,
  cart: cartReducers
});
