import { combineReducers } from 'redux';
import setUser from './setEmail';
import token from './reducerToken';
import questions from './reducerQuestions';

const reducer = combineReducers({
  setUser,
  token,
  questions,
});

export default reducer;
