import React from 'react';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Screen } from '../../components/Styled';

const ScreensHomeDashboard = ({ email, location }) => {
  if (!email) {
    return <Redirect to={{ pathname: '/login', state: { from: location }}} />;
  }

  return (
    <Screen>
      <h2>Home</h2>
    </Screen>
  );
};

function mapStateToProps(state) {
  const { user } = state;
  const { email } = user;

  return {
    email
  };
}

export default compose(withRouter, connect(mapStateToProps))(ScreensHomeDashboard);
