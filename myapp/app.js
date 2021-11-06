var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var test = require('./routes/index');
var dashboard = require('./routes/dashboard.js');
var clientsRouter = require('./routes/users');
var submit = require('./routes/submit');
var makeAccount = require('./routes/createNewAccount');
var log_in = require('./routes/log_in');
var submitLogin = require('./routes/login_Submit');

var session = require('express-session');
const passport = require('passport');
var app = express();

require('./config/passport')(passport);

var session_config = {
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
		cookie: { secure: true } 
};

session_config.cookie.secure = false;

app.use(session(session_config))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', test);
app.use('/users', clientsRouter);
app.use('/createAccount', makeAccount);
app.use('/signIn', log_in);
app.use('/submit', submit);
app.use('/loginSubmit', submitLogin);
app.use('/dashboard', dashboard);

app.use(function(req, res, next) {
  res.sendFile(`${__dirname}/index.hbs`, (err) => {
    if (err) {
      console.log(err);
      next(createError(404));
      res.end(err.message);
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.hbs`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
  });
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


app.get('/error', (req, res) => {
  res.sendFile(`${__dirname}/error.hbs`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
  });
});

app.get('/createAccount', (req, res) => {
  res.sendFile(`${__dirname}/createAccount.hbs`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
  });
});

app.get('/signIn', (req, res) => {
  res.sendFile(`${__dirname}/signIn.hbs`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
  });
});

module.exports = app;