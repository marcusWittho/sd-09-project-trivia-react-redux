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
    const { question: {
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
          onClick={ this.handleClick }
          className={ selectedAnswer && 'correct' }
          // disabled={ next }
        >
          {correctAnswer}
        </button>
        {incorrectAnswers.map((element) => (
          <button
            // data-testid={ `wrong-answer-${i}` }
            data-testid="wrong-answer"
            type="button"
            key={ element }
            onClick={ this.handleClick }
            className={ selectedAnswer && 'incorrect' }
            // disabled={ next }
          >
            {element}
          </button>
        ))}
      </div>
    );
  }
}

Question.propTypes = {
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
