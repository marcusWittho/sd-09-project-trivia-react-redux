import React from 'react';
import PropTypes from 'prop-types';

const shuffle = require('knuth-shuffle-seeded');

class Question extends React.Component {
  constructor(props) {
    super(props);
    const { questionData: { correctAnswer, incorrectAnswers, difficulty } } = this.props;
    this.state = {
      disabled: false,
      givenAnswer: -1,
      difficulty,
      scrambledAnswers: shuffle(([correctAnswer]
        .concat(incorrectAnswers)
        .map((answer, index) => ({ answer, index })))),
    };
    this.countScore = this.countScore.bind(this);
  }

  resetButtons() {
    this.setState((state) => ({
      ...state,
      disabled: false,
    }));
  }

  countScore(index) {
    if (index === 0) {
      const { difficulty } = this.state;
      const base = 10;
      const multipliers = {
        hard: 3,
        medium: 2,
        easy: 1,
      };
      const player = JSON.parse(localStorage.getItem('player'));
      player.score += base * (1 + multipliers[difficulty]);
      player.assertions += 1;
      localStorage.setItem('player', JSON.stringify(player));
    }
  }

  renderAternatives() {
    const { scrambledAnswers, givenAnswer, disabled } = this.state;
    return (
      <>
        { scrambledAnswers
          .map((answerObj) => {
            if (givenAnswer >= 0) {
              return (answerObj.index)
                ? Object.assign(answerObj, { feedback: '3px solid rgb(255, 0, 0)' })
                : Object.assign(answerObj, { feedback: '3px solid rgb(6, 240, 15)' });
            }
            return Object.assign(answerObj, { feedback: '3px solid black' });
          })
          .map((answerObj) => (
            <button
              type="button"
              disabled={ disabled }
              key={ answerObj.index }
              data-testid={ (!answerObj.index) ? 'correct-answer' : 'wrong-answer' }
              style={ { border: answerObj.feedback } }
              onClick={ () => {
                this.setState({
                  givenAnswer: answerObj.index,
                  disabled: true });
                // colocar mais coisas aqui
                this.countScore(answerObj.index);
              } }
            >
              { answerObj.answer }
            </button>
          ))}
      </>
    );
  }

  render() {
    const {
      questionData: {
        category,
        type,
        difficulty,
        question,
      },
      enableNextButton,
    } = this.props;
    const { disabled } = this.state;
    if (disabled) enableNextButton();
    return (
      <div className="question">
        <p
          data-testid="question-category"
        >
          { category }
        </p>
        <p
          data-testid="question-text"
        >
          { question }
        </p>
        { this.renderAternatives.bind(this).call() }
        <p>{ type }</p>
        <p>{ difficulty }</p>
      </div>
    );
  }
}

Question.propTypes = {
  questionData: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  enableNextButton: PropTypes.func.isRequired,
};

export default Question;
