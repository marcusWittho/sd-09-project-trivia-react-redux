import { GET_PLAYER_NAME, GET_TOKEN } from './actionTypes';

export const updateToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const updatePlayerName = (name) => ({
  type: GET_PLAYER_NAME,
  name,
});
