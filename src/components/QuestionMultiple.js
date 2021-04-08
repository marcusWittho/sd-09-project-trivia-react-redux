import React from 'react';

class QuestionMultiple extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <button
          data-testid="correct-answer"
          type="button"
        >
          { question.correct_answer }
        </button>
        {question.incorrect_answers.map((wrong, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            type="button"
            key={ `wrong-answer-${index}` }
          >
            { wrong }
          </button>)) }
      </div>
    );
  }
}

export default QuestionMultiple;
