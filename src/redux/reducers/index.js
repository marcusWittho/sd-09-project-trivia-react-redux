import { combineReducers } from 'redux';
import login from './loginReducer';
import player from './playerReducer';

const rootReducer = combineReducers({ login, player });

export default rootReducer;
