import {
  fetchTriviaToken,
  fetchTriviaQuestions,

} from '../services';

export const NEW_PLAYER = 'NEW_PLAYER';
export const NEW_GAME = 'NEW_GAME';
export const GAME_QUESTIONS = 'GAME_QUESTIONS';
export const LOADING_QUESTIONS = 'LOADING_QUESTIONS';

export const newPlayerInfo = (name, email) => ({
  type: NEW_PLAYER,
  name,
  email,
});

const receiveToken = (gameToken) => ({
  type: NEW_GAME,
  gameToken,
});

export function fetchNewGameToken() {
  return async (dispatch) => {
    const newGame = await fetchTriviaToken();
    return dispatch(receiveToken(newGame));
  };
}

const receiveQuestions = (gameQuestions) => ({
  type: GAME_QUESTIONS,
  gameQuestions,
});

const loadingQuestions = () => ({
  type: LOADING_QUESTIONS,
  payload: true,
});

export function fetchGameQuestions(token) {
  return async (dispatch) => {
    dispatch(loadingQuestions());
    const gameQuestions = await fetchTriviaQuestions(token);

    return dispatch(receiveQuestions(gameQuestions));
  };
}
