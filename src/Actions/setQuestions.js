import getQuestions from '../Services/getQuestions';

export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_EXPIRED = 'SET_EXPIRED';
export const SET_LOADING = 'SET_LOADING';

const dispatchQuestions = (questions) => ({
  type: SET_QUESTIONS,
  questions,
});

const dispatchExpired = () => ({
  type: SET_EXPIRED,
});

const dispatchLoading = () => ({
  type: SET_LOADING,
});

export const setQuestions = (token) => async (dispatch) => {
  dispatch(dispatchLoading());
  const magicNumber = 3;
  const questions = await getQuestions(token);
  if (questions.response_code === magicNumber) {
    dispatch(dispatchExpired());
  } else {
    dispatch(dispatchQuestions(questions.results));
  }
};
