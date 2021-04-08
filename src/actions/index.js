import { questionsAPI, tokenAPI } from '../services/api';

export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';

export const saveLoginInfo = (email, nickname) => ({
  type: LOGIN,
  email,
  nickname,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export function fetchToken() {
  return async (dispatch) => {
    const tokenGame = await tokenAPI();
    return dispatch(getToken(tokenGame));
  };
}
