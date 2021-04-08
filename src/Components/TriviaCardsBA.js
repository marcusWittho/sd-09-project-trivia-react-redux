import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BooleanAnwers extends Component {
  constructor(props) {
    super(props);
    this.validateAnswers = this.validateAnswers.bind(this);
  }

  validateAnswers(option, index) {
    const { question } = this.props;
    if (question.correct_answer !== option) {
      return `wrong-answer-${index}`;
    }
    return 'correct-answer';
  }

  render() {
    const { question } = this.props;
    const answers = ['True', 'False'];
    const index = 0;
    return (
      <div>
        <div>
          <h3 data-testid="question-category">
            { question.category }
          </h3>
          <p data-testid="question-text">{ question.question }</p>
        </div>
        { answers.map((option) => {
          const dataTestId = this.validateAnswers(option, index);
          return (
            <button
              type="button"
              key={ option }
              data-testid={ dataTestId }
            >
              { option }
            </button>);
        })}
      </div>
    );
  }
}

BooleanAnwers.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default BooleanAnwers;
