import React from 'react';

import { Title, Link, Navbar } from './Styled';
import Logout from '../components/Logout';

const Header = () => (
  <Navbar>
    <Title>Health Graphs</Title>
    <Link to="/cycling">Cycling</Link>
    <Link to="/running">Running</Link>
    <Logout />
  </Navbar>
);

export default Header;
