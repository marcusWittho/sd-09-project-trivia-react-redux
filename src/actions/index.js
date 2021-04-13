export const addLoginInfo = ({ email, name }) => (
  { type: 'ADD_LOGIN_INFO', email, name });

export const addToken = (token) => ({ type: 'ADD_TOKEN', token });

export const sendQuestionsAnswersInfo = (answersAndPosition, questionList) => (
  { type: 'QUESTIONS_ANSWERS_INFO', questionList, answersAndPosition });

export const nextQuestion = () => ({ type: 'NEXT_QUESTION' });

export const configureQuestions = (urlSuffix) => (
  { type: 'CONFIGURE_QUESTIONS', payload: urlSuffix });
