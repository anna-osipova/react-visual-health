import _ from 'lodash';
import * as types from '../actions/actionTypes';

const running = (state = {}, action) => {
  switch (action.type) {
    case types.RUNNING_DATA_SUCCESS:
      return Object.assign({}, state, { data: _.sortBy(action.data, 'startDate') });
    case types.RUNNING_DATA_FAILURE:
      return Object.assign({}, state, { data: [] });
    default:
      return state;
  }
};

export default running;
