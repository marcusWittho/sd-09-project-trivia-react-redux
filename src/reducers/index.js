import { combineReducers } from 'redux';
import user from './user';
import trivia from './trivia';

const rootReducer = combineReducers({
  user,
  trivia,
});

export default rootReducer;
