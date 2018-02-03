import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import <%= bigCamelName%> from '_/pages/<%= littleCamelName%>';
import {
  <% if(routerType === 'hashRouter') {%>HashRouter<% } else {%>BrowserRouter<%}%> as Router 
} from 'react-router-dom';

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
render(<%= bigCamelName%>)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('_/pages/<%= littleCamelName%>', () => {
    render(<%= bigCamelName%>);
  });
}