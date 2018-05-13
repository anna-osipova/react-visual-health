import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { connect } from 'react-redux';
import { fetchCyclingData } from '../../actions/cycling';
import { generateMonthTicks, dateMonthFormatter, getChartMargin } from '../../helpers/chart';
import './CyclingLineGraph.css';

const labelFormatter = date => moment.utc(date).format('DD.MM.YYYY HH:mm');
const formatter = (value, name, props) => `${Math.round(value)} ${props.payload.unit}`;

class CyclingLineGraph extends Component {
  componentDidMount() {
    this.props.fetchCyclingData();
  }
  render() {
    const cyclingData = _.chain(this)
      .get('props.cyclingData', [])
      .map(entry => ({
        distance: _.round(entry.totalDistance, 2),
        unit: entry.totalDistanceUnit,
        startDate: moment.utc(entry.startDate).valueOf(),
        endDate: entry.endDate,
        year: moment.utc(entry.startDate).get('year')
      }))
      .reduce((entries, entry) => {
        const total = _.chain(entries)
          .filter({ year: entry.year })
          .sumBy('distance')
          .value();

        // insert zero for start of each year
        if (total === 0) {
          entries.push({
            ...entry,
            distance: 0,
            startDate: moment.utc(entry.startDate).startOf('year').valueOf(),
            endDate: moment.utc(entry.startDate).startOf('year').valueOf()
          })
        }
        entries.push({
          ...entry,
          total: total + entry.distance
        });
        return entries;
      }, [])
      .value();

    return (
      <ResponsiveContainer width="90%" className="ResponsiveContainer">
        <LineChart height={400} data={cyclingData} margin={getChartMargin()}>
          <XAxis dataKey="startDate"
                 tickFormatter={dateMonthFormatter}
                 ticks={generateMonthTicks(cyclingData, 'startDate')}
                 scale="time" />
          <YAxis dataKey="total"/>
          <Tooltip labelFormatter={labelFormatter} formatter={formatter} />
          <Line type="monotone" dataKey="total" stroke="#8884d8" dot={true} />
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
