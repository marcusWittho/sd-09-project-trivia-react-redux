const INITIAL_STATE = {
  timer: 30,
  questionList: {},
  questionIndex: 0,
  answersAndPosition: {},
};

const START_COUNTDOWN = 'START_COUNTDOWN';
const QUESTIONS_ANSWERS_INFO = 'QUESTIONS_ANSWERS_INFO';
const NEXT_QUESTION = 'NEXT_QUESTION';

function gameplay(state = INITIAL_STATE, action) {
  switch (action.type) {
  case START_COUNTDOWN:
    return { ...state, timer: state.timer - action.payload };
  case QUESTIONS_ANSWERS_INFO:
    return { ...state,
      questionList: action.questionList,
      answersAndPosition: action.answersAndPosition };
  case NEXT_QUESTION:
    return { ...state, questionIndex: state.questionIndex + 1 };
  default:
    return { ...state };
  }
}

export default gameplay;
