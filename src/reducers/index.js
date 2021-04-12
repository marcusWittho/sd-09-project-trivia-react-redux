import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import gameReducer from './gameReducer';
import settingsReducer from './settingsReducer';
import rankingReducer from './rankingReducer';

const rootReducer = combineReducers({
  loginReducer,
  gameReducer,
  settingsReducer,
  rankingReducer,
});

export default rootReducer;
