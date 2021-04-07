import React from 'react';
import { string, shape, arrayOf } from 'prop-types';

const correctAnswer = 'correct-answer';
class MultipleAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.randomAnswer = this.randomAnswer.bind(this);
    this.selectDataTest = this.selectDataTest.bind(this);
    this.handleClcik = this.handleClcik.bind(this);
    this.state = {
      optionAnswers: [],
      correctClass: '',
      wrongClass: '',
    };
  }

  componentDidMount() {
    this.randomAnswer();
  }

  handleClcik() {
    this.setState({
      correctClass: 'correct-answer',
      wrongClass: 'wrong-answer',
    });
  }

  selectDataTest(option, index) {
    const { question } = this.props;
    if (question.correct_answer !== option) {
      return `wrong-answer-${index}`;
    }
    return correctAnswer;
  }

  randomAnswer() {
    const { question } = this.props;
    const optionAnswers = question.incorrect_answers;
    const maxNumber = 4;
    if (optionAnswers.length < maxNumber) {
      optionAnswers
        .splice(Math.floor(Math.random() * maxNumber), 0, question.correct_answer);
      this.setState({
        optionAnswers,
      });
    } else {
      this.setState({
        optionAnswers,
      });
    }
  }

  render() {
    const { optionAnswers, correctClass, wrongClass } = this.state;
    const { question } = this.props;
    let index = 0;
    return (
      <div>
        <div className="question-container">
          <h3 className="question-category" data-testid="question-category">
            { question.category }
          </h3>
          <p data-testid="question-text">{ question.question }</p>
        </div>
        {optionAnswers.map((option) => {
          const dataTestId = this.selectDataTest(option, index);
          if (dataTestId !== correctAnswer) index += 1;
          return (
            <button
              id={ dataTestId }
              className={ dataTestId === correctAnswer ? correctClass : wrongClass }
              type="button"
              key={ option }
              data-testid={ dataTestId }
              onClick={ this.handleClcik }
            >
              { option }
            </button>);
        })}
      </div>
    );
  }
}

MultipleAnswers.propTypes = {
  question: shape({
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }).isRequired,
};

export default MultipleAnswers;
