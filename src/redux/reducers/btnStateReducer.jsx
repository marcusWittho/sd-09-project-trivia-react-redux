import { BTN_STATE } from '../Actions/actionsType';

const INITIAL_STATE = {
  btnState: false,
};

const btnStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case BTN_STATE:
    return { btnState: action.btnState };
  default:
    return state;
  }
};

export default btnStateReducer;
