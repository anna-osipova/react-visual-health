import moment from 'moment/moment';
import _ from 'lodash';

export const generateMonthTicks = (data, dateColumn) => {
  if (!data.length) {
    return [];
  }
  const min = moment.utc(_.minBy(data, dateColumn)[dateColumn]).startOf('month');
  const max = moment.utc(_.maxBy(data, dateColumn)[dateColumn]).endOf('month');
  const ticks = [];
  while (min <= max) {
    ticks.push(min.format('YYYY-MM'));
    min.add(1, 'month');
  }
  return ticks;
};

export const dateMonthFormatter = date => moment.utc(date).format('MMM YYYY');

export const getChartMargin = () => ({
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
});
