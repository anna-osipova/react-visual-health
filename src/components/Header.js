import React from 'react';
import { Link } from 'react-router-dom';

import { Title } from './Styled';

const Header = () => (
  <div>
    <Link to="/"><Title>Health Graphs</Title></Link>
  </div>
);

export default Header;
