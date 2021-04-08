import { combineReducers } from 'redux';
import login from './login';

const rootReducer = combineReducers({ login });
// // Configure os seus reducers.
// // ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

export default rootReducer;
