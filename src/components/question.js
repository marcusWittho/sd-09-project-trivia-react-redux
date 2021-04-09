import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { setNext } from '../redux/actions';
import '../css/questions.css';

class Question extends React.Component {
  constructor(props) {
    const { next } = props;
    super(props);
    this.state = {
      selectedAnswer: null,
      next,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(e) {
    const { propSetNext } = this.props;
    this.setState({ selectedAnswer: e.target });
    await propSetNext();
  }

  render() {
    const { handleAnswer, question: {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      question,
      category,
    } } = this.props;
    const { selectedAnswer } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h2 data-testid="question-text">{question}</h2>
        <button
          data-testid="correct-answer"
          type="button"
          className={ selectedAnswer && 'correct' }
          onClick={ handleAnswer }
        >
          {correctAnswer}
        </button>
        {incorrectAnswers.map((element, i) => (
          <button
            data-testid={ `wrong-answer-${i}` }
            type="button"
            key={ element }
            className={ selectedAnswer && 'incorrect' }
            onClick={ handleAnswer }
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

const mapStateToProps = ({ actionsReducer: { next } }) => ({
  next,
});

const mapDispatchToProps = (dispatch) => ({
  propSetNext: () => dispatch(setNext()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
