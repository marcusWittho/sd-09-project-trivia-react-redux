import {
  FETCH_TOKEN,
  RETURN_TOKEN,
  ERROR_TOKEN,
} from '../actions/actionstype';

const INITIAL_STATE = {
  token: '',
  error: '',
  isFething: false,
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_TOKEN:
    return ({
      ...state,
      isFething: true,
    });
  case RETURN_TOKEN:
    return ({
      ...state,
      token: action.token,
      isFething: false,
    });
  case ERROR_TOKEN:
    return ({
      ...state,
      error: action.error,
      isFething: false,
    });
  default:
    return state;
  }
};

export default tokenReducer;
