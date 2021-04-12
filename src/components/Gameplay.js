import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { fetchQuestions } from '../services';
import '../CSS/gameplay.css';
import { nextQuestion, sendQuestionsAnswersInfo } from '../actions';

const maxQuestionsIndex = 5;

class Gameplay extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      correct: '',
      incorrect: '',
      renderNextButton: false,
      timer: 30,
      questionIndex: 0,
    };
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.randomAnswersOrder = this.randomAnswersOrder.bind(this);
    this.chooseAnswer = this.chooseAnswer.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.countdownTimer = this.countdownTimer.bind(this);
  }

  async componentDidMount() {
    const { tokenState } = this.props;
    const questionList = await fetchQuestions(tokenState);
    this.randomAnswersOrder(questionList);
    this.countdownTimer();
  }

  countdownTimer() {
    const oneSecond = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer >= 1) {
        this.setState((state) => ({ timer: state.timer - 1 }));
      }
    },
    oneSecond);
  }

  difficultyNumber(difficulty) {
    const hard = 3;
    const medium = 2;
    const easy = 1;
    switch (difficulty) {
    case 'easy':
      return easy;
    case 'medium':
      return medium;
    case 'hard':
      return hard;
    default:
      return 0;
    }
  }

  calculateAnswerPoint() {
    const standardNumber = 10;
    const { timer } = this.state;
    const { questionList, questionIndex } = this.props;
    const { difficulty } = questionList.results[questionIndex];
    const difficultyFactor = this.difficultyNumber(difficulty);
    return standardNumber + (timer * difficultyFactor);
  }

  sumScorePoint(answer) {
    if (answer === 'correct') {
      const previousState = JSON.parse(localStorage.getItem('state'));
      const pointsEarned = this.calculateAnswerPoint();
      previousState.player.score += pointsEarned;
      localStorage.setItem('state', JSON.stringify(previousState));
    }
  }

  chooseAnswer({ target }) {
    this.sumScorePoint(target.name);
    this.setState({
      correct: 'correct',
      incorrect: 'incorrect',
      renderNextButton: true,
    });
  }

  async prepareNextQuestion(nextQuestionDispatch, questionList) {
    // nextQuestionDispatch();
    const { questionIndex } = this.state;
    await this.setState((state) => ({
      timer: 30,
      questionIndex: state.questionIndex + 1,
    }));
    if (questionIndex < maxQuestionsIndex - 1) {
      this.randomAnswersOrder(questionList);
    }
  }

  randomAnswersOrder(questionList) {
    const { questionIndex } = this.state;
    const { sendQuestionsAnswersInfoDispatch } = this.props;
    const currentQuestionInfo = questionList.results[questionIndex];
    const newAnswersList = [...currentQuestionInfo.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * (newAnswersList.length + 1));
    newAnswersList.splice(randomIndex, 0, currentQuestionInfo.correct_answer);
    const answersAndPosition = {
      newAnswersList,
      randomIndex,
    };
    sendQuestionsAnswersInfoDispatch(answersAndPosition, questionList);
    this.setState({
      loading: false,
      correct: '',
      incorrect: '',
    });
  }

  renderQuestion() {
    const { questionList } = this.props;
    const { questionIndex } = this.state;
    const currentQuestionInfo = questionList.results[questionIndex];
    return (
      <section>
        <h1 data-testid="question-category">
          { currentQuestionInfo.category}
        </h1>
        <p data-testid="question-text">
          {questionIndex + 1}
          {' ) '}
          {currentQuestionInfo.question}
        </p>
      </section>
    );
  }

  renderAnswers() {
    const { answersAndPosition } = this.props;
    const { timer } = this.state;
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
                disabled={ timer === 0 }
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
              disabled={ timer === 0 }
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
    const { nextQuestionDispatch, questionList } = this.props;
    return (
      <button
        type="button"
        onClick={ () => this.prepareNextQuestion(nextQuestionDispatch, questionList) }
        data-testid="btn-next"
      >
        Próxima
      </button>
    );
  }

  render() {
    const { loading, renderNextButton, timer, questionIndex } = this.state;
    if (questionIndex === maxQuestionsIndex) {
      return (
        <Redirect to="/feedback" />
      );
    }
    return (
      <main>
        { !loading && this.renderQuestion()}
        { !loading && this.renderAnswers()}
        {!loading && <h2>{ timer }</h2>}
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
  nextQuestionDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);
