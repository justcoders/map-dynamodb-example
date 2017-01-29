const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

function initApp(cb) {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', require('./routes/index'));
  app.use('/api', require('./api'));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || err.statusCode || 500);
    if(res.locals._apiEnpoint) {
      res.send(err);
    } else {
      res.render('error');
    }

  });

  cb && cb(app);
}

module.exports = function(cb){
  //Schemas Initialization
  require('./schema')({
    'Place'    : { readCapacity: 1, writeCapacity: 1 },
  }, function(err){
    if (err) {
      console.warn('Error creating tables', err);
      process.exit(1);
    } else {
      console.log('Tables are created and active');
      initApp(cb);
    }
  });
};
