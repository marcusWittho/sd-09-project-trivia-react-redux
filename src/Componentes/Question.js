import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';

function embaralhaAlternatives(alternatives) {
  for (let i = alternatives.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [alternatives[i], alternatives[j]] = [alternatives[j], alternatives[i]];
  }
  return alternatives;
}
function defineAnswer(alternative, question) {
  return alternative === question.correct_answer
    ? 'correct-answer' : 'wrong-answer';
}

class Question extends React.Component {
  constructor(props) {
    super(props);

    const { question } = props;
    this.state = {
      showAwnser: false,
      alternatives: embaralhaAlternatives([
        ...question.incorrect_answers, question.correct_answer,

      ]),
    };
  }

  render() {
    const { question, disableBtn } = this.props;
    const { showAwnser, alternatives } = this.state;

    return (
      <div>
        <h2 data-testid="question-category">{question.category}</h2>
        <h2 data-testid="question-text">{question.question}</h2>

        {alternatives.map((alternative, index) => (
          <div key={ index }>
            <button
              disabled={ showAwnser || disableBtn }
              className={ showAwnser ? defineAnswer(alternative, question) : null }
              type="button"
              data-testid={ defineAnswer(alternative, question) }
              onClick={ () => (this.setState({ showAwnser: true })) }
            >
              { alternative }

            </button>
          </div>
        ))}
      </div>);
  }
}

Question.propTypes = {
  question: PropTypes.objectOf.isRequired,
  disableBtn: PropTypes.objectOf.isRequired,
};

export default Question;
