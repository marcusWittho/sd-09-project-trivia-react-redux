import { RANKING_ACTION } from '../actions/rankingAction';

const INITIAL_STATE = {
  players: [],
};

const rankingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RANKING_ACTION:
    return { players: [...state.players, action.player] };
  default:
    return state;
  }
};

export default rankingReducer;
