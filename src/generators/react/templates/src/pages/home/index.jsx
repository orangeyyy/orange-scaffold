import React, {
  PureComponent
} from 'react';

import PropTypes from 'prop-types';
<% if (supportRouter) {%>
import {Route} from 'react-router-dom';
<% } %>
import Page1 from './page1';
import './index.less';
export default class HomeView extends PureComponent {
  static displayName = 'home-view'
  static propTypes = {}
  static defaultProps = {}

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <% if(!supportRouter) {%>
        <div className="home">
          hello world
          <Page1 />
        </div>
      <% } %>
      <% if(supportRouter) {%>
        <div className="home">
          hello world
          <Route path="/page1" component={Page1} />
        </div>
      <% } %>
    );
  }
}