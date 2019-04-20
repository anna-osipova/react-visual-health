import React from 'react';
import CyclingLineGraph from '../../components/Cycling/CyclingLineGraph';
import CyclingBarGraph from '../../components/Cycling/CyclingBarGraph';
import Screen from '../Screen';


const ScreensCycling = () => (
  <Screen>
    <CyclingLineGraph />
    <CyclingBarGraph />
  </Screen>
);

export default ScreensCycling;
