import { SET_USER } from '../Actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const setUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  default:
    return state;
  }
};

export default setUser;
