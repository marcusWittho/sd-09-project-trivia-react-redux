import { ADD_PLAYER } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  score: 0,
  assertions: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
  case ADD_PLAYER:
    return {
      name: action.objectPlayer.name,
      score: action.objectPlayer.score,
      assertions: action.objectPlayer.assertions,
      gravatarEmail: action.objectPlayer.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
