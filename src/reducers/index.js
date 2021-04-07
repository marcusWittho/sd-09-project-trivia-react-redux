import { combineReducers } from 'redux';
import triviaReducer from './triviaReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  triviaReducer,
  loginReducer,
});

export default rootReducer;
