import { SET_CONFIGS } from '../Actions/setConfigs';

const INITIAL_STATE = {
  type: '',
  difficulty: '',
  category: '',
};

const configs = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CONFIGS:
    return {
      ...state,
      type: action.state.type,
      category: action.state.category,
      difficulty: action.state.difficulty,
    };
  default:
    return state;
  }
};

export default configs;
