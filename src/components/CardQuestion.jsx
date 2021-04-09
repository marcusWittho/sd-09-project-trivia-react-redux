import React from 'react';
import { Redirect } from 'react-router-dom';
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
      showBtn: false,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.questionCounter = this.questionCounter.bind(this);
    this.nextBtn = this.nextBtn.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  selectAnswer() {
    this.setState({ isSelected: true, showBtn: true });
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
    const { qCounter } = this.state;
    const four = 4;
    if (qCounter === four) {
      return <Redirect to="/feedback" />;
    }
    this.setState((state) => ({
      qCounter: state.qCounter + 1,
      isSelected: false,
      seconds: 30,
      showBtn: false,
    }));
  }

  nextBtn() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.questionCounter }
      >
        Próxima
      </button>);
  }

  render() {
    const { getQuestions: { questions: { results } } } = this.props;
    const { isSelected, time, qCounter, showBtn } = this.state;
    // Constantes criadas para avaliacao do requisito 6. Deleta-las posteriormente.
    const index = qCounter;
    const currentQuestion = results[index];
    const nothing = <div />;
    // return results.map((currentQuestion, index) => (
    return ( // Return de apenas 1 pergunta para avaliacao do requisito 6. Deletar este return quando houver o botao de proxima pergunta.
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
        {showBtn ? this.nextBtn() : nothing}
      </div>
    ); // Deletar essa linha quando usar o map da linha 12.
    // ));
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
});
export default connect(mapStateToProps)(CardQuestion);
