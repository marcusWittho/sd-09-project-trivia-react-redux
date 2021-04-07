import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionsReducer from './questionsReducer';

const rootReducers = combineReducers({
  playerReducer,
  questionsReducer,
});

export default rootReducers;
