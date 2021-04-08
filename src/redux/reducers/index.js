import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';
import loginReducer from './loginReducer';
import scoreReducer from './scoreReducer';

const rootReducer = combineReducers({
  tokenReducer,
  questionsReducer,
  loginReducer,
  scoreReducer,
});

export default rootReducer;
