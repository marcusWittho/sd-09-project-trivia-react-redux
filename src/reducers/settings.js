import { NEW_SETTINGS } from '../actions/types';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
  amount: 5,
};

const settingsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case NEW_SETTINGS:
    return payload;
  default:
    return state;
  }
};

export default settingsReducer;
