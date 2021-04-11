import { getToken } from '../services/triviaAPI';
import getQuestions from '../services/triviaAPI_questions';

export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const SAVE_GAME_DATA = 'SAVE_GAME_DATA';
export const RECEIVE_ERROR_TOKEN_API = 'RECEIVE_ERROR_TOKEN_API';
export const RECEIVE_ERROR_GAME_API = 'RECEIVE_ERROR_GAME_API';

const saveUserData = (name, email, token) => ({
  type: SAVE_USER_DATA,
  name,
  email,
  token,
});

const saveGameData = (questions) => ({
  type: SAVE_GAME_DATA,
  questions,
});

const receiveErrorTokenAPI = () => ({ type: RECEIVE_ERROR_TOKEN_API });

const receiveErrorGameAPI = (error) => ({
  type: RECEIVE_ERROR_GAME_API,
  error,
});

export const handleLogin = (name, email) => async (dispatch) => {
  try {
    const token = await getToken();
    localStorage.setItem('token', token);
    return dispatch(saveUserData(name, email, token));
  } catch (err) {
    return dispatch(receiveErrorTokenAPI());
  }
};

export const fetchGameData = (token) => async (dispatch) => {
  try {
    const questions = await getQuestions(token);
    return dispatch(saveGameData(questions));
  } catch (error) {
    return dispatch(receiveErrorGameAPI(error));
  }
};
