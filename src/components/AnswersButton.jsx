import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswersButton extends Component {
  render() {
    const {
      allAnswers,
      correct,
      btnState,
      changeClass,
      changeClassCorrectAnswer,
      changeClassAnswer } = this.props;
    return (
      allAnswers.map((answer, index) => {
        if (answer === correct) {
          return (
            <button
              key={ Math.random() }
              type="button"
              data-testid="correct-answer"
              onClick={ changeClassCorrectAnswer }
              disabled={ btnState }
              className={ (changeClass) ? 'correct' : null }
            >
              {answer}
            </button>);
        }
        return (
          <button
            key={ Math.random() }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            disabled={ btnState }
            className={ (changeClass) ? 'incorrect' : null }
            onClick={ changeClassAnswer }
          >
            {answer}
          </button>
        );
      })
    );
  }
}

const { func, string, arrayOf, bool } = PropTypes;

AnswersButton.propTypes = {
  allAnswers: arrayOf(string).isRequired,
  correct: string.isRequired,
  btnState: bool.isRequired,
  changeClass: bool.isRequired,
  changeClassCorrectAnswer: func.isRequired,
  changeClassAnswer: func.isRequired,
};

export default AnswersButton;
