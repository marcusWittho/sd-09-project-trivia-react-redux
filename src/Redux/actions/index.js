export const CURRENT_SCORE = 'CURRENT_SCORE';

export const currentScore = (score) => ({
  type: CURRENT_SCORE,
  score,
});
