import GET_TOKEN from '../actions';

const INITIAL_STATE = {
  token: '',
};

function actionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return { ...state, token: action.token };
  default: return state;
  }
}

export default actionsReducer;
