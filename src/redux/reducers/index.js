import { combineReducers } from 'redux';
import user from './user';
import score from './score';
import timer from './timer';

const rootReducer = combineReducers({ user, score, timer });

export default rootReducer;
