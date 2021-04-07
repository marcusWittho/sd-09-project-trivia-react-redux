import {
  USER_REGISTER,
  FETCH_TOKEN,
  RETURN_TOKEN,
  ERROR_TOKEN,
} from './actionstype';
import fetchToken from '../../helpers/fetchToken';

export const userRegister = (user, email) => ({
  type: USER_REGISTER,
  user,
  email,
});

export const fetchingToken = () => ({
  type: FETCH_TOKEN,
});

export const returnToken = (dataToken) => ({
  type: RETURN_TOKEN,
  token: dataToken,
});

export const errorToken = (error) => ({
  type: ERROR_TOKEN,
  error,
});

export function fechingTokenToApi() {
  return (dispatch) => {
    dispatch(fetchingToken());
    return fetchToken()
      .then((data) => dispatch(returnToken(data)))
      .catch((error) => dispatch(errorToken(error)));
  };
}
