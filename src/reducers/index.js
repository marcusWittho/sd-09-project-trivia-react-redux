import { combineReducers } from 'redux';
import triviaReducer from './triviaReducer';

const rootReducer = combineReducers({
  triviaReducer,
});

export default rootReducer;
