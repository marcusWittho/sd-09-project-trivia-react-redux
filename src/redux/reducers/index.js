import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  tokenReducer,
  questionsReducer,
  playerReducer,
});

export default rootReducer;
