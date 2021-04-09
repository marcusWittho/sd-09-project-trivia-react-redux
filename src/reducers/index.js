import { combineReducers } from 'redux';
import actionsReducer from './actionsReducers';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  actionsReducer,
  playerReducer,
});

export default rootReducer;
