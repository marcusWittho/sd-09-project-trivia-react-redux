import { combineReducers } from 'redux';
import player from './loginReducer';
import trivia from './triviaReducer';

const rootReducer = combineReducers({
  player,
  trivia,
});

export default rootReducer;
