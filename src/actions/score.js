import { ANSWER_CORRECT } from './types';

const scoreThisCorrectAnswer = (answeredCorrect) => ({
  type: ANSWER_CORRECT,
  payload: answeredCorrect,
});

export default scoreThisCorrectAnswer;
