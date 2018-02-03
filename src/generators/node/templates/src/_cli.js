var program = require('commander');
var pkg = require('../package.json');
var Logger = require('./logger');

var logger = Logger('cli');

module.exports = {
  run: function() {
    program.version(pkg.version);
    program
      .command('test')
      .description('this is a test')
      .action(() => {
        logger.info('this is a test of <%= name%>');
      });
      
    program.parse(process.argv);
  }
}
