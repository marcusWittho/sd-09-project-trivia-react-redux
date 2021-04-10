import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { setNext, setSelectedAnswer, setScore } from '../redux/actions';
import '../css/questions.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.savePlayerStatus = this.savePlayerStatus.bind(this);
  }

  handleClick({ target }) {
    const { propSetNext, handleAnswer, propSelectedAnswer } = this.props;
    handleAnswer();
    propSelectedAnswer(target);
    propSetNext();
    this.savePlayerStatus(target);
  }

  savePlayerStatus(target) {
    const { name, score, token, question: { difficulty } } = this.props;
    const { assertions } = this.state;
    if (target.className === 'correct') {
      this.setState({
        assertions: assertions + 1,
      });
      this.calculateScore(difficulty);
    }

    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions,
        score,
        gravatarEmail: token,
      },
    }));
  }

  calculateScore(level) {
    const { propSetScore, time } = this.props;
    const { assertions } = this.state;
    const correct = 10;
    const levelStatus = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    let pointsLevel = 0;

    if (level === 'easy') {
      pointsLevel = levelStatus.easy;
    }

    if (level === 'medium') {
      pointsLevel = levelStatus.medium;
    }

    if (level === 'hard') {
      pointsLevel = levelStatus.hard;
    }

    const points = (assertions * correct) + (time + pointsLevel);
    propSetScore(points);
  }

  render() {
    const {
      disabled,
      selectedAnswer,
      question: {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
        question,
        category,
      } } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{ category }</h2>
        <h2 data-testid="question-text">{ question }</h2>
        <button
          data-testid="correct-answer"
          type="button"
          className={ selectedAnswer && 'correct' }
          onClick={ this.handleClick }
          disabled={ disabled }
        >
          { correctAnswer }
        </button>
        {incorrectAnswers.map((element, i) => (
          <button
            data-testid={ `wrong-answer-${i}` }
            type="button"
            key={ element }
            className={ selectedAnswer && 'incorrect' }
            onClick={ this.handleClick }
          >
            {element }
          </button>
        )) }
      </div>
    );
  }
}

Question.propTypes = {
  disabled: PropTypes.bool,
  handleAnswer: PropTypes.func,
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
    category: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = ({ actionsReducer: { selectedAnswer, name, token, score } }) => ({
  selectedAnswer,
  name,
  token,
  score,
});

const mapDispatchToProps = (dispatch) => ({
  propSetNext: () => dispatch(setNext()),
  propSelectedAnswer: (selectedAnswer) => dispatch(setSelectedAnswer(selectedAnswer)),
  propSetScore: (points) => dispatch(setScore(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
