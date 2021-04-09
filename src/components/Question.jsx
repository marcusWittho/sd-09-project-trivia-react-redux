import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import './Question.css';
import { setScore, setAssertions } from '../redux/actions';

const HARD = 3;
const MEDIUM = 2;
const DEFAULT_POINTS = 10;
class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reset: false,
      disableAnswers: false,
      stopTimer: false,
      correctAnswer: '',
      questionDifficulty: '',
      timer: 0,
      answers: [],
    };
    this.getRandomIntInclusive = this.getRandomIntInclusive.bind(this);
    this.renderAlternatives = this.renderAlternatives.bind(this);
    this.toggleNextQuestionButton = this.toggleNextQuestionButton.bind(this);
    this.setResetFalse = this.setResetFalse.bind(this);
    this.disableAnswersButtons = this.disableAnswersButtons.bind(this);
    this.setCorrectAnswerClass = this.setCorrectAnswerClass.bind(this);
    this.setWrongAnswerClass = this.setWrongAnswerClass.bind(this);
    this.createAnswersArray = this.createAnswersArray.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidMount() {
    this.createAnswersArray();
  }

  componentDidUpdate(previousProps) {
    const { question, player } = this.props;
    if (previousProps.question.question !== question.question) this.createAnswersArray();
    if (previousProps.player.score !== player.score) {
      localStorage.setItem('state', JSON.stringify({ player }));
    }
  }

  // by https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setResetFalse() {
    this.setState({ reset: false });
  }

  setCorrectAnswerClass() {
    const { disableAnswers } = this.state;
    if (disableAnswers) {
      return 'correct-answer';
    }
    return 'question';
  }

  setWrongAnswerClass() {
    const { disableAnswers } = this.state;
    if (disableAnswers) {
      return 'wrong-answer';
    }
    return 'question';
  }

  setTimer(timer) {
    this.setState({ timer });
  }

  calculateScore(seclectedAnswer) {
    const { correctAnswer, timer, questionDifficulty } = this.state;
    const { setAssertionsDispatch } = this.props;
    if (seclectedAnswer === correctAnswer) {
      setAssertionsDispatch();
      switch (questionDifficulty) {
      case 'hard':
        return (DEFAULT_POINTS + (timer * HARD));
      case 'medium':
        return (DEFAULT_POINTS + (timer * MEDIUM));
      default:
        return (DEFAULT_POINTS + timer);
      }
    }
    return 0;
  }

  toggleNextQuestionButton({ target }) {
    if (target.id === 'btn-next') {
      target.className = 'invisible-element';
      const { showNextQuestion } = this.props;
      showNextQuestion();
      this.setState({ reset: true, disableAnswers: false, stopTimer: false });
    } else {
      this.disableAnswersButtons();
      const { setScoreDispatch } = this.props;
      const score = this.calculateScore(target.innerText);
      setScoreDispatch(score);
    }
  }

  disableAnswersButtons() {
    this.setState({
      disableAnswers: true,
      stopTimer: true,
    });
    const btn = document.getElementById('btn-next');
    btn.className = 'visible-element';
  }

  reorderAnswers(answers) {
    const ramdomNumberInterval = 0.5;
    return answers.sort(() => ramdomNumberInterval - Math.random());
  }

  createAnswersArray() {
    const { question } = this.props;
    let { answers } = this.state;
    answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    answers = this.reorderAnswers(answers);
    this.setState({
      answers,
      correctAnswer: question.correct_answer,
      questionDifficulty: question.difficulty,
    });
  }

  createAlternatives() {
    const { disableAnswers, answers, correctAnswer } = this.state;
    const answersList = answers.map((answer, index) => {
      if (answer === correctAnswer) {
        return (
          <button
            key={ answer }
            className={ this.setCorrectAnswerClass() }
            onClick={ this.toggleNextQuestionButton }
            type="button"
            data-testid="correct-answer"
            disabled={ disableAnswers }
          >
            { answer }
          </button>
        );
      }
      return (
        <button
          key={ answer }
          className={ this.setWrongAnswerClass() }
          onClick={ this.toggleNextQuestionButton }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          disabled={ disableAnswers }
        >
          { answer }
        </button>
      );
    });
    return answersList;
  }

  renderAlternatives() {
    const answersList = this.createAlternatives();
    if (answersList.length > 0) {
      return (
        <div className="question-alternatives">
          { answersList.map((answer) => answer) }
        </div>
      );
    }
  }

  render() {
    const { question } = this.props;
    const { reset, stopTimer } = this.state;
    return (
      <div className="main-question">
        <div className="question-description">
          <span data-testid="question-category">
            { question.category }
          </span>
          <span data-testid="question-text">
            { question.question }
          </span>
        </div>
        { this.renderAlternatives() }
        <div className="next-question-button">
          <button
            id="btn-next"
            onClick={ this.toggleNextQuestionButton }
            className="button-next"
            type="button"
            data-testid="btn-next"
          >
            Próxima
          </button>
        </div>
        <Timer
          reset={ reset }
          toggleReset={ this.setResetFalse }
          disableAnswers={ this.disableAnswersButtons }
          stopTimer={ stopTimer }
          setTimer={ this.setTimer }
        />
      </div>
    );
  }
}
Question.propTypes = {
  question: PropTypes.shape(),
  showNextQuestion: PropTypes.func,
  setScoreDispatch: PropTypes.func,
  setAssertionsDispatch: PropTypes.func,
  player: PropTypes.shape(),
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.triviaReducer.player,
});

const MapDispatchToProps = (dispatch) => ({
  setScoreDispatch: (points) => dispatch(setScore(points)),
  setAssertionsDispatch: () => dispatch(setAssertions()),
});
export default connect(mapStateToProps, MapDispatchToProps)(Question);
