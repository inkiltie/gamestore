"use strict";

var mongoose = require('mongoose');

var gamesSchema = mongoose.Schema({
  title: String,
  description: String,
  images: String,
  price: Number
});

var Games = mongoose.model('Games', gamesSchema);

module.exports = Games;
