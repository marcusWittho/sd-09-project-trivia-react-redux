export const REQUEST_QUESTION = 'REQUEST_QUESTION';
export const REQUEST_QUESTION_SUCCESS = 'REQUEST_QUESTION_SUCESS';

function requestQuestion() {
  return ({
    type: REQUEST_QUESTION,
    loading: true,
  });
}

function requestQuestionSuccess(questions) {
  return ({
    type: REQUEST_QUESTION_SUCCESS,
    loading: false,
    questions,
  });
}

export function fetchQuestions() {
  return async (dispatch) => {
    dispatch(requestQuestion());
    const token = localStorage.getItem('token');
    const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((myQuestions) => myQuestions.results);
    const myQuestions = questions.map((question) => (
      Object.fromEntries(Object.entries(question).map(([key, value]) => {
        if (key === 'correct_answer') return (['correctAnswer', value]);
        if (key === 'incorrect_answers') return (['incorrectAnswers', value]);
        return ([key, value]);
      }))));
    dispatch(requestQuestionSuccess(myQuestions));
  };
}
