import { combineReducers } from 'redux';
import scoreReducer from './score';

const rootReducer = combineReducers({ scoreReducer });

export default rootReducer;
