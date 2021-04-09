import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { setNext, setSelectedAnswer } from '../redux/actions';
import '../css/questions.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(e) {
    const { propSetNext, handleAnswer, propSelectedAnswer } = this.props;
    handleAnswer();
    await propSelectedAnswer(e.target);
    await propSetNext();
  }

  render() {
    const {
      selectedAnswer,
      question: {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
        question,
        category,
      } } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h2 data-testid="question-text">{question}</h2>
        <button
          data-testid="correct-answer"
          type="button"
          className={ selectedAnswer && 'correct' }
          onClick={ this.handleClick }
        >
          {correctAnswer}
        </button>
        {incorrectAnswers.map((element, i) => (
          <button
            data-testid={ `wrong-answer-${i}` }
            type="button"
            key={ element }
            className={ selectedAnswer && 'incorrect' }
            onClick={ this.handleClick }
          >
            {element}
          </button>
        ))}
      </div>
    );
  }
}

Question.propTypes = {
  handleAnswer: PropTypes.func,
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
    category: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = ({ actionsReducer: { selectedAnswer } }) => ({
  selectedAnswer,
});

const mapDispatchToProps = (dispatch) => ({
  propSetNext: () => dispatch(setNext()),
  propSelectedAnswer: (selectedAnswer) => dispatch(setSelectedAnswer(selectedAnswer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
