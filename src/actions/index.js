import fetchTriviaToken from '../services';

export const NEW_GAME = 'NEW_GAME';

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
