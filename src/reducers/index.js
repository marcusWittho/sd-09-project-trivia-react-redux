import { combineReducers } from 'redux';

const INITIAL_STATE = {
  token: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'TYPELOGIN':
    return ({
      ...state,
      token: action.value,
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;
