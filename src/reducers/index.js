import { combineReducers } from 'redux';

import user from './user';
import cycling from './cycling';
import running from './running';

export default combineReducers({ user, cycling, running });
