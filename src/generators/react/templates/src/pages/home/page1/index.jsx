import React, {
  PureComponent
} from 'react';

import PropTypes from 'prop-types';

export default class Page1 extends PureComponent {
  static displayName = 'page1';
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props)
  }

  render() {
    return (<div className="page1">page 1</div>);
  }
}