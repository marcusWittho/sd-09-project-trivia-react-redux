import { combineReducers } from 'redux';
import player from './player';
import token from './gameToken';
import questions from './gameQuestions';

const reducers = combineReducers({
  token,
  questions,
  player, 
  token,
});

export default reducers;
