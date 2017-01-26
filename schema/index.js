const vogels = require('vogels');

module.exports = function (tables, cb) {
  if (process.env.NODE_ENV === 'development') {
    vogels.AWS.config.update({
      "region": process.env.AWS_REGION,
      "endpoint": process.env.DB_HOST
    });
  } else {
    vogels.AWS.config.update({
      "region": process.env.AWS_REGION || 'us-east-1'
    });
  }

  Object.keys(tables).forEach(function(table) {
    require(`./${table}`);
  });

  vogels.createTables(tables, cb);
};