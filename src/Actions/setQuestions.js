import getQuestions from '../Services/getQuestions';

export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_EXPIRED = 'SET_EXPIRED';

const dispatchQuestions = (questions) => ({
  type: SET_QUESTIONS,
  questions,
});

const dispatchExpired = () => ({
  type: SET_EXPIRED,
});

export const setQuestions = (token) => async (dispatch) => {
  const magicNumber = 3;
  const questions = await getQuestions(token);
  if (questions.response_code === magicNumber) {
    dispatch(dispatchExpired());
  } else {
    dispatch(dispatchQuestions(questions));
  }
};
