import { combineReducers } from 'redux';
import loginReducer from './login';
import questionsReducer from './getQuestionsReducer';

const rootReducer = combineReducers({
  loginReducer,
  questionsReducer,
});

export default rootReducer;
