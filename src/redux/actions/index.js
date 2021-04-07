import opentdbApi from '../services/Api';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_NAME_IMAIL = 'SET_NAME_IMAIL';
export const SET_GRAVATAR = 'SET_GRAVATAR';

const setTokenCode = (token) => ({
  type: SET_TOKEN,
  token,
});

export const getToken = () => async (dispatch) => {
  const data = await opentdbApi();
  dispatch(setTokenCode(data));
};

export const setNameAndImail = (name, email) => ({
  type: SET_NAME_IMAIL,
  name,
  email,
});
