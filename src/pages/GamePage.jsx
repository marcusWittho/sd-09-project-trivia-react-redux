import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { timeStarter } from '../redux/actions';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      allowNextButton: 'none',
      time: 30,
      disabledAnswers: false,
    };

    this.createAnswers = this.createAnswers.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.countDown = this.countDown.bind(this);
    this.makeScore = this.makeScore.bind(this);
    this.saveScoreLocalStorage = this.saveScoreLocalStorage.bind(this);
  }

  saveScoreLocalStorage(points) {
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score += points;
    state.player.assertions = Number(state.player.assertions) + 1;
    return localStorage.setItem('state', JSON.stringify(state));
  }

  makeScore(event) {
    if (event.target.attributes[2].value === 'correct-answer') {
      const difficultyObj = { easy: 1, medium: 2, hard: 3 };
      const { questionNumber, time } = this.state;
      const { questions } = this.props;
      const magic10 = 10;
      const { difficulty } = questions[questionNumber];
      const points = magic10 + (time * difficultyObj[difficulty]);
      return this.saveScoreLocalStorage(points);
    }
  }

  changeAnswerColor() {
    const answers = document.querySelectorAll('#answer');
    answers.forEach((answer) => {
      answer.style.border = '3px solid rgb(255, 0, 0)';
      if (answer.attributes[2].value === 'correct-answer') {
        answer.style.border = '3px solid rgb(6, 240, 15)';
      }
    });
  }

  handleClick(event) {
    this.changeAnswerColor();
    this.setState({ allowNextButton: 'block' });
    if (event) this.makeScore(event);
    this.setState({ disabledAnswers: true });
  }

  createAnswers() {
    const { questionNumber, disabledAnswers } = this.state;
    const { questions, timeOver } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionNumber];

    const arrayOfElements = incorrectAnswers.map((answer) => (
      <button
        id="answer"
        type="button"
        key={ answer }
        data-testid="wrong-answer"
        onClick={ (event) => this.handleClick(event) }
        disabled={ timeOver || disabledAnswers }
        className="App-link"
      >
        {answer}
      </button>
    ));
    arrayOfElements.push(
      <button
        id="answer"
        type="button"
        key={ correctAnswer }
        data-testid="correct-answer"
        onClick={ (event) => this.handleClick(event) }
        disabled={ timeOver || disabledAnswers }
        className="App-link"
      >
        {correctAnswer}
      </button>,
    );
    arrayOfElements.sort();
    return arrayOfElements;
  }

  handleNext(index) {
    const { restartTime } = this.props;
    const answers = document.querySelectorAll('#answer');
    this.setState({
      questionNumber: index + 1,
      allowNextButton: 'none',
      time: 30,
      disabledAnswers: false,
    });
    answers.forEach((answer) => {
      answer.style.border = '';
    });
    restartTime();
  }

  countDown() {
    this.setState((state) => ({
      time: state.time - 1,
    }));
  }

  render() {
    const { questionNumber, allowNextButton, time } = this.state;
    const { questions, isFetching } = this.props;
    const totalIndex = 5;
    if (isFetching) return <div className="App App-header">Loading</div>;

    return (
      <div className="App App-header">
        { questionNumber === totalIndex ? <Redirect to="/feedback" /> : (
          <div className="game-body">
            <div className="stats">
              <Header />
              <Timer
                noClick={ this.handleClick }
                time={ time }
                countDown={ this.countDown }
              />
            </div>
            <div className="game">
              <h2 data-testid="question-category">
                {questions[questionNumber].category}
              </h2>
              <h3 data-testid="question-text">
                {`${questionNumber + 1}. `}
                {questions[questionNumber].question}
              </h3>
              <p>
                {this.createAnswers()}
              </p>
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.handleNext(questionNumber) }
                style={ { display: allowNextButton } }
                className="App-link"
              >
                Next
              </button>
            </div>
          </div>
        ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  isFetching: state.gameReducer.isFetching,
  timeOver: state.gameReducer.timeOver,
});

const mapDispatchToProps = (dispatch) => ({
  restartTime: () => dispatch(timeStarter()),
});

GamePage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
