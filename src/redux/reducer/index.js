import { combineReducers } from 'redux';
import trivia from './trivia';

const rootReducer = combineReducers({
  trivia,
});

export default rootReducer;
