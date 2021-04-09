import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services/fetchApis';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  componentDidMount() {
    this.fetchQuest();
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

  handleClick(event) {
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
    this.setState((previousState) => ({
      i: previousState.i + 1,
      isButtonVisible: false,
      shouldDisable: false,
    }));
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

  returnGame() {
    const { questions, i, isButtonVisible, shouldDisable } = this.state;
    const limitIndex = 5;
    if (i === limitIndex) {
      return <Redirect to="/feedback" />;
    }
    const { image } = this.props;
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
          disabled={ shouldDisable }
        >
          {answer}
        </button>
      );
    });

    return (
      <>
        <header>
          <img data-testid="header-profile-picture" src={ image } alt="player avatar" />
          <span data-testid="header-player-name">{player.name}</span>
          <span data-testid="header-score">{player.score}</span>
        </header>
        <span>
          <Link to="/feedback">feedback</Link>
        </span>
        <div>
          <h2 data-testid="question-category">{questions[i].category}</h2>
          <h3 data-testid="question-text">{questions[i].question}</h3>
        </div>
        {this.retunAnswers(negative, answers)}
        { isButtonVisible ? this.returnNextButton() : null}
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      loading === true ? <span>loading...</span> : this.returnGame()
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({
  image: loginReducer.picture,
  questions: loginReducer.questions,
  token: loginReducer.token,
});

Game.propTypes = {
  image: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
