import { LOGIN_ACTION } from '../actions/loginAction';

const INITIAL_STATE = {
  name: '',
  email: '',
  category: [],
  difficulty: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACTION:
    return { ...state, [action.name]: action.value };
  default:
    return state;
  }
};

export default loginReducer;
