import { combineReducers } from 'redux';
import actionsReducer from './actionsReducer';

const rootReducer = combineReducers({
  actionsReducer,
});

export default rootReducer;
