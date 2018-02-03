import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '_/pages/home';<% if(supportRouter) {%>
import {
  <% if(routerType === 'hashRouter') {%>HashRouter<% } else {%>BrowserRouter<%}%> as Router 
} from 'react-router-dom';
<%}%>

const render = Component => {
  ReactDOM.render(
    <AppContainer><% if(supportRouter) {%>
      <Router>
        <Component />
      </Router><% } else {%>
      <Component /><% } %>
    </AppContainer>,
    document.getElementById('root'),
  );
}
render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('_/pages/home', () => {
    render(App);
  })
}