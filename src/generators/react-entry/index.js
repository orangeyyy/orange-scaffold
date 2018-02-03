import Generator from 'yeoman-generator';
import fs from 'fs-extra';
import chalk from 'chalk';
import {
  littleCamel,
  bigCamel,
  pascal
} from '../../utils';
import Logger from '../../logger';
const logger = Logger('entry-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    
    this.argument('name', {
      type: String,
      required: false,
      desc: 'the name of the entry file(please use little camel-case)'
    });
  }

  prompting() {
    return this.prompt([{
      name: 'name',
      type: 'input',
      message: 'entry name:',
      validate: (val) => val ? true : 'please set the name of entry',
      default: this.options.name || undefined
    }]).then(anwsers => {
      this.anwsers = anwsers;
    });
  }

  writing() {
    const name = this.anwsers.name;
    const littleCamelName = littleCamel(name);
    const bigCamelName = bigCamel(name);
    const pascalName = pascal(name);
    const prompt = this.config.get('promptValues') || {};

    const entryFilePath = this.destinationPath(`src/entries/${littleCamelName}.jsx`);
    const pageDirPath = this.destinationPath(`src/pages/${littleCamelName}`);

    if (fs.existsSync(entryFilePath)) {
      this.env.error(chalk.red('entry is aready exist!'));
    }
    this.fs.copyTpl(
      this.templatePath('entry.jsx'),
      this.destinationPath(entryFilePath), {
        littleCamelName,
        bigCamelName,
        supportRouter: prompt.supportRouter || false,
        routerType: prompt.routerType || 'hashRouter'
      });

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(`build/${littleCamelName}.html`), {
        littleCamelName
      }
    );

    if (fs.existsSync(pageDirPath)) {
      this.env.error(chalk.red(`${pageDirPath} is aready exist!`));
    }

    fs.ensureDirSync(pageDirPath);

    this.fs.copyTpl(
      this.templatePath('index.jsx'),
      this.destinationPath(`src/pages/${littleCamelName}/index.jsx`), {
        littleCamelName,
        bigCamelName,
        pascalName
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.less'),
      this.destinationPath(`src/pages/${littleCamelName}/index.less`), {
        pascalName
      }
    );
  }

  end() {
    logger.info('add entry success!')
  }
};