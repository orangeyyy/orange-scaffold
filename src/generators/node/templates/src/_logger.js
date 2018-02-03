var log4js = require('log4js');

module.exports = function(category) {
  var logger = log4js.getLogger(category);
  logger.level = 'info';
  return logger;
};