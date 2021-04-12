import { questionsRequest } from '../services/api';
import { GET_PLAYER_NAME, GET_PLAYER_EMAIL, GET_TOKEN,
  GET_QUESTIONS, UPDATE_INDEX, UPDATE_SCORE_ASSERTIONS,
  RESET_PLAYER, RESET_REQUEST } from './actionTypes';

export const updateToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const updateIndex = (index) => ({
  type: UPDATE_INDEX,
  index,
});

export const updateScoreAssertions = (score, assertions) => ({
  type: UPDATE_SCORE_ASSERTIONS,
  score,
  assertions,
});

export const updatePlayerName = (name) => ({
  type: GET_PLAYER_NAME,
  name,
});

export const updatePlayerEmail = (email) => ({
  type: GET_PLAYER_EMAIL,
  email,
});

export const updateQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export function fetchQuestions(token) {
  return (dispatch) => (
    questionsRequest(token)
      .then((data) => dispatch(updateQuestions(data)))
  );
}

export const resetPlayer = () => ({
  type: RESET_PLAYER,
});

export const resetRequest = () => ({
  type: RESET_REQUEST,
});
