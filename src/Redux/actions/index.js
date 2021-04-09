export const CURRENT_SCORE = 'CURRENT_SCORE';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';

export const currentScore = (score) => ({
  type: CURRENT_SCORE,
  score,
});

export const addQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  questions,
});
