var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var routes = require('./routes/index')
var login = require('./routes/user/login')
var wiki = require('./routes/discuss/wiki')
var write = require('./routes/discuss/write')
var threads = require('./routes/discuss/thread.js')

//set DB modules



//connect to mongodb server

mongoose.connect('mongodb://localhost:3000/test');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // connected to mongodb server
    console.log("Connected to mongod server");
});

var app = express()

var userDB = require('./DB/user')
var postDB = require('./DB/post')
var historyDB = require('./DB/history')
var threadDB = require('./DB/thread')
var commentDB = require('./DB/comment')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/login', login)
app.use('/posts/:post', wiki)
app.use('/posts', write)
app.use('/threads',threads);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app