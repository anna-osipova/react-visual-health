import React from 'react';
import { TooltipBackground, TooltipHeader } from '../Styled';
import moment from 'moment';
import _ from 'lodash';

export const ChartCustomTooltip = ({ type, payload }) => {
  if (!payload || !payload[0] || !payload[0].value) {
    return null;
  }
  const entries = payload[0].payload.entries.map((entry, j) => (
    [
      <div className="col-3" key={`${j}-1`} style={{ textAlign: 'left' }}>{`${moment.utc(entry.startDate).format('DD.MM.YYYY')}`}</div>,
      <div className="col-3" key={`${j}-2`}>{`${entry.distance.toFixed(2)} ${entry.unit}`}</div>,
      <div className="col-3" key={`${j}-3`}>{entry.speedFormatted}</div>
    ]
  ));
  const distanceRow = _.find(payload, { name: 'totalDistance' });
  const avgSpeedRow = _.find(payload, { name: 'totalAvg' });
  return (
    <TooltipBackground className="container">
      <TooltipHeader className="col-3" style={{ textAlign: 'left' }}>
        {moment(distanceRow.payload.month).format('MMM')}
      </TooltipHeader>
      <TooltipHeader className="col-3">{`${Math.round(distanceRow.value)} ${distanceRow.payload.unit}`}</TooltipHeader>
      <TooltipHeader className="col-3">{distanceRow.payload.speedFormatted}</TooltipHeader>
      {entries}
    </TooltipBackground>
  );
};
