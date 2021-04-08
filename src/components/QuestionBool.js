import React from 'react';

class QuestionBool extends React.Component {
  constructor(props) {
    super(props);
    this.addClassName = this.addClassName.bind(this);
    this.state = { addClass: false };
  }

  addClassName({ target }) {
    this.setState({ addClass: true });
  }

  render() {
    const { question, disabled } = this.props;
    const { addClass } = this.state;
    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ disabled }
          className={ addClass ? 'correct-answer' : null }
          onClick={ this.addClassName }
        >
          { question.correct_answer }
        </button>
        <button
          data-testid="wrong-answer"
          type="button"
          disabled={ disabled }
          className={ addClass ? 'wrong-answer' : null }
          onClick={ this.addClassName }
        >
          { question.incorrect_answers[0] }
        </button>
      </div>
    );
  }
}

export default QuestionBool;
