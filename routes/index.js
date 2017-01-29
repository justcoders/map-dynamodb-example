const _ = require('lodash');
const express = require('express');
const router = express.Router();

const Place = require('../schema/Place');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET add page. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Add place' });
});

/* GET place list page. */
router.get('/list', function(req, res, next) {
  Place.scan().exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if(err) {
      console.log('Error running scan', err);
      next(err);
    } else {
      console.log('Found', resp.Count, 'items');
      res.render('list', {
        title: 'Place list',
        places: _.map(resp.Items, 'attrs')
      });
    }
    console.log('----------------------------------------------------------------------');
  });
});

module.exports = router;
