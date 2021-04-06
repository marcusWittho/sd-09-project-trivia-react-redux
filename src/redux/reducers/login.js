import { SET_LOGIN } from '../Actions/actionsType';

const INITIAL_STATE = {
  userName: '',
  userEmail: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_LOGIN:
    return { ...state, userName: action.userName, userEmail: action.userEmail };
  default:
    return state;
  }
};

export default loginReducer;
