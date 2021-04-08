export const login = (name, email, token) => ({ type: 'LOGIN', name, email, token });
export const setQuestions = (questions) => ({ type: 'SET_QUESTIONS', questions });
