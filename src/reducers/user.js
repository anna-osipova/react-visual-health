import * as types from '../actions/actionTypes';

const user = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { loading: true };
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return action.data;
    case types.LOGIN_FAILURE:
      return {};
    default:
      return state;
  }
};

export default user;
