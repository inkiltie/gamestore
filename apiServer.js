"use strict";

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');

// Local DB
// mongoose.connect('mongodb://localhost:27017/gameshop');

// mLab DB
mongoose.connect('mongodb://test:1testPP@ds018508.mlab.com:18508/gamestore');

var db = mongoose.connection;

db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// Sessions
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave:false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60}) // TTL: 2 days * 24 hours * 60 minutes * 60 seconds
}));

// Save session cart API
app.post('/cart', function(req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if(err) {
      console.log('# API post cart session: ', err);
    }
    res.json(req.session.cart);
  })
});

// Get session cart API
app.get('/cart', function(req, res) {
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});

var Games = require('./models/games.js');

// Post games
app.post('/games', function(req, res) {
  var game = req.body;
  Games.create(game, function(err, games) {
    if(err) {
      console.log('# API post games: ', err);
    }
    res.json(games);
  })
});

// Get games
app.get('/games', function(req, res) {
  Games.find(function(err, games) {
    if(err){
      console.log('# API get games: ', err);
    }
    res.json(games)
  })
});

// Delete games
app.delete('/games/:_id', function(req, res) {
  var query = {_id: req.params._id};
  Games.remove(query, function(err, games) {
    if(err){
      console.log('# API delete games: ', err);
    }
    res.json(games);
  })
});

// Update games
app.put('/games/:_id', function(req, res) {
  var game = req.body;
  var query = { _id: req.params._id };

  // if the field doesn't exist $set will set a new field
  var update = {
    '$set': {
      title: game.title,
      description: game.description,
      image: game.image,
      price: game.price
    }
  };

  // When true returns the updated document
  var options = { new: true };
  Games.findOneAndUpdate(query, update, options, function(err, games) {
      if(err) {
        console.log('# API update games: ', err);
      }
      res.json(games);
  })
});

// Get game images API
app.get('/images', function(req, res) {
  const imgFolder = __dirname + '/public/images/';

  // Require file system
  const fs = require('fs');

  // Read all files in the directory
  fs.readdir(imgFolder, function(err, files) {
    if(err) {
      return console.error(err);
    }

    // Create an empty array
    const filesArr = [];

    // Iterate all images in the directory and add to the array
    files.forEach(function(file) {
      filesArr.push({name: file});
    });

    // Send the JSON response with the array
    res.json(filesArr);
  })
});

app.listen(3001, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
});

// var createError = require('http-errors');
// var express = require('express');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
//
// var app = express();
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
//
// // APIs
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/gameshop');
//
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
//
// // Sessions
// app.use(session({
//   secret: 'mySecretString',
//   saveUninitialized: false,
//   resave: false,
//   cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in ms
//   store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 }) // Time to life: 2 days * 24 hours * 60 minutes * 60 seconds
// }));
//
// // Save cart API session
// app.post('/cart', function(req, res) {
//   var cart = req.body;
//
//   req.session.cart = cart;
//
//   req.session.save(function(err) {
//     if(err) {
//       throw err;
//     }
//
//     res.json(req.session.cart);
//   });
// });
//
// // Get cart API session
// app.get('/cart', function(req, res) {
//   if(typeof req.session.cart !== 'undefined') {
//     res.json(req.session.cart);
//   }
// });
//
// var Games = require('./models/games.js');
//
// // Add games
// app.post('/games', function(req, res) {
//   var game = req.body;
//
//   Games.create(game, function(err, games){
//     if(err) {
//       throw err;
//     }
//
//     res.json(games);
//   });
// });
//
// // Get games
// app.get('/games', function(req, res) {
//   Games.find(function(err, games) {
//     if(err) {
//       throw err;
//     }
//
//     res.json(games);
//   });
// });
//
// // Update games
// app.put('/games/:_id', function(req, res) {
//   var game = req.body;
//
//   var query = { _id: req.params._id };
//
//   // If the field doesn't exist $set will set a new field
//   var update = {
//     '$set': {
//       title: game.title,
//       description: game.description,
//       image: game.image,
//       price: game.price
//     }
//   };
//
//   // When true returns the updated document
//   var options = { new: true };
//
//   Games.findOneAndUpdate(query, update, options, function(err, games) {
//     if(err) {
//       throw err;
//     }
//
//     res.json(games);
//   });
// });
//
// // Delete games
// app.delete('/games/:_id', function(req, res) {
//   var query = { _id: req.params._id };
//
//   Games.remove(query, function(err, games) {
//     if(err) {
//       throw err;
//     }
//
//     res.json(games);
//   });
// });
//
// app.get('/images', function(req, res) {
//   const imgFolder= __dirname + '/public/images/';
//   // Require file system
//   const fs = require('fs');
//   // Read all files in the directory
//   fs.readdir(imgFolder, function(err, files) {
//     if(err) {
//       return console.error(err);
//     }
//     // Create an empty array
//     const filesArr = [];
//     // Iterate all images in the directory and add to the array
//     files.forEach(function(file) {
//       filesArr.push({ name: file });
//     });
//     // Send the JSON response with the array
//     files.json(filesArr);
//   })
// });
//
// app.listen(3001, function(err) {
//   if(err) {
//     return console.log(err);
//   }
//
//   console.log('API server is listening on port 3001');
// });
