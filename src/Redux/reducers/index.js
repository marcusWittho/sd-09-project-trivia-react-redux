import { combineReducers } from 'redux';
import scoreReducer from './score';
import questions from './questions';

const rootReducer = combineReducers({ scoreReducer, questions });

export default rootReducer;
