import { combineReducers } from 'redux';
import userRegisterReducer from './userRegisterReducer';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  userRegisterReducer,
  tokenReducer,
  questionsReducer,
});

export default rootReducer;
