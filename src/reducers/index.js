import { combineReducers } from 'redux';
import user from './user';
import gameplay from './gameplay';

const rootReducer = combineReducers({ user, gameplay });

export default rootReducer;
