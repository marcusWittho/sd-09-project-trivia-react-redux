import { combineReducers } from 'redux';
import user from './user';
import trivia from './trivia';

const reducer = combineReducers({ user, trivia });

export default reducer;
