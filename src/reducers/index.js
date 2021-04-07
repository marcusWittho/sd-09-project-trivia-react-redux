import { combineReducers } from 'redux';
import token from './tokenReducer';

const rootReducer = combineReducers({
  token,
});

export default rootReducer;
