import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionsReducer from './questionsReducer';
import answersReducer from './answersReducer';

const rootReducers = combineReducers({
  playerReducer,
  questionsReducer,
  answersReducer,
});

export default rootReducers;
