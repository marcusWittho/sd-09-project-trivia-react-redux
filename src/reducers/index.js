import { combineReducers } from 'redux';
import login from './Login';
import getQuestions from './GetQuestions';

const reducer = combineReducers({ login, getQuestions });

export default reducer;
