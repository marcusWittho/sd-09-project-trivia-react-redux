import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import score from './score';

const rootReducer = combineReducers({
  user,
  game,
  score,
});

export default rootReducer;
