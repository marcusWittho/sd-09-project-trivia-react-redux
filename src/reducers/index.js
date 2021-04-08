import { combineReducers } from 'redux';
import actionsReducer from './actionsReducers';

const rootReducer = combineReducers({
  actionsReducer,
});

export default rootReducer;
