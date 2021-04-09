// const state = {
//   player: {
//     name,
//     assertions,
//     score,
//     gravatarEmail
//   },
//   ranking: [{
//     name: String(),
//     score: Number(),
//     picture: String(),
//   }],
//   token: '',
// };

const initialState = {
  player: {
    name: String(),
    assertions: Number(),
    score: Number(),
    gravatarEmail: String(),
  },
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_PLAYER_NAME':
    return { ...state, player: { ...state.player, name: action.name } };
  case 'SET_PLAYER_ASSERTIONS':
    return { ...state, player: { ...state.player, assertions: action.assertions } };
  case 'SET_PLAYER_SCORE':
    return { ...state, player: { ...state.player, score: action.score } };
  case 'SET_PLAYER_EMAIL':
    return { ...state, player: { ...state.player, email: action.email } };
  default:
    return state;
  }
};

export default player;
