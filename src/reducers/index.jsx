import { combineReducers } from 'redux';
import user from './user';
import receiveToken from './receiveToken';

const rootReducer = combineReducers({
  user,
  receiveToken,
});

export default rootReducer;
