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
    };
    this.dispatchQuestions = this.dispatchQuestions.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.isAnswerCorrect = this.isAnswerCorrect.bind(this);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
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
    }, () => this.isAnswerCorrect());
  }

  isAnswerCorrect() {
    const { selectedAnswer } = this.state;
    return selectedAnswer === 'correct-answer';
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
      const e = {
        target: {
          value: 'not-answered',
        },
      };
      this.answerQuestion(e);
    }
  }

  // * Source of the Timer`s Algorithm https://stackoverflow.com/questions/40885923/countdown-timer-in-react

  render() {
    const { questions } = this.props;
    const { currentQuestionIndex, questionAnswered, time } = this.state;
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
