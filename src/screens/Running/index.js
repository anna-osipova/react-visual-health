import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import RunningBarGraph from '../../components/Running/RunningBarGraph';
import RunningLineGraph from '../../components/Running/RunningLineGraph';
import { Screen } from '../../components/Styled';

const ScreensRunning = ({ email, location }) => {
  if (!email) {
    return <Redirect to={{ pathname: '/login', state: { from: location }}} />;
  }

  return (
    <Screen>
      <RunningBarGraph />
      <RunningLineGraph />
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

export default compose(withRouter, connect(mapStateToProps))(ScreensRunning);
