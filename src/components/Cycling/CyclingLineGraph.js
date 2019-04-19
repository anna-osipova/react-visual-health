import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { connect } from 'react-redux';
import { fetchCyclingData } from '../../actions/cycling';
import { getChartMargin, colors } from '../../helpers/chart';
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

    const years = [];
    const today = moment.utc();
    const cyclingMonthData = _.times(12, month => ({ month }));
    cyclingData.forEach(yearData => {
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

CyclingLineGraph.propTypes = {
  cyclingData: PropTypes.arrayOf(PropTypes.object)
};

CyclingLineGraph.defaultProp = {
  cyclingData: []
};

const mapStateToProps = state => ({ cyclingData: state.cycling.data });
export default connect(mapStateToProps, { fetchCyclingData })(CyclingLineGraph);
