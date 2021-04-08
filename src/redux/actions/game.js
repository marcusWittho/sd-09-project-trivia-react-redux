export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const requestQuestions = (questions) => ({
  type: REQUEST_QUESTIONS,
  questions,
});

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const requestToken = (token) => ({
  type: REQUEST_TOKEN,
  token,
});

export const UPDATE_INDEX = 'UPDATE_INDEX';
export const updateIndex = (index) => ({
  type: UPDATE_INDEX,
  index,
});
