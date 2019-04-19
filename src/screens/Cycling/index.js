import React from 'react';
import { withRouter } from 'react-router-dom';
import CyclingLineGraph from '../../components/Cycling/CyclingLineGraph';
import CyclingBarGraph from '../../components/Cycling/CyclingBarGraph';
import { Screen } from '../../components/Styled';

const ScreensCycling = () => (
  <Screen>
    <CyclingLineGraph />
    <CyclingBarGraph />
  </Screen>
);

export default withRouter(ScreensCycling);
