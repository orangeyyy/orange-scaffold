import program from 'commander';
import Logger from './logger';
import Env from './index';
import pkg from '../package.json';
import {
  exec
} from 'child-process-promise';
const logger = Logger('cli');

async function createAndEnterDir(name) {
  await exec(`mkdir ${name} && cd ${name}`);
  logger.info('create ${name} and enter it');
}

export function run() {
  const env = new Env();
  program.version(pkg.version);
  program
    .command('react [name]')
    .option("--entry", "entry scafford")
    .option("--entity", "entity scaffold")
    .description('create a react project')
    .action(async (name, options) => {
      logger.info('start create react project');
      if (options.entry) {
        await env.initReactProject(name, 'entry');
      } else if (options.entity) {
        await env.initReactProject(name, 'entity');
      } else {
        await env.initReactProject(name);
      }
      logger.info('end create react project');
    });
    
  program
    .command('node [name]')
    .description('create a node project')
    .action(async (name) => {
      logger.info('start create node project');
      await createAndEnterDir(name);
      await env.initNodeProject(name);
      logger.info('end create node project');
    });
  
  program
    .command('koa')
    .description('create a koa project')
    .action(async () => {

    });
  
  program
    .command('egg')
    .description('create an egg project')
    .action(async () => {

    });

  program
    .command('test')
    .option("--entry", "entry scafford")
    .option("--entity", "entity scaffold")
    .action(async (options) => {
      logger.info(`entry:${options.entry};entity: ${options.entity}`);
    });

  program.parse(process.argv);
}
