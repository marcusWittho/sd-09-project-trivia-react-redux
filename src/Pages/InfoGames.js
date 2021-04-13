import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementScore, changeStatus } from '../redux/actions/index';
import Header from '../components/Header';
import * as api from '../services/fetchApi';
import Timer from '../components/Timer';

class InfoGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      alternativeRandom: [],
      indice: 0,
      isLoading: true,
      isAnswered: false,
    };
    this.requestAPI = this.requestAPI.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.changeAnswer = this.changeAnswer.bind(this);
    this.randomizeQuestions = this.randomizeQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.requestAPI();
    if (localStorage.getItem('state')) {
      const { dispatchIncrementScore } = this.props;
      const player = JSON.parse(localStorage.getItem('state'));
      const { score } = player;
      dispatchIncrementScore(score);
    }
  }

  getScore() {
    const { questions, indice } = this.state;
    const { timer } = this.props;
    const { difficulty } = questions[indice];
    const questionValue = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    switch (difficulty) {
    case 'hard':
      return (hard * timer) + questionValue;
    case 'medium':
      return (medium * timer) + questionValue;
    case 'easy':
      return (easy * timer) + questionValue;
    default:
      return 0;
    }
  }

  checkAnswer(correctAnswer, event) {
    event.preventDefault();
    const { isAnswered } = this.state;
    const { dispatchIncrementScore, dispatchChangeStatus } = this.props;
    const { target } = event;
    const { innerText: answer } = target;
    if (answer === correctAnswer && !isAnswered) {
      const state = JSON.parse(localStorage.getItem('state'));
      const { assertions, score } = state.player;
      state.player.score = score + this.getScore();
      state.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(state));
      dispatchIncrementScore(state.player.score);
    }
    this.setState({ isAnswered: true });
    dispatchChangeStatus('stop');
  }

  nextQuestion() {
    const { dispatchChangeStatus } = this.props;
    // this.setState((prevState) => ({ indice: prevState.indice + 1, isAnswered: false }));
    this.setState((prevState) => ({ indice: prevState.indice + 1, isAnswered: false }),
      () => {
        const { indice } = this.state;
        const numberOfQuestions = 5;
        if (indice < numberOfQuestions) {
          this.randomizeQuestions();
        }
      });
    dispatchChangeStatus('reset');
  }

  requestAPI() {
    const token = JSON.parse(localStorage.getItem('token'));
    const quantityQuestions = 5;
    api.fetchTrivia(token, quantityQuestions).then((responseRequest) => {
      this.setState({
        questions: responseRequest.results,
        isLoading: false,
      });
      this.randomizeQuestions();
    });
  }

  changeAnswer(alternative, crrQuestion) {
    return alternative === crrQuestion.correct_answer
      ? 'ok' : 'fail';
  }

  randomizeQuestions() {
    const { questions, indice } = this.state;
    const crrQuestion = questions[indice];
    const alternativesOld = crrQuestion.incorrect_answers
      .concat(crrQuestion.correct_answer);
    const numberMagic = 0.5;
    const alternatives = alternativesOld.sort(() => Math.random() - numberMagic);
    this.setState(() => ({
      isAnswered: false,
      alternativeRandom: alternatives,
    }));
  }

  renderQuestions() {
    const { questions, isAnswered, alternativeRandom, indice } = this.state;
    const crrQuestion = questions[indice];
    const { status } = this.props;

    if (status === 'timeout') {
      this.setState({ isAnswered: true });
    }

    return (
      <div>
        <Header />
        <h1 data-testid="question-category">
          {crrQuestion.category}
        </h1>
        <h2 data-testid="question-text">{crrQuestion.question}</h2>
        {alternativeRandom.map((alternative, index) => (
          <button
            disabled={ isAnswered }
            key={ Math.random() }
            type="button"
            value={ alternative }
            onClick={
              (event) => this.checkAnswer(crrQuestion.correct_answer, event)
            }
            className={ isAnswered ? this.changeAnswer(alternative, crrQuestion) : null }
            data-testid={ alternative === crrQuestion.correct_answer ? 'correct-answer'
              : `wrong-answer-${index}` }
          >
            {alternative}
          </button>
        ))}
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
          className={ isAnswered ? 'visible' : 'invisible' }
        >
          Próxima
        </button>
        <Timer />
      </div>
    );
  }

  render() {
    const { isLoading, indice } = this.state;
    const nLimite = 4;
    return (
      isLoading || indice > nLimite ? <p>Loading...</p> : this.renderQuestions()
    );
  }
}

InfoGames.propTypes = {
  dispatchIncrementScore: PropTypes.func.isRequired,
  dispatchChangeStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.timer.status,
  timer: state.timer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchIncrementScore: (localScore) => dispatch(incrementScore(localScore)),
  dispatchChangeStatus: (status) => dispatch(changeStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoGames);
