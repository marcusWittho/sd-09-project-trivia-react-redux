// import {
//   FETCHING_TOKEN,
//   TOKEN_SUCCESS,
//   TOKEN_FAILURE,
// } from './actionsTypes';
// import fetchToken from '../services/tokenGenerator';

// export const startFetchToken = () => ({
//   type: FETCHING_TOKEN,
// });

// const successToken = (token) => ({
//   type: TOKEN_SUCCESS,
//   token,
// });

// const failureToken = (error) => ({
//   type: TOKEN_FAILURE,
//   error,
// });

// export const tokenThunk = () => {
//   return (dispatch) => {
//     dispatch(startFetchToken());
//     return fetchToken()
//       .then((data) => dispatch(successToken(data)))
//       .catch((error) => dispatch(failureToken(error)));
//   };
// };
