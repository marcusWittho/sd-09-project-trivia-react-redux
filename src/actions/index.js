import md5 from 'crypto-js/md5';
import { LOG_USER, SEND_TOKEN } from './actionTypes';
import fetchToken from '../services/fetchToken';

const logUserAction = (userInfo) => ({
  type: LOG_USER,
  userInfo,
});

const sendTokenAction = (token) => ({
  type: SEND_TOKEN,
  token,
});

export default function getTokenThunk({ name, email }) {
  return async (dispatch) => {
    const token = await fetchToken();
    const stateKey = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };

    dispatch(sendTokenAction(token));
    dispatch(logUserAction({ name, email }));

    localStorage.setItem('state', JSON.stringify(stateKey));
    localStorage.setItem('token', token);

    if (!localStorage.getItem('ranking')) localStorage.setItem('ranking', '[]');

    const cryptoEmail = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${cryptoEmail}`;
    const ranking = [
      ...JSON.parse(localStorage.getItem('ranking')),
      { name, score: 0, picture },
    ];

    localStorage.setItem('ranking', JSON.stringify(ranking));
  };
}
