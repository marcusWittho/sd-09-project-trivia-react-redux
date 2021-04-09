import { TRIVIA_REQUEST } from '.';
import requestTrivia from '../services/triviaAPI';

const triviaAction = (triviaObject) => ({
  type: TRIVIA_REQUEST,
  triviaObject,
});

const getTrivia = (token) => async (dispatch) => {
  const triviaObject = await requestTrivia(token);

  return dispatch(triviaAction(triviaObject));
};

export default getTrivia;
