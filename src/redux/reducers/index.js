import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import loginReducer from './loginReducer';
import scoreReducer from './scoreReducer';

const rootReducer = combineReducers({
  tokenReducer,
  loginReducer,
  scoreReducer,
});

export default rootReducer;
