import { combineReducers } from 'redux';
import user from './user';
import score from './score';

const rootReducer = combineReducers({ user, score });

export default rootReducer;
