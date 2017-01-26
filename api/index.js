const path    = require('path');
const express = require('express');
const router  = express.Router();

const config = require('./config');

router.use(function (req, res, next) {
  res.locals._apiEnpoint = true;
  next();
});

router.get('/', function (req, res) {
  res.send({});
});

if(config.controllers) {
  let controllers = config.controllers;
  Object.keys(controllers).forEach(function(key) {
    router.use(key, require(path.join(__dirname, 'controllers', controllers[key])));
  });
}

module.exports = router;