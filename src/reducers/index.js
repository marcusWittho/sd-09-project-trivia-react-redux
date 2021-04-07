import { combineReducers } from 'redux';
import player from './player';
import token from './gameToken';

const reducers = combineReducers({
  player, token,
});

export default reducers;
