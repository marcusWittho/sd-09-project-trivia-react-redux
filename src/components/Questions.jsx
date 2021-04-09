import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addQuestions } from '../Redux/actions';
import { getQuestions } from '../services/Api';
import EachQuestion from './EachQuestion';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      questionAnswered: false,
      selectedAnswer: '',
      time: {},
      seconds: 30,
      hide: true,
    };
    this.dispatchQuestions = this.dispatchQuestions.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.isAnswerCorrect = this.isAnswerCorrect.bind(this);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.createScore = this.createScore.bind(this);
    this.saveScoreAtStorage = this.saveScoreAtStorage.bind(this);
  }

  componentDidMount() {
    this.dispatchQuestions();
    this.startTimer();
  }

  secondsToTime(secs) {
    const obj = {
      s: secs,
    };
    return obj;
  }

  async dispatchQuestions() {
    const { sendQuestionsToRedux } = this.props;
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    sendQuestionsToRedux(questions);
  }

  answerQuestion({ target }) {
    const { value } = target;
    this.setState({
      questionAnswered: true,
      selectedAnswer: value,
      hide: false,
    }, () => this.isAnswerCorrect());
  }

  isAnswerCorrect() {
    const { selectedAnswer } = this.state;
    return selectedAnswer === 'correct-answer';
  }

  saveScoreAtStorage(score) {
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score += score;
    state.player.assertions = Number(state.player.assertions) + 1;
    return localStorage.setItem('state', JSON.stringify(state));
  }

  createScore() {
    const { currentQuestionIndex, seconds } = this.state;
    const { questions } = this.props;
    const questionDifficultyScore = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    let score = 0;
    if (this.isAnswerCorrect()) {
      const scoreConstant = 10;
      const currentQuestionDifficultyScore = questions[currentQuestionIndex].difficulty;
      score = scoreConstant
      + (seconds * questionDifficultyScore[currentQuestionDifficultyScore]);
      return this.saveScoreAtStorage(score);
    }
  }

  startTimer() {
    const { seconds } = this.state;
    const interval = 1000;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, interval);
    }
  }

  countDown() {
    const { seconds, questionAnswered } = this.state;
    if (seconds >= 1) {
      const sec = seconds - 1;
      this.setState({
        time: this.secondsToTime(sec),
        seconds: sec,
      });
    }
    if (seconds === 0 && !questionAnswered) {
      clearInterval(this.timer);
      this.setState({
        hide: false,
      });
      const e = {
        target: {
          value: 'not-answered',
        },
      };
      this.answerQuestion(e);
    }
  }
  // * Source of the Timer`s Algorithm https://stackoverflow.com/questions/40885923/countdown-timer-in-react

  changeQuestion() {
    const { currentQuestionIndex } = this.state;
    const limit = 4;
    if (currentQuestionIndex < limit) {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        seconds: 30,
        hide: true,
        questionAnswered: false,
        selectedAnswer: '',
      }));
    }
  }

  render() {
    const { questions } = this.props;
    const { currentQuestionIndex, questionAnswered, time, hide } = this.state;
    if (!questions) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div>
        <EachQuestion
          questions={ questions }
          questionIndex={ currentQuestionIndex }
          questionAnswered={ questionAnswered }
          answerQuestion={ this.answerQuestion }
          timer={ time.s }
          hide={ hide }
          currentQuestion={ this.changeQuestion }
        />
        <span>
          {time.s}
        </span>
      </div>
    );
  }
}

Questions.propTypes = {
  sendQuestionsToRedux: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.getQuestions.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  sendQuestionsToRedux: (questions) => dispatch(addQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
