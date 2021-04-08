import React from 'react';
import PropTypes from 'prop-types';

const shuffle = require('knuth-shuffle-seeded');

class Question extends React.Component {
  constructor(props) {
    super(props);
    const { questionData: { correctAnswer, incorrectAnswers } } = this.props;
    this.state = {
      disabled: false,
      givenAnswer: -1,
      scrambledAnswers: shuffle(([correctAnswer]
        .concat(incorrectAnswers)
        .map((answer, index) => ({ answer, index })))),
    };
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
    } = this.props;
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
};

export default Question;
