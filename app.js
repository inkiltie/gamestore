require('babel-core/register')({
 "presets":["env", "react", "stage-1"]
});

var express = require('express');
var path = require('path');
var logger = require('morgan');

// Proxy
var httpProxy = require('http-proxy');

// Request handler for server-side rendering
var requestHandler = require('./requestHandler.js');

var app = express();

app.use(logger('dev'));

// Proxy to API
const apiProxy = httpProxy.createProxyServer({
  target:"http://localhost:3001"
});
app.use('/api', function(req, res){
  apiProxy.web(req, res);
})

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', function(req, res){
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

app.set('view engine', 'ejs');

app.use(requestHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
