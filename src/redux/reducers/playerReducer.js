import ADD_GRAVATAR from '../actions/actionTypes';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_GRAVATAR:
    return {
      ...state,
      player: { ...state.player, name: action.name, gravatarEmail: action.gravatarEmail },
    };
  default:
    return state;
  }
};

export default playerReducer;
