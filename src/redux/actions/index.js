export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const ERROR_CODE = 3;

export const requestToken = (token) => ({
  type: REQUEST_TOKEN,
  token,
});

export const requestQuestions = (questions) => ({
  type: REQUEST_QUESTIONS,
  questions,
});

export const fetchToken = () => (
  async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const token = await response.json();
      return dispatch(requestToken(token));
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchQuestions = (token) => (
  async (dispatch) => {
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const response = await fetch(url);
      const questions = await response.json();
      return dispatch(requestQuestions(questions));
    } catch (error) {
      console.log(error);
    }
  }
);
