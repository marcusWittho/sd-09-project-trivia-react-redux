import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services/fetchApis';
import Timer from '../components/Timer';
import { resetTimerAction } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      difficulty: '',
      loading: true,
      questions: [],
      isButtonVisible: false,
      shouldDisable: false,
      i: 0,
    };

    this.fetchQuest = this.fetchQuest.bind(this);
    this.returnGame = this.returnGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNextQuest = this.handleNextQuest.bind(this);
    this.verifyAnswer = this.verifyAnswer.bind(this);
  }

  componentDidMount() {
    const { resetTimer } = this.props;

    this.fetchQuest();
    resetTimer();
  }

  async fetchQuest() {
    const { token } = this.props;
    const response = await fetchQuestions(token);
    this.setState({
      questions: response,
      loading: false,
    });
  }

  correctAnswer() {
    return 'correct-answer';
  }

  verifyAnswer(event) {
    const { difficulty } = this.state;
    const { timer } = this.props;
    const difficultyValues = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    if (event.target.className === this.correctAnswer()) {
      const stateKey = JSON.parse(localStorage.getItem('state'));
      const updatedStateKey = {
        player: {
          ...stateKey.player,
          assertions: stateKey.player.assertions + 1,
          score: stateKey.player.score + (10 + (timer * difficultyValues[difficulty]))
        },
      };

      localStorage.setItem('state', JSON.stringify(updatedStateKey));
    }
  }

  handleClick(event) {
    this.verifyAnswer(event);

    const { questions, i } = this.state;
    const buttons = event.target.parentNode.children;
    Object.values(buttons).forEach((button) => {
      if (
        button.className === this.correctAnswer()
        || button.className === 'wrong-answer'
      ) {
        button.classList.add(`${button.className}-style`);
      }
    });
    this.setState({
      isButtonVisible: true,
      shouldDisable: true,
      difficulty: questions[i].difficulty,
    });
  }

  retunAnswers(negative, answers) {
    return (
      <div>
        {answers.sort((buttonA, buttonB) => {
          if (buttonA.key > buttonB.key) return 1;
          if (buttonA.key < buttonB.key) return negative;
          return 0;
        })}
      </div>
    );
  }

  handleNextQuest() {
    const { resetTimer } = this.props;

    this.setState((previousState) => ({
      i: previousState.i + 1,
      isButtonVisible: false,
      shouldDisable: false,
    }));

    resetTimer();
  }

  returnNextButton() {
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ this.handleNextQuest }
      >
        Próxima
      </button>
    );
  }

  mountPage({
    image,
    player,
    isButtonVisible,
    questions,
    i,
    negative,
    answers,
    timer,
  }) {
    const { difficulty } = this.state;

    return (
      <>
        <header>
          <img data-testid="header-profile-picture" src={ image } alt="player avatar" />
          <span data-testid="header-player-name">{player.name}</span>
          <span data-testid="header-score">{player.score}</span>
          <span>{ difficulty }</span>
          <div>
            { !isButtonVisible ? <Timer /> : 'Confira sua resposta!'}
          </div>
        </header>
        <span>
          <Link to="/feedback">feedback</Link>
        </span>
        <div>
          <h2 data-testid="question-category">{questions[i].category}</h2>
          <h3 data-testid="question-text">{questions[i].question}</h3>
        </div>
        {this.retunAnswers(negative, answers)}
        { timer <= 0 || isButtonVisible === true ? this.returnNextButton() : null}
      </>
    );
  }

  returnGame() {
    const { questions, i, isButtonVisible, shouldDisable } = this.state;
    const limitIndex = 5;

    if (i === limitIndex) return <Redirect to="/feedback" />;

    const { image, timer } = this.props;
    const negative = -1;
    const { player } = JSON.parse(localStorage.getItem('state'));
    const currentQuestion = questions[i];
    const allQuestions = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ];
    const answers = allQuestions.map((answer, index) => {
      const testId = index === 0 ? this.correctAnswer() : `wrong-answer-${index - 1}`;
      const answerClass = index === 0 ? this.correctAnswer() : 'wrong-answer';

      return (
        <button
          onClick={ this.handleClick }
          className={ answerClass }
          key={ answer }
          type="button"
          data-testid={ testId }
          disabled={ shouldDisable || timer <= 0 }
        >
          {answer}
        </button>
      );
    });

    return (
      this.mountPage({
        image,
        player,
        isButtonVisible,
        questions,
        i,
        negative,
        answers,
        timer,
      })
    );
  }

  render() {
    const { loading } = this.state;
    return (
      loading === true ? <span>loading...</span> : this.returnGame()
    );
  }
}

const mapStateToProps = (state) => ({
  image: state.loginReducer.picture,
  questions: state.loginReducer.questions,
  token: state.loginReducer.token,
  timer: state.timerReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  resetTimer: () => dispatch(resetTimerAction()),
});

Game.propTypes = {
  image: PropTypes.string,
  token: PropTypes.string,
  timer: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
