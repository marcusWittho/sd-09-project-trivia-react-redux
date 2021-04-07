import { RECIVE_TOKEN, REQUEST_TOKEN } from '../action';

const INITAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
    };
  case RECIVE_TOKEN:
    return {
      ...state,
      token: action.token.token,
    };
  default:
    return state;
  }
};

export default tokenReducer;
