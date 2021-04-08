import React from 'react';
import PropTypes from 'prop-types';

const shuffle = require('knuth-shuffle-seeded');

class Question extends React.Component {
  scrambleQuestions(correctAnswer, incorrectAnswers) {
    return (
      <>
        { shuffle(([correctAnswer]
          .concat(incorrectAnswers)
          .map((answer, index) => ({ answer, index })))
          .map((answerObj) => (
            <p
              key={ answerObj.index }
              data-testid={ (answerObj.index) ? 'correct-answer' : 'wrong-answer' }
            >
              { answerObj.answer }
            </p>
          )))}
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
        correctAnswer,
        incorrectAnswers,
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
        { this.scrambleQuestions(correctAnswer, incorrectAnswers) }
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
