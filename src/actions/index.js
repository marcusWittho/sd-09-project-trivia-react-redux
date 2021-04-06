import { LOG_USER, SEND_TOKEN } from './actionTypes';
import fetchToken from '../services/fetchToken';

export const logUserAction = (userInfo) => ({
  type: LOG_USER,
  userInfo,
});

const sendTokenAction = (token) => ({
  type: SEND_TOKEN,
  token,
});

export const getTokenThunk = () => async (dispatch) => {
  const token = await fetchToken();
  dispatch(sendTokenAction(token));
  localStorage.setItem('token', token);
};
