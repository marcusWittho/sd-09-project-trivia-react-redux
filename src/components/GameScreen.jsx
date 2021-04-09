import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getQuestions } from '../redux/action';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gravatarEmail: '',
      questions: [],
      numberOFQuestion: 0,
      loading: true,
      timer: 30,
      disabled: false,
      colorQuestion: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.loadingQuestions = this.loadingQuestions.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.clickQuestion = this.clickQuestion.bind(this);
    this.recoveringLocalStorage = this.recoveringLocalStorage.bind(this);
    this.header = this.header.bind(this);
  }

  componentDidMount() {
    this.loadingQuestions();
    this.decreaseTime();
    this.recoveringLocalStorage();
  }

  recoveringLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('state'));
    console.log(storage);
    this.setState({
      name: storage.player.name,
      gravatarEmail: storage.player.gravatarEmail,
    });
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
          });
        }
        this.setState({
          disabled: true,
          timer: 0,
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
      });
    } else {
      this.setState({
        numberOFQuestion: count + 0,
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

  clickQuestion(difficulty) {
    this.setState({ colorQuestion: true });
    console.log(difficulty);
  }

  header() {
    const { name, gravatarEmail } = this.state;
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
        <p data-testid="header-score">Placar: 0</p>
      </header>
    );
  }

  render() {
    const { questions,
      numberOFQuestion, loading, timer, disabled, colorQuestion } = this.state;
    const orderQuestions = questions[numberOFQuestion];

    if (loading) return <h1>Loading...</h1>;

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
          onClick={ () => this.clickQuestion(orderQuestions.difficulty) }
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
