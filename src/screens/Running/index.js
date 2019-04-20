import React from 'react';
import RunningBarGraph from '../../components/Running/RunningBarGraph';
import RunningLineGraph from '../../components/Running/RunningLineGraph';
import Screen from '../Screen';

const ScreensRunning = () => (
    <Screen>
      <RunningBarGraph />
      <RunningLineGraph />
    </Screen>
);

export default ScreensRunning;
