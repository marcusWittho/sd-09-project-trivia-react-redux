import md5 from 'crypto-js/md5';
import { LOG_USER, SEND_TOKEN, UPDATE_TIMER, RESET_TIMER } from './actionTypes';
import { fetchToken } from '../services/fetchApis';

const logUserAction = (userInfo) => ({
  type: LOG_USER,
  userInfo,
});

const sendTokenAction = (token) => ({
  type: SEND_TOKEN,
  token,
});

export const updateTimerAction = () => ({
  type: UPDATE_TIMER,
});

export const resetTimerAction = () => ({
  type: RESET_TIMER,
});

export default function getTokenThunk({ name, email }) {
  return async (dispatch) => {
    const token = await fetchToken();
    const cryptoEmail = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${cryptoEmail}`;

    dispatch(sendTokenAction(token));
    dispatch(logUserAction({ name, email, picture }));

    localStorage.setItem('token', token);

    if (!localStorage.getItem('ranking')) localStorage.setItem('ranking', '[]');

    const ranking = [
      ...JSON.parse(localStorage.getItem('ranking')),
      { name, score: 0, picture },
    ];

    localStorage.setItem('ranking', JSON.stringify(ranking));
  };
}
