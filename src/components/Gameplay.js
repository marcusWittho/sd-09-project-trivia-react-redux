import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services';
import '../CSS/gameplay.css';
import Timer from './Timer';
import { nextQuestion, sendQuestionsAnswersInfo } from '../actions';

class Gameplay extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      correct: '',
      incorrect: '',
      renderNextButton: false,
    };
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.randomAnswersOrder = this.randomAnswersOrder.bind(this);
    this.chooseAnswer = this.chooseAnswer.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
  }

  async componentDidMount() {
    const { tokenState } = this.props;
    const questionList = await fetchQuestions(tokenState);
    this.randomAnswersOrder(questionList);
  }

  chooseAnswer() {
    this.setState({
      correct: 'correct',
      incorrect: 'incorrect',
      renderNextButton: true,
    });
  }

  randomAnswersOrder(questionList) {
    const { questionIndex, sendQuestionsAnswersInfoDispatch } = this.props;
    console.log(questionList);
    const questions = { ...questionList };
    const currentQuestionInfo = questions.results[questionIndex];
    const answersList = currentQuestionInfo.incorrect_answers;
    const correctAnswer = currentQuestionInfo.correct_answer;
    const randomIndex = Math.floor(Math.random() * (answersList.length + 1));
    const newAnswersList = [...answersList];
    newAnswersList.splice(randomIndex, 0, correctAnswer);
    const answersAndPosition = {
      newAnswersList,
      randomIndex,
    };
    sendQuestionsAnswersInfoDispatch(answersAndPosition, questions);
    this.setState({
      loading: false,
      correct: '',
      incorrect: '',
    });
  }

  renderQuestion() {
    const { questionList, questionIndex } = this.props;
    const currentQuestionInfo = questionList.results[questionIndex];
    return (
      <section>
        <h1 data-testid="question-category">
          { currentQuestionInfo.category}
        </h1>
        <p data-testid="question-text">{currentQuestionInfo.question}</p>
      </section>
    );
  }

  renderAnswers() {
    const { answersAndPosition, timer } = this.props;
    const { newAnswersList, randomIndex } = answersAndPosition;
    const { correct, incorrect } = this.state;
    return (
      <section>
        { newAnswersList.map((answer, index) => {
          if (randomIndex === index) {
            return (
              <button
                data-testid="correct-answer"
                onClick={ this.chooseAnswer }
                name="correct"
                disabled={ timer < 0 }
                className={ correct }
                type="button"
              >
                {answer}
              </button>);
          }
          return (
            <button
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.chooseAnswer }
              name="incorrect"
              className={ incorrect }
              disabled={ timer < 0 }
              key={ index }
              type="button"
            >
              {answer}
            </button>
          );
        })}
      </section>
    );
  }

  renderNextButton() {
    const { nextQuestionDispatch } = this.props;
    return (
      <button type="button" onClick={ nextQuestionDispatch }>Próxima</button>
    );
  }

  render() {
    const { loading, renderNextButton } = this.state;
    return (
      <main>
        { !loading && this.renderQuestion()}
        { !loading && this.renderAnswers()}
        { !loading && <Timer />}
        { renderNextButton && this.renderNextButton()}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenState: state.user.token,
  questionList: state.gameplay.questionList,
  questionIndex: state.gameplay.questionIndex,
  answersAndPosition: state.gameplay.answersAndPosition,
  timer: state.gameplay.timer,
});

const mapDispatchToProps = (dispatch) => ({
  sendQuestionsAnswersInfoDispatch: (answerAndPosition, questionList) => (
    dispatch(sendQuestionsAnswersInfo(answerAndPosition, questionList))),
  nextQuestionDispatch: () => dispatch(nextQuestion()),
});

Gameplay.propTypes = {
  tokenState: PropTypes.string.isRequired,
  questionList: PropTypes.shape({
    results: PropTypes.shape([]).isRequired,
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
  answersAndPosition: PropTypes.shape({
    newAnswersList: PropTypes.shape().isRequired,
    randomIndex: PropTypes.shape().isRequired,
  }).isRequired,
  sendQuestionsAnswersInfoDispatch: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  nextQuestionDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);
