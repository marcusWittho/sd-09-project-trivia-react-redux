export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const ERROR_CODE = 3;
export const SET_GRAVATAR_IMAGE = 'SET_GRAVATAR_IMAGE';
export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
export const SET_SCORE = 'SET_SCORE';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const RESET_GAME = 'RESET_GAME';

export const requestToken = (token) => ({
  type: REQUEST_TOKEN,
  token,
});

export const requestQuestions = (questions) => ({
  type: REQUEST_QUESTIONS,
  questions,
});

export const setGravatarImage = (emailHash) => ({
  type: SET_GRAVATAR_IMAGE,
  avatar: `https://www.gravatar.com/avatar/${emailHash}`,
});

export const setPlayerName = (name) => ({
  type: SET_PLAYER_NAME,
  name,
});

export const setScore = (points) => ({
  type: SET_SCORE,
  points,
});

export const setAssertions = (increment) => ({
  type: SET_ASSERTIONS,
  increment,
});

export const fetchToken = () => (
  async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const token = await response.json();
      localStorage.setItem('token', token.token);
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
