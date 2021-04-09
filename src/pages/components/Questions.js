import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Api from '../../service/Api';
import '../../styles/components/Questions.css';
import { stopTime } from '../../redux/actions/index';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      question: '',
      difficulty: '',
      alternatives: [],
      correctAnswer: '',
      questionIndex: 0,
      isSelected: false,
      disableAlternatives: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.disableAlternatives = this.disableAlternatives.bind(this);
    this.getDifficulty = this.getDifficulty.bind(this);
    this.UpdateScore = this.UpdateScore.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate(prevProps) {
    const { timesUp } = this.props;
    if (prevProps.timesUp !== timesUp) {
      this.disableAlternatives();
    }
  }

  async getQuestions() {
    const { questionIndex } = this.state;
    const { token } = this.props;
    const questions = await Api.fetchQuestions(token);
    this.setState({
      category: questions[questionIndex].category,
      question: questions[questionIndex].question,
      difficulty: questions[questionIndex].difficulty,
      alternatives: [
        questions[questionIndex].correct_answer,
        ...questions[questionIndex].incorrect_answers,
      ].sort(),
      correctAnswer: questions[questionIndex].correct_answer,
    });
  }

  getDifficulty() {
    const { difficulty } = this.state;
    const number = 0;
    let difficultNumber = number;
    const NUMBER_ONE = 1;
    const NUMBER_TWO = 2;
    const NUMBER_THREE = 3;
    if (difficulty === 'easy') {
      difficultNumber = NUMBER_ONE;
    } else if (difficulty === 'medium') {
      difficultNumber = NUMBER_TWO;
    } else if (difficulty === 'hard') {
      difficultNumber = NUMBER_THREE;
    }
    return difficultNumber;
  }

  UpdateScore() {
    const { seconds } = this.props;
    const NUMBER_THIRTY = 30;
    const secondsLeft = NUMBER_THIRTY - seconds;
    const NUMBER_TEN = 10;
    const player = JSON.parse(localStorage.getItem('player'));
    const { score, assertions } = player;
    let totalScore = score;
    let totalAssertions = assertions;
    const difficulty = this.getDifficulty();
    totalScore = NUMBER_TEN + (secondsLeft * difficulty);
    totalAssertions += 1;
    player.score = totalScore;
    player.assertions = totalAssertions;
    localStorage.setItem('player', JSON.stringify(player));
  }

  handleClick({ target }) {
    const { value } = target;
    const { dispatchStopTime } = this.props;
    if (value === 'correct-answer') {
      this.UpdateScore();
    }
    this.setState({ isSelected: true });
    dispatchStopTime();
    this.disableAlternatives();
  }

  disableAlternatives() {
    this.setState({ disableAlternatives: true });
  }

  render() {
    const {
      category,
      question,
      alternatives,
      correctAnswer,
      isSelected,
      disableAlternatives,
    } = this.state;
    const number = -1;
    let indexQuestion = number;
    return (
      <div>
        <h4 data-testid="question-category">{ category }</h4>
        <p data-testid="question-text">{ question }</p>
        {alternatives.map((alternative, index) => {
          if (alternative === correctAnswer) {
            return (
              <button
                type="button"
                key={ index }
                className={ (isSelected) ? 'correct-answer' : undefined }
                data-testid="correct-answer"
                onClick={ this.handleClick }
                disabled={ disableAlternatives }
                value="correct-answer"
              >
                { alternative }
              </button>);
          }
          indexQuestion += 1;
          return (
            <button
              type="button"
              key={ index }
              className={ (isSelected) ? 'wrong-answer' : undefined }
              data-testid={ `wrong-answer-${indexQuestion}` }
              onClick={ this.handleClick }
              disabled={ disableAlternatives }
              value="wrong-answer"
            >
              { alternative }
            </button>);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginUser.token,
  timesUp: state.timer.timesUp,
  seconds: state.timer.seconds,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchStopTime: () => dispatch(stopTime()),
});

Questions.propTypes = {
  token: PropTypes.string,
  timesUp: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
