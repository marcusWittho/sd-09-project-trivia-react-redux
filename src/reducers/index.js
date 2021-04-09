import { combineReducers } from 'redux';
import dummy from './dummy';
import reducer from './saveQuestionsReducer';

const rootReducers = combineReducers({
  dummy,
  reducer,
});

export default rootReducers;
