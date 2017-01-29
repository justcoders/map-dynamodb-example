const express = require('express');
const Controller = express.Router();
const _ = require('lodash');
const util = require('util');
const Place = require('../../schema/Place');

var GeoPoint = require('geopoint');

Controller.post('/', function (req, res, next) {
  Place.create(req.body, function (err, item) {
    if(err){
      return next(err);
    } else {
      res.send(item);
    }
  });
});

Controller.post('/box', function (req, res) {
  let point = new GeoPoint(Number(req.body.lat), Number(req.body.lng));
  let [swPoint, nePoint] = point.boundingCoordinates(Number(req.body.distance), null, true);
  let places = [];

  Place.scan()
    .filterExpression('#lat BETWEEN :lowLat AND :highLat AND #lng BETWEEN :lowLng AND :highLng')
    .expressionAttributeValues({
      ':lowLat' : swPoint.latitude().toString(),
      ':highLat' : nePoint.latitude().toString(),
      ':lowLng' : swPoint.longitude().toString(),
      ':highLng' : nePoint.longitude().toString()
    })
    .expressionAttributeNames({
      '#lat' : 'lat',
      '#lng' : 'lng',
    })
    .exec(function (err, resp) {
      console.log(err, resp);
      if(err) {
        console.log('Error running scan', err);
      } else {
        console.log(_.map(resp.Items, 'attrs'));
        places = _.map(resp.Items, 'attrs');
      }
      res.send({
        bounds: {
          north: nePoint.latitude(),
          south: swPoint.latitude(),
          east: nePoint.longitude(),
          west: swPoint.longitude()
        },
        places: places
      });
    });

});

Controller.get('/', function (req, res, next) {
  Place.scan().exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if(err) {
      console.log('Error running scan', err);
      next(err);
    } else {
      console.log('Found', resp.Count, 'items');
      console.log(util.inspect(_.map(resp.Items, 'attrs')));
      res.send(_.map(resp.Items, 'attrs'));
    }

  });
});

Controller.delete('/:id', function (req, res, next) {
  console.log('Deleting place: ', req.params.id);
  Place.destroy( req.params.id, function (err) {
    if(err) {
      next(err);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = Controller;
