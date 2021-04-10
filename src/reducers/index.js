import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
  loginReducer,
  timerReducer,
});

export default rootReducer;
