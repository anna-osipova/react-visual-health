import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { connect } from 'react-redux';
import { fetchRunningData } from '../../actions/running';
import { getChartMargin, colors } from '../../helpers/chart';
import './RunningLineGraph.css';

const labelFormatter = month => moment.utc(month + 1, 'MM').format('MMM');
const formatter = (value, name, props) => `${Math.round(value)} ${props.payload.unit}`;

class RunningLineGraph extends Component {
  componentDidMount() {
    this.props.fetchRunningData();
  }
  render() {
    const runningData = _.chain(this)
      .get('props.runningData', [])
      .groupBy(entry => moment.utc(entry.startDate).get('year'))
      .map((yearEntries, year) => ({
          name: year,
          data: _.chain(_.times(12)).map((month) => ({
            distance: _.chain(yearEntries)
              .filter(entry => moment.utc(entry.startDate).get('month') === month)
              .sumBy('totalDistance')
              .value(),
            unit: 'km',
            year,
            month
          }))
          .reduce((result, month) => {
            const total = _.sumBy(result, 'distance');
            result.push({
              ...month,
              [year]: total + month.distance,
              total: total + month.distance
            });
            return result;
          }, [])
          .value()
      }))
      .value();

    const years = [];
    const today = moment.utc();
    const cyclingMonthData = _.times(12, month => ({ month }));
    runningData.forEach(yearData => {
      years.push(yearData.name);
      yearData.data.forEach((monthData, i) => {
        if (!(today.format('YYYY') === yearData.name) || i <= today.month()) {
          cyclingMonthData[i][yearData.name] = monthData.total;
          cyclingMonthData[i].unit = monthData.unit;
        }
      });
    });

    return (
      <ResponsiveContainer className="ResponsiveContainer">
        <LineChart height={400} data={cyclingMonthData} margin={getChartMargin()}>
          <XAxis dataKey="month"
                 tickFormatter={(month) => moment.utc(month + 1, 'MM').format('MMM')}
          />
          <YAxis />
          <Tooltip labelFormatter={labelFormatter} formatter={formatter} />
          {years.map((year, i) => (
            <Line dataKey={year} name={year} key={year} stroke={colors[i]} strokeWidth={3} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }
};

RunningLineGraph.propTypes = {
  runningData: PropTypes.arrayOf(PropTypes.object)
};

RunningLineGraph.defaultProp = {
  runningData: []
};

const mapStateToProps = state => ({ runningData: state.running.data });
export default connect(mapStateToProps, { fetchRunningData })(RunningLineGraph);
