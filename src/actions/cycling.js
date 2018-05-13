import * as types from './actionTypes';
import { get, urls } from '../helpers/api';

export const fetchCyclingData = () => dispatch => {
  dispatch({ type: types.CYCLING_DATA_REQUEST });
  get({
    url: urls.CYCLING,
    success: types.CYCLING_DATA_SUCCESS,
    failure: types.CYCLING_DATA_FAILURE,
    dispatch
  });
};
