import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      triviaArray: [],
      shuffledArray: [],
      buttonStatus: false,
      error: false,
      position: 0,
      score: 0,
      currentTime: 30,
    };

    this.renderAnswer = this.renderAnswer.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.changeButtonColor = this.changeButtonColor.bind(this);
    this.timerUpdate = this.timerUpdate.bind(this);
    this.timerTimeout = this.timerTimeout.bind(this);
  }

  componentDidMount() {
    const { triviaObject } = this.props;
    const errorCode = 3;

    if (triviaObject) {
      const { response_code: responseCode, results } = triviaObject;

      this.validateResponseFromApi(responseCode, errorCode, results);
    }

    this.timerUpdate();
  }

  timerUpdate() {
    const timer = setInterval(() => {
      const { currentTime } = this.state;
      if(currentTime > 0) {
        this.setState(({ currentTime }) => ({
          currentTime: currentTime - 1
        }))
      } else {
        clearInterval(timer);
        this.timerTimeout();
      }
    }, 1000) 
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
      this.changeButtonColor();
      this.setState({
        buttonStatus: true,
        shuffledArray: [],
      })
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

  renderCorrectAnswer(correctAnswer) {
    const { buttonStatus } = this.state;
    return (
      <button
        type="button"
        key={ correctAnswer }
        data-testid="correct-answer"
        id="correct-awnser"
        disabled={ buttonStatus }
        onClick={ this.changeButtonColor }
      >
        {correctAnswer}
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
        onClick={ this.changeButtonColor }
      >
        { answer }
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
      const shuffledArray = answerArray.sort(() => Math.random() - randomModifier);
    
      this.setState({
        shuffledArray,
      })

      return shuffledArray;
    } else {
      return shuffledArray;
    }
  
  }

  renderQuestion() {
    const { triviaArray, position } = this.state;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = triviaArray[position];
    return (
      <div>
        <span data-testid="question-category">
          {triviaArray[position].category}
        </span>
        <span data-testid="question-text">
          {triviaArray[position].question}
        </span>
        {this.renderAnswer(incorrectAnswers, correctAnswer)}
      </div>
    );
  }

  render() {
    const { error, triviaArray, currentTime } = this.state;
    if (!triviaArray) return <Redirect to="/" />;
    return (
      <div>
        <Header />
        { error || triviaArray.length === 0
          ? <span>Carregando... </span>
          : <div>
            { this.renderQuestion() } 
            <span>Time: { currentTime }</span>
          </div> }
      </div>
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
});

export default connect(mapStateToProps)(Game);
