import { getToken } from '../serviceAPI';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';

export const loginAction = (username, email) => ({
  type: LOGIN,
  payload: {
    username,
    email,
  },
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
