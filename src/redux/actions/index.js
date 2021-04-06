import { opentdb } from '../services/Api';

export const GET_TOKEN = 'GET_TOKEN';

export const getTokenCode = (token) => ({
  type: GET_TOKEN,
  token,
});

export const getToken = () => async (dispatch) => {
  const data = await opentdb();
  dispatch(getTokenCode(data));
};
