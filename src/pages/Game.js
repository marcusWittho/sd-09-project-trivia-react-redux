import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { scoreAction } from '../actions/playerAction';
import './game.css';
import WaveTop from '../img/wave-top.svg';
import WaveBottom from '../img/wave-bottom.svg';
import QuestionMark from '../img/questao.png';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      triviaArray: [],
      shuffledArray: [],
      buttonStatus: false,
      error: false,
      position: 0,
      currentTime: 30,
    };

    this.renderAnswer = this.renderAnswer.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.changeButtonColor = this.changeButtonColor.bind(this);
    this.timerUpdate = this.timerUpdate.bind(this);
    this.timerTimeout = this.timerTimeout.bind(this);
    this.addScore = this.addScore.bind(this);
  }

  componentDidMount() {
    const { triviaObject } = this.props;
    const errorCode = 3;
    if (triviaObject) {
      const { response_code: responseCode, results } = triviaObject;
      this.validateResponseFromApi(responseCode, errorCode, results);
      this.saveStateOnStorage();
    }
    this.timerUpdate();
  }

  componentDidUpdate() {
    this.saveStateOnStorage();
  }

  timerUpdate() {
    const intervalTime = 1000;
    const timer = setInterval(() => {
      const { currentTime } = this.state;
      if (currentTime > 0) {
        this.setState({
          currentTime: currentTime - 1,
        });
      } else {
        clearInterval(timer);
        this.timerTimeout();
      }
    }, intervalTime);
  }

  changeButtonColor() {
    const correctAnswerButton = document.getElementById('correct-awnser');
    const wrongAnswersButtons = document.querySelectorAll('.wrong-answer');
    correctAnswerButton.style.border = '3px solid rgb(6, 240, 15)';
    wrongAnswersButtons.forEach((button) => {
      button.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  timerTimeout() {
    const { currentTime } = this.state;
    this.changeButtonColor();
    this.setState({
      buttonStatus: true,
      shuffledArray: [],
    });

    if (currentTime !== 0) {
      this.setState({
        currentTime: 0,
      });
    }
  }

  validateResponseFromApi(responseCode, errorCode, results) {
    if (responseCode === errorCode) {
      this.setState({
        error: true,
      });
    }
    this.setState({
      triviaArray: results,
      error: false,
    });
  }

  addScore() {
    const { triviaArray, position, currentTime } = this.state;
    const { scoreDispatch } = this.props;
    const { difficulty } = triviaArray[position];
    const baseScore = 10;
    const maxScore = 3;
    let difficultyValue;
    if (difficulty === 'easy') difficultyValue = 1;
    else if (difficulty === 'medium') difficultyValue = 2;
    else difficultyValue = maxScore;
    const score = baseScore + (currentTime * difficultyValue);

    scoreDispatch(score);
  }

  saveStateOnStorage() {
    const { state } = this.props;
    localStorage.setItem('state', JSON.stringify(state));
  }

  renderCorrectAnswer(correctAnswer) {
    const { buttonStatus } = this.state;
    return (
      <button
        type="button"
        key={ correctAnswer }
        data-testid="correct-answer"
        id="correct-awnser"
        disabled={ buttonStatus }
        onClick={ () => {
          this.changeButtonColor();
          this.timerTimeout();
          this.addScore();
        } }
      >
        { correctAnswer }
      </button>
    );
  }

  renderIncorrectAnswers(incorrectAnswers) {
    const { buttonStatus } = this.state;
    return incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        key={ answer }
        data-testid={ `wrong-answer-${index}` }
        disabled={ buttonStatus }
        className="wrong-answer"
        onClick={ () => {
          this.changeButtonColor();
          this.timerTimeout();
        } }
      >
        {answer}
      </button>
    ));
  }

  renderAnswer(incorrectAnswers, correctAnswer) {
    const incorrectButtons = this.renderIncorrectAnswers(incorrectAnswers);
    const correctButton = this.renderCorrectAnswer(correctAnswer);
    const answerArray = [...incorrectButtons, correctButton];
    const { shuffledArray } = this.state;
    const randomModifier = 0.5;

    if (shuffledArray.length === 0) {
      answerArray.sort(
        () => Math.random() - randomModifier,
      );

      this.setState({
        shuffledArray: answerArray,
      });

      return answerArray;
    }
    return shuffledArray;
  }

  renderQuestion() {
    const { triviaArray, position } = this.state;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = triviaArray[position];
    return (
      <div>
        <span className="question-category" data-testid="question-category">
          { triviaArray[position].category }
        </span>
        <span className="question" data-testid="question-text">
          { triviaArray[position].question }
        </span>
        <div className="answerButton">
          { this.renderAnswer(incorrectAnswers, correctAnswer) }
        </div>
      </div>
    );
  }

  render() {
    const { error, triviaArray, currentTime } = this.state;
    if (!triviaArray) return <Redirect to="/" />;
    return (
      <section className="game-section">
        <Header />
        <img className="question-Mark-left" src={ QuestionMark } alt="wave" />
        <section className="card-container">
          <img className="wave-top" src={ WaveTop } alt="wave" />
          <div className="game-card">
            { error || triviaArray.length === 0 ? (
              <span>Carregando... </span>
            ) : (
              <div>
                {this.renderQuestion()}
                <span>
                  Time:
                  {currentTime}
                </span>
              </div>
            ) }
          </div>
          <img className="wave-bottom" src={ WaveBottom } alt="wave" />
        </section>
        <img className="question-Mark-right" src={ QuestionMark } alt="wave" />
      </section>
    );
  }
}

Game.propTypes = {
  triviaObject: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(Object),
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  triviaObject: state.trivia.triviaObject,
  state,
});

const mapDispatchToProps = (dispatch) => ({
  scoreDispatch: (score) => dispatch(scoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
