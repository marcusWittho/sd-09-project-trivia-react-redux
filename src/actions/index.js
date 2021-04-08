import { getToken } from '../services/triviaAPI';

export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const RECEIVE_ERROR_TOKEN_API = 'RECEIVE_ERROR_TOKEN_API';

const saveUserData = (name, email, token) => ({
  type: SAVE_USER_DATA,
  name,
  email,
  token,
});

const receiveErrorTokenAPI = () => ({ type: RECEIVE_ERROR_TOKEN_API });

export const handleLogin = (name, email) => async (dispatch) => {
  try {
    const token = await getToken();
    localStorage.setItem('token', token);
    return dispatch(saveUserData(name, email, token));
  } catch (err) {
    return dispatch(receiveErrorTokenAPI());
  }
};
