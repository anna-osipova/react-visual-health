import React from 'react';
import CyclingBarGraph from '../../components/Cycling/CyclingBarGraph';
import CyclingLineGraph from '../../components/Cycling/CyclingLineGraph';
import RunningBarGraph from '../../components/Running/RunningBarGraph';

const ScreensHomeDashboard = () => (
  <div>
    Home
    <RunningBarGraph />
    <CyclingLineGraph />
    <CyclingBarGraph />
  </div>
);

export default ScreensHomeDashboard;
