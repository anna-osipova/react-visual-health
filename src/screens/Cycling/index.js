import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CyclingLineGraph from '../../components/Cycling/CyclingLineGraph';
import CyclingBarGraph from '../../components/Cycling/CyclingBarGraph';
import { Screen } from '../../components/Styled';


const ScreensCycling = ({ email, location }) => {
  if (!email) {
    return <Redirect to={{ pathname: '/login', state: { from: location }}} />;
  }

  return (
    <Screen>
      <CyclingLineGraph />
      <CyclingBarGraph />
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

export default compose(withRouter, connect(mapStateToProps))(ScreensCycling);
