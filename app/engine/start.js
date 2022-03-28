// init app
const path = require('path');
const express = require('express');
var RateLimit = require('express-rate-limit');
const { getWholeQuran } = require('./controller');

// create express app
const app = express();

// set up rate limiter: maximum of five requests per minute
var limiter = RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 20, // limit each IP to 10 requests per windowMs
});

// enable middlewares
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// init route
app.use('/', require('./route'));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// get the Quran
getWholeQuran();

// 404 handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = app;