import Generator from 'yeoman-generator';
import path from 'path';
import fs from 'fs-extra';
import walker from 'walker';

import Logger from '../../logger';

const logger = Logger('node-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      required: false,
      desc: 'name of the project'
    });
  }

  prompting() {
    const curPath = process.cwd();
    const defaultName = this.options.name || curPath.substr(curPath.lastIndexOf('/') + 1);
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'project name:',
      default: defaultName
    }, {
      type: 'input',
      name: 'version',
      message: 'project version:',
      default: '0.0.1'
    }, {
      type: 'input',
      name: 'description',
      message: 'project description:'
    }, {
      type: 'input',
      name: 'author',
      message: 'project author:'
    }, {
      type: 'input',
      name: 'git',
      message: 'git repository:'
    }, {
      type: 'input',
      name: 'keyWords',
      message: 'key words:'
    }, {
      type: 'confirm',
      name: 'babel',
      message: 'use babel?'
    }, {
      type: 'confirm',
      name: 'commander',
      message: 'use commander?'
    }]).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    const sourceRoot = this.sourceRoot();
    if (this.options.name) {
      this.destinationRoot(this.options.name);
    }
    return new Promise((resolve, reject) => {
      walker(sourceRoot)
        .filterDir((dir) => {
          const relativePath = path.relative(sourceRoot, dir);
          if (!this.answers.commander && relativePath === 'bin') return false;

          return true;
        })
        .on('dir', (dir) => {
          const relativePath = path.relative(sourceRoot, dir);
          if (relativePath && !this._isPrivatePath(relativePath)) {
            fs.ensureDirSync(this.destinationPath(relativePath));
          }
        })
        .on('file', (file) => {
          const relativePath = path.relative(sourceRoot, file);
          if (relativePath && !this._isPrivatePath(relativePath)) {
            if (!this.answers.babel && relativePath === '.babelrc') return;
            if (!this.answers.commander && relativePath === 'src/cli.js') return;
            this.fs.copyTpl(file, this.destinationPath(relativePath), this.answers);
          }
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (err) => {
          logger.error(err.message || 'failed copy the files!');
          reject(err);
        })
    });
  }

  install() {
    this.npmInstall();
  }

  end() {
    logger.info('create project complete!');
  }

  _isPrivatePath(path) {
    return path.split('/').some(item => item.startsWith('_'));
  }
}