import { requestToken } from '../../Services/fetchApi';
import { playerLogin } from './playerActions';
import { triviaRequest } from './gameActions';

export {
  playerLogin,
  triviaRequest,
};

export const thunk = () => (
  async (dispatch) => {
    const result = await requestToken();
    return dispatch(result);
  }
);
