import { combineReducers } from 'redux';
import scoreReducer from './score';
import getQuestions from './questions';

const rootReducer = combineReducers({ scoreReducer, getQuestions });

export default rootReducer;
