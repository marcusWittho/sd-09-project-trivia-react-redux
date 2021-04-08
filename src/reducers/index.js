import { combineReducers } from 'redux';
import token from './gameToken';
import questions from './gameQuestions';

const reducers = combineReducers({
  token,
  questions,
});

export default reducers;
