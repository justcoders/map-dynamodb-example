const vogels = require('vogels');
const Joi = require('joi');

const Accounts = vogels.define('Accounts', {
  hashKey : 'id',
  timestamps : true,

  schema : {
    id: vogels.types.uuid(),
    email   : Joi.string().email(),
    name    : Joi.string(),
    age     : Joi.number(),
    roles   : vogels.types.stringSet(),
    settings : {
      nickname      : Joi.string(),
      acceptedTerms : Joi.boolean().default(false)
    }
  },

  tableName: "accounts"
});

module.exports = Accounts;