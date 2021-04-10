import { SET_SCORE } from './types';

const CORRECT_CONST = 10;

const SCORE_BY_CATEGORY = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const localScore = (thisScore) => {
  const { player } = JSON.parse(localStorage.getItem('state'));
  const newScore = player.score + thisScore;
  const newState = JSON.stringify({
    player: { ...player, score: newScore },
  });
  localStorage.setItem('state', newState);
};

const calcThisScore = ({ difficulty, timer }) => {
  const thisScore = CORRECT_CONST + timer * SCORE_BY_CATEGORY[difficulty];
  localScore(thisScore);
  return thisScore;
};

const scoreThisCorrectAnswer = (answeredCorrect) => ({
  type: SET_SCORE,
  payload: calcThisScore(answeredCorrect),
});

export default scoreThisCorrectAnswer;
