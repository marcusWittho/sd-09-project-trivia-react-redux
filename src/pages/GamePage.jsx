import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questionNumber: 0 };

    this.createAnswers = this.createAnswers.bind(this);
  }

  createAnswers() {
    const { questionNumber } = this.state;
    const { questions } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionNumber];

    const arrayOfElements = incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        key={ answer }
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.handleClick }
      >
        {answer}
      </button>
    ));
    arrayOfElements.push(
      <button
        type="button"
        key={ correctAnswer }
        data-testid="correct-answer"
        onClick={ this.handleClick }
      >
        {correctAnswer}
      </button>,
    );
    arrayOfElements.sort();
    return arrayOfElements;
  }

  render() {
    const { questionNumber } = this.state;
    const { questions, isFetching } = this.props;
    // return '';
    if (isFetching) {
      return <div>Loading</div>;
    }
    console.log(questions);
    return (
      <div>
        <h2 data-testid="question-category">
          Category:
          {questions[questionNumber].category}
        </h2>
        <h3 data-testid="question-text">
          Question:
          {questions[questionNumber].question}
        </h3>
        <p>
          answer:
          {this.createAnswers()}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  isFetching: state.gameReducer.isFetching,
});

GamePage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(GamePage);
