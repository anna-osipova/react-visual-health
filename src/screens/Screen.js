import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Screen as StyledScreen } from '../components/Styled';

const Screen = ({ email, loading, location, ...rest }) => (
  <StyledScreen>
    {!email && !loading && <Redirect to={{ pathname: '/login', state: { from: location }}} />}
    {email && !loading && rest.children}
  </StyledScreen>
);

function mapStateToProps(state) {
  const { user: { email, loading } } = state;

  return {
    email, loading
  };
}

export default compose(withRouter, connect(mapStateToProps))(Screen);
