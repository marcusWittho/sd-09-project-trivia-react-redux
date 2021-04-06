import { combineReducers } from 'redux';
import setUser from './setEmail';
import token from './reducerToken';

const reducer = combineReducers({
  setUser,
  token,
});

export default reducer;
