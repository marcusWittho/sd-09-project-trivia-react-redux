import { combineReducers } from 'redux';
import userRegisterReducer from './userRegisterReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  userRegisterReducer,
  tokenReducer,
});

export default rootReducer;
