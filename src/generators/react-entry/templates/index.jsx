import React, {
  PureComponent
} from 'react';

import PropTypes from 'prop-types';

import './index.less';

export default class <%= bigCamelName %> extends PureComponent {
  static displayName = '<%=pascalName%>';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="<%=pascalName%>"><%=pascalName%></div>
    );
  }
}