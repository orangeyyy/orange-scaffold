import program from 'commander';
import pkg from '../package.json';
import Logger from './logger';

const logger = Logger('cli');
export function run() {
  program.version(pkg.version);
  program
    .command('test')
    .description('this is a test')
    .action(() => {
      logger.info('this is a test of <%= name%>');
    });
    
  program.parse(process.argv);
}
