import { combineReducers } from 'redux';
import trivia from './trivia';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  trivia,
  gameReducer,
});

export default rootReducer;
