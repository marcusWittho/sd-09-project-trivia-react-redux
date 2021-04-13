import { combineReducers } from 'redux';
import user from './user';
import trivia from './trivia';
import settings from './settings';

const rootReducer = combineReducers({
  user,
  trivia,
  settings,
});

export default rootReducer;
