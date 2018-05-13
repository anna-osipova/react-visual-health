import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import './Root.css';
import Header from '../components/Header';
import ScreensUserLogin from './User/Login';
import ScreensHomeDashboard from './Home/Dashboard';

class Root extends Component {
  render() {
    const { email } = this.props;

    return (
      <div className="App">
        <Header />
        {email
          ? <Route path="/" component={ScreensHomeDashboard} />
          : <Route path="/" component={ScreensUserLogin} />}
      </div>
    );
  }
}

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
};

function mapStateToProps(state) {
  const { user } = state;
  const { email } = user;

  return {
    email
  };
}

export default connect(mapStateToProps)(Root);
