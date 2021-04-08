import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  tokenReducer,
  questionsReducer,
});

export default rootReducer;
