import { ADD_USER_INFO, ANSWER_CORRECT } from '../actions/types';

const CORRECT_CONST = 10;
const SCORE_BY_CATEGORY = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const scoreStorage = (stateScore, thisScore) => {
  const { player } = JSON.parse(localStorage.getItem('state'));
  const newScore = stateScore + thisScore;
  const newLocalStorageState = JSON.stringify({
    player: { ...player, score: newScore },
  });
  localStorage.setItem('state', newLocalStorageState);
};

const calcNewScore = ({ difficulty, THISANSWEREDTIMER }, { score: stateScore }) => {
  const thisScore = CORRECT_CONST + THISANSWEREDTIMER * SCORE_BY_CATEGORY[difficulty];
  scoreStorage(stateScore, thisScore);
  return stateScore + thisScore;
};

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const addUserInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return {
      ...state,
      ...action.payload,
    };
  case ANSWER_CORRECT:
    return { ...state, score: calcNewScore(action.payload, state) };
  default:
    return state;
  }
};

export default addUserInfoReducer;
