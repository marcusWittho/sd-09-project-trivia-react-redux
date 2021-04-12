import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  updateScoreAssertions as updateScoreAndAssertions,
  updateIndex,
} from '../actions';
import './Question.css';

function embaralhaAlternatives(alternatives) {
  for (let i = alternatives.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [alternatives[i], alternatives[j]] = [alternatives[j], alternatives[i]];
  }
  return alternatives;
}
function defineAnswer(alternative, question) {
  return alternative === question.correct_answer
    ? 'correct-answer' : 'wrong-answer';
}

function getDifficultyValue(difficulty) {
  const value = { hard: 3, medium: 2, easy: 1 };
  return value[difficulty];
}

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.timer = this.timer.bind(this);
    this.renderNextBtn = this.renderNextBtn.bind(this);

    const { question } = props;
    this.state = {
      timeToAnswer: 30,
      step: 1000,
      lastQuestionsIndex: 4,
      showAwnser: false,
      alternatives: embaralhaAlternatives([
        ...question.incorrect_answers, question.correct_answer,

      ]),
    };
  }

  componentDidMount() {
    this.timer();
  }

  answerQuestion(alternative, question, timer) {
    const baseValue = 10;
    let points = 0;
    const { incremanteScore, player } = this.props;

    if (defineAnswer(alternative, question) === 'correct-answer') {
      points = baseValue + (timer * getDifficultyValue(question.difficulty));
      incremanteScore(points, 1);
    }

    incremanteScore(points, 0);
    localStorage.setItem('state', JSON.stringify({ player: { name: player.name,
      assertions: player.assertions,
      score: player.score,
      gravatarEmail: player.email,
    } }));
    this.setState({ showAwnser: true });
  }

  timer() {
    const { timeToAnswer, step } = this.state;
    let timeLimit = timeToAnswer;
    const timeLeft = setInterval(() => {
      this.setState({
        timeToAnswer: timeLimit - 1,
      });
      timeLimit -= 1;
      if (timeLimit === 0) {
        this.setState({
          showAwnser: true,
        });
        clearInterval(timeLeft);
      }
    }, step);
  }

  renderNextBtn() {
    const { index, incremanteIndex } = this.props;
    const { lastQuestionsIndex } = this.state;
    const renderBtn = () => {
      if (index < lastQuestionsIndex) {
        return (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ () => incremanteIndex(index + 1) }
          >
            Próxima
          </button>
        );
      }
      return (
        <Link to="/feedback">
          <button
            data-testid="btn-next"
            type="button"
            onClick={ () => incremanteIndex(index + 1) }
          >
            Próxima
          </button>
        </Link>
      );
    };

    const nextBtn = renderBtn();
    return nextBtn;
  }

  render() {
    const { question, isAnswered } = this.props;
    const { showAwnser, alternatives, timeToAnswer } = this.state;

    return (
      <div>
        <h2 data-testid="question-category">{question.category}</h2>
        <h2 data-testid="question-text">{question.question}</h2>
        <p>{`Timer: ${timeToAnswer}`}</p>
        {alternatives.map((alternative, index) => (
          <div key={ index }>
            <button
              disabled={ showAwnser }
              className={ showAwnser ? defineAnswer(alternative, question) : null }
              type="button"
              data-testid={ defineAnswer(alternative, question) }
              onClick={ () => this.answerQuestion(alternative, question, timeToAnswer) }
            >
              { alternative }

            </button>
          </div>
        ))}
        {(isAnswered || timeToAnswer === 0) && this.renderNextBtn()}
      </div>);
  }
}

Question.propTypes = {
  question: PropTypes.objectOf.isRequired,
  player: PropTypes.objectOf.isRequired,
  incremanteScore: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  incremanteIndex: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  incremanteScore:
    (score, assertions) => dispatch(updateScoreAndAssertions(score, assertions)),
  incremanteIndex: (index) => dispatch(updateIndex(index)),
});

const mapStateToProps = (state) => ({
  player: state.player,
  index: state.player.index,
  isAnswered: state.player.isAnswered,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
