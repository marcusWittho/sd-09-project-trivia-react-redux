import { combineReducers } from 'redux';
import player from './loginReducer';

const rootReducer = combineReducers({
  player,
});

export default rootReducer;
