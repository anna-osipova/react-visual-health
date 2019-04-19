import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './Root.css';
import Header from '../components/Header';
import ScreensUserLogin from './User/Login';
import ScreensHomeDashboard from './Home/Dashboard';
import ScreensCycling from './Cycling';
import ScreensRunning from './Running';

class Root extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/login" component={ScreensUserLogin} />
          <Route path="/cycling" component={ScreensCycling} />
          <Route path="/running" component={ScreensRunning} />
          <Route path="/" component={ScreensHomeDashboard} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Root);
