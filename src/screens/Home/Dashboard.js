import React from 'react';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import CyclingBarGraph from '../../components/Cycling/CyclingBarGraph';
import CyclingLineGraph from '../../components/Cycling/CyclingLineGraph';
import RunningBarGraph from '../../components/Running/RunningBarGraph';
import { connect } from 'react-redux';

const ScreensHomeDashboard = ({ email }) => {
  if (!email) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      Home
      <RunningBarGraph />
      <CyclingLineGraph />
      <CyclingBarGraph />
    </div>
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
