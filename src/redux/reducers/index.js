import { combineReducers } from 'redux';
import { actionsReducer, rankingReducer } from './actionsReducer';

const rootReducer = combineReducers({
  actionsReducer,
  rankingReducer,
});

export default rootReducer;
