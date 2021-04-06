import { combineReducers } from 'redux';
import userRegisterReducer from './userRegisterReducer';

const rootReducer = combineReducers({
  userRegisterReducer,
});

export default rootReducer;
