import { combineReducers } from 'redux';
import loginReducer from './login';
import questionsReducer from './getQuestionsReducer';
import btnState from './btnStateReducer';

const rootReducer = combineReducers({
  loginReducer,
  questionsReducer,
  btnState,
});

export default rootReducer;
