import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
  tokenReducer,
  questionReducer,
});

export default rootReducer;
