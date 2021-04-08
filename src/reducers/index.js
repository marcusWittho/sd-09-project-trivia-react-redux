import { combineReducers } from 'redux';
import player from './player';
import askAndAnswersReducer from './askAndAnswerReducer';
import token from './token';

const rootReducer = combineReducers({
  player,
  askAndAnswersReducer,
  token,
});

export default rootReducer;
