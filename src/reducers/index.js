import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import gameReducer from './gameReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  loginReducer,
  gameReducer,
  settingsReducer,
});

export default rootReducer;
