import { combineReducers } from 'redux';
import loginUser from './login';
import timer from './timer';
import player from './player';

const rootReducer = combineReducers({ loginUser, timer, player });

export default rootReducer;
