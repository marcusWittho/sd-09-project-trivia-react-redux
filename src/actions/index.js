import { GET_PLAYER_NAME, GET_PLAYER_EMAIL, GET_TOKEN } from './actionTypes';

export const updateToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const updatePlayerName = (name) => ({
  type: GET_PLAYER_NAME,
  name,
});

export const updatePlayerEmail = (email) => ({
  type: GET_PLAYER_EMAIL,
  email,
});
