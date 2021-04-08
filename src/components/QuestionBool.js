import React from 'react';

class QuestionBool extends React.Component {
  render() {
    const { question, disabled } = this.props;
    console.log(disabled);
    console.log(question);
    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ disabled }
        >
          { question.correct_answer }
        </button>
        <button
          data-testid="wrong-answer"
          type="button"
          disabled={ disabled }
        >
          { question.incorrect_answers[0] }
        </button>
      </div>
    );
  }
}

export default QuestionBool;
