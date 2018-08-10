import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import LoginForm from './LoginForm';
import { login } from '../../actions/user';

const Login = ({ user, login }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const { email: { value: email }, password: { value: password } } = e.target;
    login({ email, password });
  };

  if (user.email) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <LoginForm onSubmit={handleSubmit}/>
    </div>
  );
};

const mapStateToProps = state => ({ user: state.user });
export default compose(withRouter, connect(mapStateToProps, { login }))(Login);
