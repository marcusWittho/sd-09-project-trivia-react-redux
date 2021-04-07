import { ADD_USER_INFO } from '../actions/types';

const INITIAL_STATE = {
  username: '',
  email: '',
};

export default addUserInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return action.payload;
  default:
    return state;
  }
};
