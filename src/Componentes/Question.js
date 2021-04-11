import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateScoreAssertions as updateScoreAndAssertions } from '../actions';
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

    const { question } = props;
    this.state = {
      showAwnser: false,
      alternatives: embaralhaAlternatives([
        ...question.incorrect_answers, question.correct_answer,

      ]),
    };
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

  render() {
    const { question, disableBtn, timer } = this.props;
    const { showAwnser, alternatives } = this.state;

    return (
      <div>
        <h2 data-testid="question-category">{question.category}</h2>
        <h2 data-testid="question-text">{question.question}</h2>

        {alternatives.map((alternative, index) => (
          <div key={ index }>
            <button
              disabled={ showAwnser || disableBtn }
              className={ showAwnser ? defineAnswer(alternative, question) : null }
              type="button"
              data-testid={ defineAnswer(alternative, question) }
              onClick={ () => this.answerQuestion(alternative, question, timer) }
            >
              { alternative }

            </button>
          </div>
        ))}
      </div>);
  }
}

Question.propTypes = {
  question: PropTypes.objectOf.isRequired,
  disableBtn: PropTypes.objectOf.isRequired,
  player: PropTypes.objectOf.isRequired,
  timer: PropTypes.number.isRequired,
  incremanteScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  incremanteScore:
    (score, assertions) => dispatch(updateScoreAndAssertions(score, assertions)),
});

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
