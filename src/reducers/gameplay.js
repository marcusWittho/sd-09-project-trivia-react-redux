const INITIAL_STATE = {
  questionList: {},
  questionIndex: 0,
  answersAndPosition: {},
};

const QUESTIONS_ANSWERS_INFO = 'QUESTIONS_ANSWERS_INFO';
const NEXT_QUESTION = 'NEXT_QUESTION';

function gameplay(state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTIONS_ANSWERS_INFO:
    return { ...state,
      questionList: action.questionList,
      answersAndPosition: action.answersAndPosition };
  case NEXT_QUESTION:
    console.log('acao para aumentar index', state.questionIndex + 1);
    return { ...state, questionIndex: state.questionIndex + 1 };
  default:
    return { ...state };
  }
}

export default gameplay;
