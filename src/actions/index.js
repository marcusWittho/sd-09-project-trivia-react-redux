import fetchTriviaToken from '../services';

export const NEW_PLAYER = 'NEW_PLAYER';
export const NEW_GAME = 'NEW_GAME';

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
