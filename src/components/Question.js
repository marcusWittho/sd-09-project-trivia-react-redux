import React from 'react';
import { string, bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { setTimer, setScore } from '../actions';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.setTime = this.setTime.bind(this);
    this.getScore = this.getScore.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.clickNext = this.clickNext.bind(this);
    this.state = {
      addClass: false,
      disabledOptions: false,
      initialTimer: 30,
      nextButton: false,
    };
  }

  componentDidMount() {
    this.setTime();
  }

  setTime() {
    const { updateTimer } = this.props;
    const interval = 1000;
    const timer = setInterval(() => {
      let { timeLeft } = this.props;
      if (timeLeft === 1) {
        clearInterval(timer);
        this.setState({ disabledOptions: true, nextButton: true });
      }
      timeLeft -= 1;
      updateTimer(timeLeft);
    }, interval);
  }

  getDifficultyScore(difficulty) {
    switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return difficulty.length - 1;
    default:
      break;
    }
  }

  getScore() {
    const { timeLeft, updateTotalScore, question: { difficulty } } = this.props;
    const difficultyScore = this.getDifficultyScore(difficulty);
    const baseScore = 10;
    const score = baseScore + (timeLeft * difficultyScore);
    updateTotalScore(score);
  }

  handleAnswerClick({ target }) {
    this.setState({ addClass: true });
    if (target.name === 'correct-answer') this.getScore();
    this.setState({ disabledOptions: true });
  }

  clickNext() {
    const { nextQuestion, updateTimer } = this.props;
    const { initialTimer } = this.state;
    this.setState({ addClass: false, disabledOptions: false });
    nextQuestion();
    updateTimer(initialTimer);
  }

  render() {
    const { question, timeLeft } = this.props;
    const { disabledOptions, addClass, nextButton } = this.state;
    return (
      <div>
        { timeLeft > 0 ? <p>{`Time Left: ${timeLeft}s`}</p> : <p>Time Over!</p> }
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <button
          data-testid="correct-answer"
          name="correct-answer"
          type="button"
          disabled={ disabledOptions }
          className={ addClass ? 'correct-answer' : null }
          onClick={ this.handleAnswerClick }
        >
          { question.correct_answer }
        </button>
        {question.incorrect_answers.map((wrong, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            name="wrong-answer"
            type="button"
            key={ `wrong-answer-${index}` }
            disabled={ disabledOptions }
            className={ addClass ? 'wrong-answer' : null }
            onClick={ this.handleAnswerClick }
          >
            { wrong }
          </button>)) }
        <div>
          { nextButton || addClass ? (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.clickNext }
            >
              Next
            </button>) : null }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: string,
  disabled: bool,
  nextQuestion: func,
  updateTimer: func,
}.isRequired;

const mapStateToProps = ({ trivia }) => ({ timeLeft: trivia.timer });

const mapDispatchToProps = (dispatch) => ({
  updateTimer: (time) => dispatch(setTimer(time)),
  updateTotalScore: (score) => dispatch(setScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
