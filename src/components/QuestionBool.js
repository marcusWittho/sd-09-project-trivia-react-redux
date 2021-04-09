import React from 'react';
import PropTypes from 'prop-types';

class QuestionBool extends React.Component {
  constructor(props) {
    super(props);
    this.addClassName = this.addClassName.bind(this);
    this.clickNext = this.clickNext.bind(this);
    this.state = { addClass: false };
  }

  addClassName() {
    this.setState({ addClass: true });
  }

  clickNext() {
    const { nextQuestion } = this.props;
    this.setState({ addClass: false });
    nextQuestion();
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
        <div>
          { addClass ? (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.clickNext }
            >
              Next
            </button>)
            : null }
        </div>
      </div>
    );
  }
}

QuestionBool.propTypes = {
  question: PropTypes.string,
  disabled: PropTypes.bool,
  nextQuestion: PropTypes.func,
}.isRequired;

export default QuestionBool;
