import { combineReducers } from 'redux';
import loginUser from './login';
import timer from './timer';

const rootReducer = combineReducers({ loginUser, timer });

export default rootReducer;
