const INITIAL_STATE = {
  score: 0,
};

function scoreReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'INCREMENT_SCORE':
    return {
      score: action.localScore,
    };
  default:
    return state;
  }
}

export default scoreReducer;
