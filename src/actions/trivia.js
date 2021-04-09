import {
  REQUEST_TRIVIA,
  GET_TRIVIA,
  FAILED_TRIVIA_REQUEST,
} from './types';
import { getTriviaQuestions } from '../services';

const requestTrivia = () => ({ type: REQUEST_TRIVIA });

const getTrivia = ({ results }) => ({ type: GET_TRIVIA, payload: results });

const failedTriviaRequest = (error) => ({ type: FAILED_TRIVIA_REQUEST, payload: error });

const fetchTrivia = () => ((dispatch) => {
  dispatch(requestTrivia());
  return getTriviaQuestions()
    .then(
      (json) => dispatch(getTrivia(json)),
      (error) => dispatch(failedTriviaRequest(error)),
    );
});

export default fetchTrivia;
