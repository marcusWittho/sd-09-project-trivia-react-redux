import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CardQuestion.css';

class CardQuestion extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      qCounter: 0,
      isSelected: false,
      time: {},
      seconds: 30,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.recordScore = this.recordScore.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.questionCounter = this.questionCounter.bind(this);
    this.nextBtn = this.nextBtn.bind(this);
  }

  componentDidMount() {
    this.startTimer();
    this.setLocalStorage();
  }

  setLocalStorage() {
    const { name, email } = this.props;
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        email,
      },
    };
    return localStorage.setItem('state', JSON.stringify(state));
  }

  getLocalStorage() {
    const valid = localStorage.getItem('state');
    if (valid !== null) {
      console.log(valid);
      return JSON.parse(valid);
    }
  }

  selectAnswer(event) {
    const { seconds } = this.state;
    this.setState({ isSelected: true });
    const button = document.getElementsByClassName('next-btn');
    button[0].style.display = 'inline';
    this.recordScore(event.target.innerText, seconds);
  }

  calculateScore(sec, difficulty) {
    let sum = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const base = 10;
    if (difficulty === 'easy') {
      sum = base + (sec * easy);
      return sum;
    }
    if (difficulty === 'medium') {
      sum = base + (sec * medium);
      return sum;
    }
    if (difficulty === 'hard') {
      sum = base + (sec * hard);
      return sum;
    }
  }

  recordScore(answer, sec) {
    const { getQuestions: { questions: { results } } } = this.props;
    //  Trocar essa const index pelo contador que a Mayara fez
    const index = 0;
    const currentQuestion = results[index];
    const state = this.getLocalStorage();
    if (answer === currentQuestion.correct_answer) {
      state.player.assertions += 1;
      state.player.score += this.calculateScore(sec, currentQuestion.difficulty);
      console.log('teste');
      return localStorage.setItem('state', JSON.stringify(state));
    }
  }

  secondsToTime(secs) {
    const obj = {
      s: secs,
    };
    return obj;
  }

  startTimer() {
    const { seconds } = this.state;
    const TIME_INTERVAL = 1000;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, TIME_INTERVAL);
    }
  }

  countDown() {
    const { seconds } = this.state;
    if (seconds >= 1) {
      const sec = seconds - 1;
      this.setState({
        time: this.secondsToTime(sec),
        seconds: sec,
      });
    }
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  questionCounter() {
    this.setState((state) => ({
      qCounter: state.qCounter + 1,
      isSelected: false,
      seconds: 30,
    }));
  }

  nextBtn() {
    const { qCounter } = this.state;
    const four = 4;
    if (qCounter === four) {
      return (
        <Link to="/feedback">
          <button
            type="button"
            className="next-btn"
            data-testid="btn-next"
          >
            Próxima
          </button>
        </Link>);
    }
    return (
      <button
        type="button"
        className="next-btn"
        data-testid="btn-next"
        onClick={ this.questionCounter }
      >
        Próxima
      </button>);
  }

  render() {
    const { getQuestions: { questions: { results } } } = this.props;
    const { isSelected, time, qCounter } = this.state;
    const questions = results.map((currentQuestion, index) => (
      <div key={ index }>
        <div>
          {time.s}
        </div>
        <h2 data-testid="question-category">{currentQuestion.category}</h2>
        <p data-testid="question-text">{currentQuestion.question}</p>
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ time.s === 0 }
          className={ isSelected || time.s === 0 ? 'correctAnswer' : '' }
          onClick={ this.selectAnswer }
        >
          {currentQuestion.correct_answer}
        </button>
        {currentQuestion.incorrect_answers.map((incorrectAnswer, answerIndex) => (
          <button
            data-testid={ `wrong-answer-${answerIndex}` }
            key={ answerIndex }
            className={ isSelected || time.s === 0 ? 'wrongAnswer' : '' }
            type="button"
            disabled={ time.s === 0 }
            onClick={ this.selectAnswer }
          >
            {incorrectAnswer}
          </button>
        ))}
        {this.nextBtn()}
      </div>
    ));
    // Retornar uma questão por vez.
    return questions[qCounter];
  }
}
CardQuestion.propTypes = {
  getQuestions: PropTypes.shape({
    loading: PropTypes.bool,
    questions: PropTypes.shape({
      response_code: PropTypes.number,
      results: PropTypes.arrayOf(Object),
    }),
  }),
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
CardQuestion.defaultProps = {
  getQuestions: PropTypes.shape({
    loading: PropTypes.bool,
    questions: PropTypes.shape({
      response_code: PropTypes.number,
      results: PropTypes.arrayOf(Object),
    }),
  }),
};
const mapStateToProps = (state) => ({
  getQuestions: state.questions,
  name: state.player.name,
  email: state.player.email,
});
export default connect(mapStateToProps)(CardQuestion);
