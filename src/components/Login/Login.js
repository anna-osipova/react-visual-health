import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';
import { login } from '../../actions/user';

const Login = ({ user, login }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const { email: { value: email }, password: { value: password } } = e.target;
    login({ email, password });
  };

  return (
    <div>
      {!user.email && <LoginForm onSubmit={handleSubmit}/>}
      {user.email && <Redirect to="/" />}
    </div>
  );
};

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps, { login })(Login);
