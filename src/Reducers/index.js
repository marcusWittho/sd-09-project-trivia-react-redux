import { combineReducers } from 'redux';
import setUser from './setEmail';
import token from './reducerToken';
import questions from './reducerQuestions';
import configs from './reducerConfigs';

const reducer = combineReducers({
  setUser,
  token,
  questions,
  configs,
});

export default reducer;
