import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  render() {
    const { renderQuestion } = this.props;
    return (
      <div>
        <h3 data-testid="question-category">
          { renderQuestion.category }
        </h3>
        <p data-testid="question-text">
          { renderQuestion.question }
        </p>
        { renderQuestion.incorrect_answers.map((option, index) => (
          <button
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            type="button"
          >
            { option }
          </button>
        )) }
        <button
          type="button"
          data-testid="correct-answer"
        >
          { renderQuestion.correct_answer }
        </button>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  renderQuestion: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default QuestionCard;
