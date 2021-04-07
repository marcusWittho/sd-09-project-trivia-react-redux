import React from 'react';
import { string, shape, arrayOf } from 'prop-types';

class BooleanAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.selectDataTest = this.selectDataTest.bind(this);
  }

  selectDataTest(option, index) {
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
        <div className="question-container">
          <h3 className="question-category" data-testid="question-category">
            { question.category }
          </h3>
          <p data-testid="question-text">{ question.question }</p>
        </div>
        { answers.map((option) => {
          const dataTestId = this.selectDataTest(option, index);
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

BooleanAnswers.propTypes = {
  question: shape({
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }).isRequired,
};

export default BooleanAnswers;
