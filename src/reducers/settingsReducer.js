import { SETTING_ACTION } from '../actions/settingsAction';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SETTING_ACTION:
    return { ...state, [action.name]: action.value };
  default:
    return state;
  }
};

export default settingsReducer;
