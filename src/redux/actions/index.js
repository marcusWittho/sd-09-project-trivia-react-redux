import { playerLogin } from './player';
import { triviaRequest, requestToken } from './game';

export {
  playerLogin,
  triviaRequest,
  requestToken,
};

export const requestApiToken = () => (
  async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const apiToken = await response.json();
      localStorage.setItem('token', apiToken.token);
      return dispatch(requestToken(apiToken));
    } catch (error) {
      return Error(error);
    }
  }
);
