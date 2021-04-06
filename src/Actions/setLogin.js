import getToken from '../Services/getToken';

export const SET_TOKEN = 'SET_TOKEN';

const dispatchToken = (obj) => ({
  type: SET_TOKEN,
  obj,
});

export const setToken = () => async (dispatch) => {
  const token = await getToken();
  dispatch(dispatchToken(token));
};
