import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import { connect } from 'react-redux';
import { ChartCustomTooltip } from '../Chart/CustomTooltip';
import { fetchCyclingData } from '../../actions/cycling';
import { generateMonthTicks, dateMonthFormatter, getChartMargin, colors } from '../../helpers/chart';
import './CyclingBarGraph.css';

class CyclingBarGraph extends Component {
  componentDidMount() {
    this.props.fetchCyclingData();
  }
  render() {
    const cyclingData = _.chain(this.props)
      .get('cyclingData', [])
      .map(entry => {
        const speed = _.round(entry.totalDistance / (entry.duration / 60), 2);
        return {
          distance: _.round(entry.totalDistance, 2),
          unit: entry.totalDistanceUnit,
          month: moment.utc(entry.startDate).startOf('month').format('YYYY-MM'),
          startDate: entry.startDate,
          endDate: entry.endDate,
          duration: entry.duration,
          speed,
          speedFormatted: `${speed} ${entry.totalDistanceUnit}/h`
        }
      })
      .groupBy('month')
      .map((month, dt) => _.reduce(month, (total, value) => {
        total.entries.push(value);
        total.unit = value.unit;
        total.totalDistance += value.distance;
        total.totalDuration += value.duration;
        return total;
      }, {
        totalDistance: 0,
        totalDuration: 0,
        entries: [],
        month: dt
      }))
      .map(month => {
        const totalAvg = _.round(month.totalDistance / (month.totalDuration / 60), 2);
        return {
          entries: month.entries,
            totalDistance: month.totalDistance,
          totalAvg,
          month: month.month,
          unit: month.unit,
          speedFormatted: `${totalAvg} ${month.unit}/h`
        };
      })
      .value();

    return (
      <ResponsiveContainer width="90%" className="ResponsiveContainer">
        <ComposedChart height={400} data={cyclingData} margin={getChartMargin()} barSize={20}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis
            dataKey="month"
            tickFormatter={dateMonthFormatter}
            ticks={generateMonthTicks(cyclingData, 'month')}
          />
          <YAxis yAxisId="left" orientation="left" dataKey="totalDistance" />
          <YAxis yAxisId="right" orientation="right" dataKey="totalAvg" />
          <Tooltip
            content={<ChartCustomTooltip />}
          />
          <Bar yAxisId="left" dataKey="totalDistance" fill={colors[0]} />
          <Line yAxisId="right" dataKey="totalAvg" type="monotone" strokeWidth={3} stroke={colors[1]} />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
};

CyclingBarGraph.propTypes = {
  cyclingData: PropTypes.arrayOf(PropTypes.object)
};

CyclingBarGraph.defaultProp = {
  cyclingData: []
};

const mapStateToProps = state => ({ cyclingData: state.cycling.data });
export default connect(mapStateToProps, { fetchCyclingData })(CyclingBarGraph);
