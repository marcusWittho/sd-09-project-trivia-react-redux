import { combineReducers } from 'redux';
import dataGame from './gameReducer';
import player from './playerReducer';

const rootReducer = combineReducers({ dataGame, player });

export default rootReducer;
