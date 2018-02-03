import yeoman from 'yeoman-environment';
import Logger from './logger';
import path from 'path';
import fs from 'fs-extra';

const logger = Logger('main');

export default class Env {
  constructor() {
    this.env = yeoman.createEnv();
    const generatorPath = path.join(__dirname, 'generators');
    this.env.register(`${generatorPath}/react`, 'init:react');
    this.env.register(`${generatorPath}/react-entry`, 'init:react-entry');
    this.env.register(`${generatorPath}/react-entity`, 'init:react-entity');
    this.env.register(`${generatorPath}/node`, 'init:node');
  }


  initReactProject = async (name, type='app') => {
    return new Promise((resolve, reject) => {
      let scaffoldName = '';
      switch(type) {
        case 'app':
          scaffoldName = 'init:react';
          break;
        case 'entry':
          scaffoldName = 'init:react-entry';
          break;
        case 'entity':
          scaffoldName = 'init:react-entity';
          break;
      }
      try {
        this.env.run(scaffoldName, {
          name
        }, (err) => {
          if (err) {
            logger.error(err.message || 'got some error!');
            reject();
          }
          resolve();
        });
      } catch(err) {
        logger.error(err.message || 'got some error!');
        resolve();
      }
    });
  }

  initNodeProject = async (name) => {
    return new Promise((resolve, reject) => {
      try {
        this.env.run('init:node', {
          name
        }, (err) => {
          if (err) {
            logger.error(err.message || 'got some error!');
            reject();
          }
          resolve();
        });
      } catch(err) {
        logger.error(err.message || 'got some error!');
        resolve();
      }
    })
  }
}