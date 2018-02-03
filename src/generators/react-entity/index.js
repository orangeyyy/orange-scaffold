import Generator from 'yeoman-generator';
import fs from 'fs-extra';
import {
  littleCamel,
  bigCamel,
  pascal
} from '../../utils';
import Logger from '../../logger';
const logger = Logger('react-entity-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    
    this.argument('name', {
      type: String,
      required: false,
      desc: 'the name of the entity file(please use little camel-case)'
    });
  }

  prompting() {
    return this.prompt([{
      name: 'name',
      type: 'input',
      message: 'entity name:',
      default: this.options.name || undefined
    }, {
      name: 'type',
      type: 'list',
      message: 'entity type:',
      choices: [{
        name: 'page'
      }, {
        name: 'component'
      }, {
        name: 'widget'
      }],
      default: 'page'
    }, {
      name: 'lifeCycle',
      type: 'checkbox',
      message: 'life cycle:',
      choices: [{
        name: 'componentWillMount',
        checked: false
      }, {
        name: 'componentDidMount',
        checked: true
      }, {
        name: 'componentWillReceiveProps',
        checked: true
      }, {
        name: 'shouldComponentUpdate',
        checked: false
      }, {
        name: 'componentDidUpdate',
        checked: false
      }, {
        name: 'componentWillUnmount',
        checked: false
      }]
    }]).then(anwsers => {
      this.anwsers = anwsers;
    });
  }

  writing() {
    const namePath = this.anwsers.name.split('/');
    const name = namePath[namePath.length - 1];
    const littleCamelName = littleCamel(name);
    const bigCamelName = bigCamel(name);
    const pascalName = pascal(name);
    const lifeCycle = this._transformLifeCycle();

    const dirPath = this.destinationPath(`src/${this.anwsers.type}s/${namePath.join('/')}`);
    if (fs.existsSync(dirPath)) {
      logger.error(`${dirPath} is aready exist!`);
    }

    fs.ensureDirSync(this.destinationPath(dirPath));

    this.fs.copyTpl(
      this.templatePath('index.jsx'),
      this.destinationPath(`${dirPath}/index.jsx`), {
        littleCamelName,
        bigCamelName,
        pascalName,
        lifeCycle
      }
    );

    this.fs.copyTpl(
      this.templatePath('index.less'),
      this.destinationPath(`${dirPath}/index.less`), {
        pascalName
      }
    );
  }

  end() {
    logger.info('add react entity complete!');
  }

  _transformLifeCycle() {
    return (this.anwsers.lifeCycle || []).map(item => {
      let res = {
        name: item
      };
      switch(item) {
        case 'componentWillReceiveProps':
          res.args = 'nextProps';
          break;
        case 'shouldComponentUpdate':
        case 'componentWillUpdate':
          res.args = 'nextProps, nextState';
          break;
        case 'componentDidUpdate':
          res.args = 'prevProps, prevState';
          break;
        default:
          res.args = '';
      }
      return res;
    });
  }
}
