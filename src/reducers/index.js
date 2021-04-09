import { combineReducers } from 'redux';
import login from './Login';
import getQuestions from './GetQuestions';
import ranOutaTime from './ranOutaTime';

const reducer = combineReducers({ login, getQuestions, ranOutaTime });

export default reducer;
