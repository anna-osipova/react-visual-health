import * as types from '../actions/actionTypes';

const cycling = (state = {}, action) => {
  switch (action.type) {
    case types.CYCLING_DATA_SUCCESS:
      return Object.assign({}, state, { data: action.data });
    case types.CYCLING_DATA_FAILURE:
      return Object.assign({}, state, { data: [] });
    default:
      return state;
  }
};

export default cycling;
