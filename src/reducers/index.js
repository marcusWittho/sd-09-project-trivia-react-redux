import { combineReducers } from 'redux';
import player from './playerReducer';
import data from './questionReducer';

const rootReducer = combineReducers({
  player,
  data,
});

export default rootReducer;
