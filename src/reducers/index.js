import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({
  loginReducer,
  mainReducer,
});

export default rootReducer;
