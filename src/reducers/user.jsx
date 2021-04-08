import { USER_EMAIL, USER_NAME, USER_AVATAR } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  avatar: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  case USER_NAME:
    return {
      ...state,
      name: action.name,
    };
  case USER_AVATAR:
    return {
      ...state,
      avatar: action.avatar,
    };
  default:
    return state;
  }
}
