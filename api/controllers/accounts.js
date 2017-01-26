const express = require('express');
const Controller = express.Router();
const _ = require('lodash');
const util = require('util');
const Accounts = require('../../schema/Accounts');

Controller.post('/', function (req, res, next) {
  Accounts.create(req.body, {overwrite : false}, function (err, item) {
    if(err){
      return next(err);
    } else {
      console.log(item);
      res.sendStatus(200);
    }
  });
});

Controller.get('/', function (req, res, next) {
  Accounts.scan().exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if(err) {
      console.log('Error running scan', err);
      next(err);
    } else {
      console.log('Found', resp.Count, 'items');
      console.log(util.inspect(_.map(resp.Items, 'attrs')));
      res.send(_.map(resp.Items, 'attrs'));
    }

    console.log('----------------------------------------------------------------------');
  });
});

Controller.get('/:id', function (req, res) {
  res.send({
    accounts: req.params.id
  })
});

module.exports = Controller;
