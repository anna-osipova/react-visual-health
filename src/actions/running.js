import * as types from './actionTypes';
import { get, urls } from '../helpers/api';

export const fetchRunningData = () => dispatch => {
  dispatch({ type: types.RUNNING_DATA_REQUEST });
  get({
    url: urls.RUNNING,
    success: types.RUNNING_DATA_SUCCESS,
    failure: types.RUNNING_DATA_FAILURE,
    dispatch
  });
};
