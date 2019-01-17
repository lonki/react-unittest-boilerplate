import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Loadable from 'react-loadable';

const App = Loadable({
  loader: () => import('./containers/App/App'),
  loading: () => null,
});

const Dashboard = Loadable({
  loader: () => import('./containers/Dashboard/Dashboard'),
  loading: () => null,
});

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};
