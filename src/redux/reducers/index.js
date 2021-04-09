import { combineReducers } from 'redux';
import dataGame from './gameReducer';
import login from './loginReducer';
import player from './playerReducer';

const rootReducer = combineReducers({ dataGame, login, player });

export default rootReducer;
