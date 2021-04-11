import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import md5 from 'crypto-js/md5';
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

  componentDidMount() {
    const { name, email } = this.props;
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
      },
    }));
  }

  calculateScore(level) {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { propSetScore, time } = this.props;
    // const { assertions } = this.state;
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

    const points = (player.assertions * correct) + (time + pointsLevel);
    propSetScore(points);
    return points;
  }

  handleClick({ target }) {
    const { propSetNext, handleAnswer, propSelectedAnswer } = this.props;
    console.log(target)
    handleAnswer();
    propSelectedAnswer(target);
    propSetNext();
    this.savePlayerStatus(target);
  }

  savePlayerStatus(target) {
    const { name, token, question: { difficulty } } = this.props;
    const { assertions } = this.state;
    if (target.value === 'correct') {
      this.setState({
        assertions: assertions + 1,
      });
      const { player } = JSON.parse(localStorage.getItem('state'));
      localStorage.setItem('state', JSON.stringify({
        player: {
          name,
          assertions: player.assertions + 1,
          score: this.calculateScore(difficulty),
          gravatarEmail: token,
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
      } } = this.props;
      // console.log(selectedAnswer)
    return (
      <div>
        <h2 data-testid="question-category">{ category }</h2>
        <h2 data-testid="question-text">{ question }</h2>
        <button
          data-testid="correct-answer"
          type="button"
          value="correct"
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

const mapStateToProps = ({ actionsReducer }) => ({
  selectedAnswer: actionsReducer.selectedAnswer,
  name: actionsReducer.name,
  token: actionsReducer.token,
  score: actionsReducer.score,
  email: actionsReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  propSetNext: () => dispatch(setNext()),
  propSelectedAnswer: (selectedAnswer) => dispatch(setSelectedAnswer(selectedAnswer)),
  propSetScore: (points) => dispatch(setScore(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
