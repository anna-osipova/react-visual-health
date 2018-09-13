import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { connect } from 'react-redux';
import { fetchCyclingData } from '../../actions/cycling';
import { getChartMargin } from '../../helpers/chart';
import './CyclingLineGraph.css';

const labelFormatter = month => moment.utc(month + 1, 'MM').format('MMM');
const formatter = (value, name, props) => `${Math.round(value)} ${props.payload.unit}`;

class CyclingLineGraph extends Component {
  componentDidMount() {
    this.props.fetchCyclingData();
  }
  render() {
    const cyclingData = _.chain(this)
      .get('props.cyclingData', [])
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

    return (
      <ResponsiveContainer width="90%" className="ResponsiveContainer">
        <LineChart height={400} data={cyclingData} margin={getChartMargin()}>
          <XAxis dataKey="month"
                 tickFormatter={(month) => moment.utc(month + 1, 'MM').format('MMM')}
                 scale="time"
          />
          <YAxis />
          <Tooltip labelFormatter={labelFormatter} formatter={formatter} />
          {cyclingData.map(series => (
            <Line data={series.data} name={series.name} key={series.name} dataKey={series.name} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }
};

CyclingLineGraph.propTypes = {
  cyclingData: PropTypes.arrayOf(PropTypes.object)
};

CyclingLineGraph.defaultProp = {
  cyclingData: []
};

const mapStateToProps = state => ({ cyclingData: state.cycling.data });
export default connect(mapStateToProps, { fetchCyclingData })(CyclingLineGraph);
