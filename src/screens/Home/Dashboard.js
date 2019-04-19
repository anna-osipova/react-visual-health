import React from 'react';
import { compose } from 'redux';
import { Redirect, withRouter, NavLink } from 'react-router-dom';
import Logout from '../../components/Logout';
import { connect } from 'react-redux';

const ScreensHomeDashboard = ({ email }) => {
  if (!email) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <NavLink to="/cycling">Cycling</NavLink>
      <NavLink to="/running">Running</NavLink>
      <Logout />
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
