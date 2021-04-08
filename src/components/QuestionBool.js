import React from 'react';

class QuestionBool extends React.Component {
  render() {
    const { question } = this.props;
    console.log(question);
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
        <button
          data-testid="wrong-answer"
          type="button"
        >
          { question.incorrect_answers[0] }
        </button>
      </div>
    );
  }
}

export default QuestionBool;
