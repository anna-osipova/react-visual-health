import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './Root.css';
import Header from '../components/Header';
import ScreensUserLogin from './User/Login';
import ScreensHomeDashboard from './Home/Dashboard';

class Root extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/login" component={ScreensUserLogin} />
          <Route path="/" component={ScreensHomeDashboard} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Root);
