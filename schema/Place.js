const vogels = require('vogels');
const Joi = require('joi');

const Place = vogels.define('Place', {
  hashKey : 'id',
  timestamps : true,

  schema : {
    id: vogels.types.uuid(),
    lat   : Joi.string(),
    lng    : Joi.string()
  },

  tableName: "places"
});

module.exports = Place;