import getQuestions from '../../services/getQuestions';
import { INITIAL_REQUEST, SUCCESS_REQUEST, ERROR_REQUEST } from './actionsType';

const initialRequest = () => ({
  type: INITIAL_REQUEST,
  isFetching: true,
});

const successRequest = (data) => ({
  type: SUCCESS_REQUEST,
  isFetching: false,
  data,
});

const errorRequest = (error) => ({
  type: ERROR_REQUEST,
  isFetching: false,
  error,
});

const getQuestionsApiAction = (token) => (dispatch) => {
  initialRequest();
  getQuestions(token)
    .then(
      (data) => dispatch(successRequest(data)),
      (error) => dispatch(errorRequest(error)),
    );
};

export default getQuestionsApiAction;
