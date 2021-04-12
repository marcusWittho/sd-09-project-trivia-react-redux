import { scoreStorage } from './storage';

const MIN_CORRECT_ANSWER_SCORE = 10;

const SCORE_BY_CATEGORY = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const calcNewScore = (
  { difficulty, timeLeft },
  { score: stateScore },
) => {
  const thisScore = MIN_CORRECT_ANSWER_SCORE
                    + (timeLeft * SCORE_BY_CATEGORY[difficulty]);
  const newScore = stateScore + thisScore;

  scoreStorage(newScore);

  return {
    score: newScore,
  };
};

export default calcNewScore;
