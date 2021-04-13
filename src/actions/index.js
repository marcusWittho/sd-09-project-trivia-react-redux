export const login = (name, email) => ({ type: 'LOGIN', name, email });
export const setQuestions = (questions) => ({ type: 'SET_QUESTIONS', questions });
export const setTimer = (timeLeft) => ({ type: 'SET_TIMER', timeLeft });
export const setScore = (score) => ({ type: 'SET_SCORE', score });
export const setAssertions = () => ({ type: 'SET_ASSERTIONS' });
export const clearUserData = () => ({ type: 'CLEAR_USER_DATA' });
export const setCategory = (category) => ({ type: 'SET_CATEGORY', category });
export const setDifficulty = (difficulty) => ({ type: 'SET_DIFFICULTY', difficulty });
export const setType = (questionType) => ({ type: 'SET_TYPE', questionType });
