import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import md5 from 'crypto-js/md5';
import { getQuestions } from '../redux/action';

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {
        assertions: '',
        gravatarEmail: '',
        name: '',
        score: 0,
      },
      questions: [],
      numberOFQuestion: 0,
      loading: true,
      timer: 30,
      disabled: false,
      colorQuestion: false,
      nextButton: 'none',
      feedbackScreen: false,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.loadingQuestions = this.loadingQuestions.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.clickQuestion = this.clickQuestion.bind(this);
    this.recoveringLocalStorage = this.recoveringLocalStorage.bind(this);
    this.header = this.header.bind(this);
    this.hitCounter = this.hitCounter.bind(this);
  }

  componentDidMount() {
    this.loadingQuestions();
    this.decreaseTime();
    this.recoveringLocalStorage();
  }

  recoveringLocalStorage() {
    const state = JSON.parse(localStorage.getItem('state'));

    this.setState((previousState) => (
      {
        player: {
          ...previousState.player,
          assertions: state.player.assertions,
          gravatarEmail: state.player.gravatarEmail,
          name: state.player.name,
          score: state.player.score,
        },
      }
    ));
  }

  decreaseTime() {
    const counter = 1000;
    const countQuestions = 4;
    setInterval(() => {
      const { timer, numberOFQuestion } = this.state;
      this.setState({
        timer: timer - 1,
      });
      if (timer === 0) {
        if (numberOFQuestion === countQuestions) {
          this.setState({
            timer: 0,
            nextButton: 'inline',
          });
        }
        this.setState({
          disabled: true,
          timer: 0,
          nextButton: 'inline',
        });
      }
    }, counter);
  }

  nextQuestion() {
    const { questions, numberOFQuestion } = this.state;
    const count = numberOFQuestion;

    if (numberOFQuestion < questions.length - 1) {
      this.setState({
        numberOFQuestion: count + 1,
        timer: 30,
        disabled: false,
        colorQuestion: false,
        nextButton: 'none',
      });
    } else {
      this.setState({
        numberOFQuestion: count + 0,
        colorQuestion: false,
        nextButton: 'none',
        feedbackScreen: true,
      });
    }
  }

  async loadingQuestions() {
    this.setState(
      { loading: true },
      async () => {
        const { getQuestionsAPI } = this.props;
        const response = await getQuestionsAPI(localStorage.getItem('token'));
        this.setState({
          questions: response.questions.results,
          loading: false,
        });
      },
    );
  }

  clickQuestion() {
    this.setState({
      colorQuestion: true,
      nextButton: 'inline',
    });
  }

  hitCounter() {
    const { player: { score } } = this.state;
    const stateScore = score;
    const result = stateScore + 1;

    this.setState((previousState) => (
      {
        player: {
          ...previousState.player,
          score: result,
        },
      }
    ));

    this.clickQuestion();
  }

  header() {
    const { player: { name, gravatarEmail, score } } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt="Gravatar"
        />
        <p data-testid="header-player-name">
          Jogador:
          {name}
        </p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }

  render() {
    const { questions, numberOFQuestion, nextButton, feedbackScreen,
      loading, timer, disabled, colorQuestion } = this.state;
    const orderQuestions = questions[numberOFQuestion];

    if (loading) return <h1>Loading...</h1>;
    if (feedbackScreen) return <Redirect to="/feedback" />;

    return (
      <>
        { this.header() }
        <h3 data-testid="question-category">{orderQuestions.type}</h3>
        <p data-testid="question-text">{orderQuestions.question}</p>
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ disabled }
          style={ (colorQuestion) ? { border: '3px solid rgb(6, 240, 15)' } : {} }
          onClick={ this.hitCounter }
        >
          {orderQuestions.correct_answer}
        </button>
        <div>
          {orderQuestions.incorrect_answers.map((answer, index) => (
            <button
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              type="button"
              disabled={ disabled }
              style={ (colorQuestion) ? { border: '3px solid rgb(255, 0, 0)' } : {} }
              onClick={ this.clickQuestion }
            >
              { answer}
            </button>
          ))}
        </div>
        <p>{timer}</p>
        <button
          data-testid="btn-next"
          type="button"
          style={ { display: `${nextButton}` } }
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </>
    );
  }
}

GameScreen.propTypes = {
  getQuestionsAPI: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getQuestionsAPI: (token) => dispatch(getQuestions(token)),
});

export default connect(null, mapDispatchToProps)(GameScreen);
