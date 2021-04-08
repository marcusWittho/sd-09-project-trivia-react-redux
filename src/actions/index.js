import { getToken, getAsks } from '../serviceAPI';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const SAVE_ASKS = 'SAVE_ASKS';
export const SAVE_SCORE = 'SAVE_SCORE';

export const saveScore = (score) => ({
  type: SAVE_SCORE,
  score,
});

export const loginAction = (username, email) => ({
  type: LOGIN,
  username,
  email,
});

export const saveAsks = (asks) => ({
  type: SAVE_ASKS,
  asks,
});

export const tokenAction = (token) => ({
  type: TOKEN,
  token,
});

export const asyncToken = () => (dispatch) => {
  getToken().then((response) => {
    localStorage.setItem('token', response.token);
    dispatch(tokenAction(response.token));
  });
};

export const asyncAsks = (token) => (dispatch) => {
  getAsks(token).then((response) => dispatch(saveAsks(response.results)));
};
