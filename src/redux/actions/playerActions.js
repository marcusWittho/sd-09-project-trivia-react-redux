export const LOGIN = 'LOGIN';
export const playerLogin = (email, name) => ({
  type: LOGIN,
  email,
  name,
});

export const SCORE = 'SCORE';
export const playerScore = (score) => ({
  type: SCORE,
  score,
});
