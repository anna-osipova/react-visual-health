import React from 'react';
import PropTypes from 'prop-types';

import { TextField, Button } from '../Styled';
import './LoginForm.css';

const LoginForm = ({ onSubmit, loading }) => (
  <form className="LoginForm" onSubmit={onSubmit}>
    <TextField type="email" placeholder="Email" name="email" />
    <TextField type="password" placeholder="Password" name="password" />
    <Button type="submit" disabled={!!loading}>
      {!!loading && `...`}
      {!loading && `Submit`}
    </Button>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
