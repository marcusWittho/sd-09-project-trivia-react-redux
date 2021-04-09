import { combineReducers } from 'redux';
import dataGame from './gameReducer';
import login from './loginReducer';

const rootReducer = combineReducers({ dataGame, login });

export default rootReducer;
