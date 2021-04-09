import { getAnswer } from '../../services/triviaApi';

export const SET_DATA_GAME = 'SET_DATA_GAME';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';

export const dataGame = (data) => ({
  type: SET_DATA_GAME,
  data,
});

export const handleUserName = (nameInput) => ({
  type: SET_USER_NAME,
  nameInput,
});
export const handleUserEmail = (email) => ({
  type: SET_USER_EMAIL,
  email,
});

export const fetchQuestions = (num, token) => (dispatch) => (
  getAnswer(num, token).then((result) => dispatch(dataGame(result)))
);
