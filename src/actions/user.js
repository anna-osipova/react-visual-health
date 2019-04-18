import * as types from './actionTypes';
import { post, urls } from '../helpers/api';

export const signup = ({ email, password }) => dispatch => {
  dispatch({ type: types.SIGNUP_REQUEST });
  post({
    url: urls.SIGNUP,
    body: { email, password },
    success: types.SIGNUP_SUCCESS,
    failure: types.SIGNUP_FAILURE,
    dispatch,
  });
};

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: types.LOGIN_REQUEST });
  post({
    url: urls.LOGIN,
    body: { email, password },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch
  });
};

export const logout = () => dispatch => {
  post({
    url: urls.LOGOUT,
    success: types.LOGOUT_SUCCESS,
    failure: types.LOGOUT_FAILURE,
    dispatch
  });
};

export const loginWithToken = () => (dispatch, getState) => {
  const token = getState().user.token;

  if (typeof token === 'undefined') return;

  dispatch({ type: types.LOGIN_REQUEST });
  post({
    url: urls.LOGIN_WITH_TOKEN,
    body: { token },
    success: types.LOGIN_SUCCESS,
    failure: types.LOGIN_FAILURE,
    dispatch,
  });
};
