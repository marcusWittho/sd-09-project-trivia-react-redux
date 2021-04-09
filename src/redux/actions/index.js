import {
  USER_REGISTER,
  USER_AVATAR,
  USER_SCORE,
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

export const userAvatar = (image) => ({
  type: USER_AVATAR,
  image,
});

export const userScore = (score) => ({
  type: USER_SCORE,
  score,
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
