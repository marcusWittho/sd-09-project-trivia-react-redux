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

export const TIME_COUNTER = 'TIME_COUNTER';
export const timeCounter = (counter) => ({
  type: TIME_COUNTER,
  counter,
});

export const CORRECT = 'CORRECT';
export const rightAnswers = (number) => ({
  type: CORRECT,
  number,
});

export const WRONG = 'WRONG';
export const wrongAnswers = (number) => ({
  type: WRONG,
  number,
});
