import {
  FETCH_QUESTION,
  RETURN_QUESTION,
  ERROR_QUESTION,
} from './actionstype';
import fetchQuestions from '../../helpers/fetchQuestions';
import shuffleOptions from '../../helpers/shuffleOptions';

export const fetchingQuestions = () => ({
  type: FETCH_QUESTION,
});

export const returnQuestions = (data) => ({
  type: RETURN_QUESTION,
  questions: data,
});

export const errorQuestions = (error) => ({
  type: ERROR_QUESTION,
  error,
});

export function fetchingQuestionsToApi(token) {
  return (dispatch) => {
    dispatch(fetchingQuestions());
    return fetchQuestions(token)
      .then((data) => shuffleOptions(data))
      .then((data) => dispatch(returnQuestions(data)))
      .catch((error) => dispatch(errorQuestions(error)));
  };
}
