export const login = (name, email) => ({ type: 'LOGIN', name, email });
export const setQuestions = (questions) => ({ type: 'SET_QUESTIONS', questions });
export const setTimer = (timeLeft) => ({ type: 'SET_TIMER', timeLeft });
export const setScore = (score) => ({ type: 'SET_SCORE', score });
