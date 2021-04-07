import { fetchQuestResponse } from '../../Services/fetchApi';
import { playerLogin } from './playerActions';
import { triviaRequest } from './gameActions';

export {
  playerLogin,
  triviaRequest,
};

export const thunk = () => (
  async (dispatch) => {
    const result = await fetchQuestResponse();
    return dispatch(result);
  }
);
