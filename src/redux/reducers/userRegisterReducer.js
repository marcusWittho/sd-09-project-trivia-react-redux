import {
  USER_REGISTER,
  USER_AVATAR,
  USER_SCORE,
  USER_ASSERTIONS,
} from '../actions/actionstype';

const INITIAL_STATE = {
  user: '',
  email: '',
  image: '',
  score: 0,
  assertions: 0,
};

function userRegisterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_REGISTER:
    return {
      ...state,
      user: action.user,
      email: action.email,
    };
  case USER_AVATAR:
    return {
      ...state,
      image: action.image,
    };
  case USER_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case USER_ASSERTIONS:
    return {
      ...state,
      assertions: action.assertion,
    };
  default:
    return state;
  }
}

export default userRegisterReducer;
