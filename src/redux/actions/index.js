import {
  playerLogin, rightAnswers, wrongAnswers, timeCounter, playerScore, setZeroState,
} from './player';
import { requestQuestions, requestToken, updateIndex } from './game';
import fecthTrivia from '../../Services/fetchApi';

export {
  playerLogin,
  requestQuestions,
  requestToken,
  updateIndex,
  rightAnswers,
  wrongAnswers,
  timeCounter,
  playerScore,
  setZeroState,
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

export const requestApiQuestions = () => async (dispatch) => {
  dispatch(requestQuestions());
  try {
    const response = await fecthTrivia();
    return dispatch(requestQuestions(response.results));
  } catch (error) {
    return console.log(error);
  }
};
