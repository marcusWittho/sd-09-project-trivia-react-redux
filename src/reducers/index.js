import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import askAndAnswersReducer from './askAndAnswerReducer';

const rootReducer = combineReducers({
  loginReducer,
  askAndAnswersReducer,
});

export default rootReducer;
