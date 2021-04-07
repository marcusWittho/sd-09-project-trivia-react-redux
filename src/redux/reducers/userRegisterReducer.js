import { USER_REGISTER } from '../actions/actionstype';

const INITIAL_STATE = {
  user: '',
  email: '',
};

function userRegisterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_REGISTER:
    return {
      ...state,
      user: action.user,
      email: action.email,
    };
  default:
    return state;
  }
}

export default userRegisterReducer;
