import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/user';
import { Button } from '../Styled';

const Logout = ({ logout }) => (
  <Button onClick={logout}>Logout</Button>
);

export default compose(withRouter, connect(() => ({}), { logout }))(Logout);
