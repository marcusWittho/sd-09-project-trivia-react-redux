// import GET_PLAYER_NAME from './actionTypes';
import { GET_TOKEN } from './actionTypes';
import triviaTokenRequest from '../services/api';

export const updateToken = (token) => ({
  type: GET_TOKEN,
  token,
});

function getToken() {
  return (dispatch) => (
    triviaTokenRequest().then((token) => dispatch(updateToken(token)))
  );
}

export default getToken;
