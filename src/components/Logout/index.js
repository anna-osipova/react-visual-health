import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/user';
import { ButtonLight } from '../Styled';

const Logout = ({ logout }) => (
  <ButtonLight onClick={logout} style={{ marginLeft: 'auto', marginRight: '20px' }}>Logout</ButtonLight>
);

export default compose(withRouter, connect(() => ({}), { logout }))(Logout);
