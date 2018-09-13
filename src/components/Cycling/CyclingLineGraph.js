import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { ResponsiveLine } from '@nivo/line'
import { connect } from 'react-redux';
import { fetchCyclingData } from '../../actions/cycling';
import './CyclingLineGraph.css';

const labelFormatter = month => moment.utc().month(month).format('MMM');
const tooltipFormat = value => `${value} km`;

class CyclingLineGraph extends Component {
  componentDidMount() {
    this.props.fetchCyclingData();
  }
  render() {
    const today = moment.utc();
    const cyclingData = _.chain(this)
      .get('props.cyclingData', [])
      .groupBy(entry => moment.utc(entry.startDate).get('year'))
      .map((yearEntries, year) => ({
          id: year,
          data: _.chain(_.times(12))
            .map((month) => {
              if (year === today.format('YYYY') && month > today.month()) {
                return null;
              }
              return ({
                distance: _.chain(yearEntries)
                  .filter(entry => moment.utc(entry.startDate).get('month') === month)
                  .sumBy('totalDistance')
                  .value(),
                unit: 'km',
                year,
                x: month
              });
            })
            .compact()
            .reduce((result, month) => {
              const total = _.sumBy(result, 'distance');
              result.push({
                ...month,
                y: _.round(total + month.distance)
              });
              return result;
            }, [])
            .value()
      }))
      .value();

    return (
      <div style={{ height: "400px"}}>
        <ResponsiveLine data={cyclingData} margin={{
          "top": 50,
          "right": 110,
          "bottom": 50,
          "left": 60
        }}
        xScale={{
          "type": "point"
        }}
        yScale={{
          "type": "linear",
          "min": "auto",
          "max": "auto"
        }}
        minY="auto"
        maxY="auto"
        stacked={true}
        axisBottom={{
          "orient": "bottom",
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legend": "Month",
          "legendOffset": 36,
          "legendPosition": "center",
          "format": labelFormatter
        }}
        axisLeft={{
          "orient": "left",
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legend": "Kilometers",
          "legendOffset": -40,
          "legendPosition": "center"
        }}
        dotSize={10}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel={true}
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltipFormat={tooltipFormat}
        legends={[
          {
            "anchor": "bottom-right",
            "direction": "column",
            "justify": false,
            "translateX": 100,
            "translateY": 0,
            "itemsSpacing": 0,
            "itemDirection": "left-to-right",
            "itemWidth": 80,
            "itemHeight": 20,
            "itemOpacity": 0.75,
            "symbolSize": 12,
            "symbolShape": "circle",
            "symbolBorderColor": "rgba(0, 0, 0, .5)",
            "effects": [
              {
                "on": "hover",
                "style": {
                  "itemBackground": "rgba(0, 0, 0, .03)",
                  "itemOpacity": 1
                }
              }
            ]
          }
        ]} />
      </div>
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
