import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import md5 from 'crypto-js/md5';
import { setNext, setSelectedAnswer, setScore, setAssertions } from '../redux/actions';
import '../css/questions.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.savePlayerStatus = this.savePlayerStatus.bind(this);
  }

  componentDidMount() {
    const { name, email } = this.props;
    const gravatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatar,
      },
    }));
  }

  pointsLevel(level) {
    const levelStatus = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    let pointsLevel;
    switch (level) {
    case 'easy': {
      pointsLevel = levelStatus.easy;
      break;
    }
    case 'medium': {
      pointsLevel = levelStatus.medium;
      break;
    }
    case 'hard': {
      pointsLevel = levelStatus.hard;
      break;
    }
    default: pointsLevel = 0;
    }
    return pointsLevel;
  }

  calculateScore(level, target, previousScore) {
    const { propSetScore, propSetAssertions, time, assertions } = this.props;
    const correctAnswers = (target.value === 'correct') ? (assertions + 1) : assertions;
    const correct = 10;
    const pointsLevel = this.pointsLevel(level);
    const points = previousScore + (correctAnswers * correct) + (time + pointsLevel);
    propSetScore(points);
    propSetAssertions(correctAnswers);
    return points;
  }

  handleClick({ target }) {
    const { propSetNext, handleAnswer, propSelectedAnswer } = this.props;
    handleAnswer();
    propSelectedAnswer(target);
    propSetNext();
    this.savePlayerStatus(target);
  }

  savePlayerStatus(target) {
    const { name, question: { difficulty } } = this.props;
    if (target.value === 'correct') {
      const { player } = JSON.parse(localStorage.getItem('state'));
      localStorage.setItem('state', JSON.stringify({
        player: {
          name,
          assertions: player.assertions + 1,
          score: this.calculateScore(difficulty, target, player.score),
          gravatar: player.gravatar,
        },
      }));
    }
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
        difficulty,
      } } = this.props;
    return (
      <div className="App-header">
        <h2 data-testid="question-category">{ category }</h2>
        <h2 data-testid="question-text">{ question }</h2>
        <div className="answer-container">
          <button
            data-testid="correct-answer"
            type="button"
            value="correct"
            className={ selectedAnswer && 'correct' }
            onClick={ this.handleClick }
            disabled={ disabled }
            style={ { order: this.pointsLevel(difficulty) } }
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
              style={ { order: i + 1 } }
            >
              { element }
            </button>
          )) }
        </div>
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
    difficulty: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = ({
  actionsReducer: { selectedAnswer, name, score, email, assertions },
  rankingReducer: { token },
}) => ({
  selectedAnswer,
  name,
  token,
  score,
  email,
  assertions,
});

const mapDispatchToProps = (dispatch) => ({
  propSetNext: () => dispatch(setNext()),
  propSelectedAnswer: (selectedAnswer) => dispatch(setSelectedAnswer(selectedAnswer)),
  propSetScore: (points) => dispatch(setScore(points)),
  propSetAssertions: (assertions) => dispatch(setAssertions(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
