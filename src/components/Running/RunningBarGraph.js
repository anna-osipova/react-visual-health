import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import { connect } from 'react-redux';
import { ChartCustomTooltip } from '../Chart/CustomTooltip';
import { fetchRunningData } from '../../actions/running';
import { dateMonthFormatter, getChartMargin } from '../../helpers/chart';
import './RunningBarGraph.css';

class RunningBarGraph extends Component {
  componentDidMount() {
    this.props.fetchRunningData();
  }
  render() {
    const runningData = _.chain(this.props)
      .get('runningData', [])
      .map(entry => {
        const pace = moment.duration(entry.duration / entry.totalDistance, 'minutes');
        return {
          distance: _.round(entry.totalDistance, 2),
            unit: entry.totalDistanceUnit,
          month: moment.utc(entry.startDate).startOf('month').format('YYYY-MM'),
          startDate: entry.startDate,
          endDate: entry.endDate,
          duration: entry.duration,
          pace,
          speedFormatted: pace.format(`m' s''`)
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
      .map(month => ({
        entries: month.entries,
        totalDistance: month.totalDistance,
        totalAvg: _.round(month.totalDistance / (month.totalDuration / 60), 2),
        month: month.month,
        unit: month.unit,
        speedFormatted: moment.duration(month.totalDuration / month.totalDistance, 'minutes').format(`m' s''`)
      }))
      .value();

    return (
      <ResponsiveContainer width="90%" className="ResponsiveContainer">
        <ComposedChart height={400} data={runningData} margin={getChartMargin()} barSize={20}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="month"
                 tickFormatter={dateMonthFormatter}
          />
          <YAxis yAxisId="left" orientation="left" dataKey="totalDistance" />
          <YAxis yAxisId="right" orientation="right" dataKey="totalAvg" />
          <Tooltip
            content={<ChartCustomTooltip />}
          />
          <Bar yAxisId="left" dataKey="totalDistance" fill="#82ca9d" />
          <Line yAxisId="right" dataKey="totalAvg" type="monotone" strokeWidth={3} />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
};

RunningBarGraph.propTypes = {
  runningData: PropTypes.arrayOf(PropTypes.object)
};

RunningBarGraph.defaultProp = {
  runningData: []
};

const mapStateToProps = state => ({ runningData: state.running.data });
export default connect(mapStateToProps, { fetchRunningData })(RunningBarGraph);
