import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { setQuestions } from '../Actions/setQuestions';
import '../Styles/GameQuestionsStyle.css';
import Loading from './Loading';

class GameQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      answerClicked: false,
      time: 30,
      userPoints: 0,
      assertions: 0,
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.stopInterval = this.stopInterval.bind(this);
    this.createStore = this.createStore.bind(this);
  }

  componentDidMount() {
    this.handleTime();
    this.createStore();
  }

  componentDidUpdate() {
    this.stopInterval();
  }

  setAnswer(incorrects, correct) {
    const { answerClicked, time } = this.state;
    const buttonQuestionStyles = {
      borderRadius: '5px',
      backgroundColor: 'rgb(153, 209, 153)',
      height: '50px',
      margin: '1px',
      padding: '2px',
      fontSize: '1rem',
    };
    const incorrectsElements = incorrects.map(
      (incorrect, index) => (
        <button
          type="button"
          key={ incorrect }
          data-testid={ `wrong-answer-${index}` }
          name="incorrectAnswer"
          className={ answerClicked ? 'incorrect' : null }
          onClick={ this.handleClick }
          disabled={ time < 1 }
          style={ buttonQuestionStyles }
        >
          {incorrect}
        </button>
      ),
    );
    const correctElement = (
      <button
        type="button"
        data-testid="correct-answer"
        key={ correct }
        name="correctAnswer"
        className={ answerClicked ? 'correct' : null }
        onClick={ this.handleClick }
        disabled={ time < 1 }
        style={ buttonQuestionStyles }
      >
        {correct}
      </button>
    );
    incorrectsElements.splice(2, 0, correctElement);
    return incorrectsElements;
  }

  stopInterval(answered) {
    const { time } = this.state;
    if (time < 1 || answered) {
      clearInterval(this.time);
    }
  }

  createStore() {
    const { name, gravatarEmail } = this.props;
    const { userPoints, assertions } = this.state;
    const state = {
      player: {
        name,
        assertions,
        score: userPoints,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  handleClick({ target }) {
    const { questions } = this.props;
    const { questionNumber, time, userPoints } = this.state;
    let difficulty;
    const hard = 3;
    let points = userPoints;
    const assert = 10;
    switch (questions[questionNumber].difficulty) {
    case 'hard':
      difficulty = hard;
      break;
    case 'medium':
      difficulty = 2;
      break;
    case 'easy':
      difficulty = 1;
      break;
    default:
      difficulty = 0;
    }
    if (target.name === 'correctAnswer') {
      points += assert + (time * difficulty);
      this.setState((previous) => ({
        assertions: previous.assertions + 1,
        userPoints: points,
      }), () => this.createStore());
    }
    this.setState({
      answerClicked: true,
    });
    this.stopInterval(true);
  }

  handleTime() {
    const magicNumber = 990;
    this.time = setInterval(() => {
      this.setState((prev) => ({
        time: prev.time - 1,
      }));
    }, magicNumber);
  }

  handleNext() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const magicNumber = 5;
    if (questionNumber === questions.length - 1) {
      this.setState({
        redirect: true,
      });
      return;
    }
    if (questionNumber < magicNumber) {
      this.setState({
        questionNumber: questionNumber + 1,
        time: 30,
        answerClicked: false,
      }, () => this.handleTime());
    }
  }

  render() {
    const { fetchQuestions, token, loading, questions } = this.props;
    const { questionNumber, time, answerClicked, redirect } = this.state;
    if (loading) {
      fetchQuestions(token);
      return <Loading />;
    }
    if (redirect) return <Redirect to="/feedback" />;
    this.createStore();
    return (
      <div className="form-group">
        {/* <h2 className="question">Pergunta</h2> */}
        <h3 className="timer">
          Tempo:
          { time }
        </h3>
        <p
          data-testid="question-category"
          className="question-category"
        >
          {questions && questions[questionNumber].category}
        </p>
        <p data-testid="question-text" className="question-text">
          {questions && questions[questionNumber].question}
        </p>
        <div
          className="container-questions"
          style={ (questions[questionNumber].incorrect_answers).length !== 1
            ? ({ height: '104px' }) : ({ height: '52px' }) }
        >
          {questions && this.setAnswer(
            questions[questionNumber].incorrect_answers,
            questions[questionNumber].correct_answer,
          )}
        </div>
        { answerClicked && (
          <button
            type="button"
            onClick={ this.handleNext }
            data-testid="btn-next"
            className="btn-next"
          >
            Próxima
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(setQuestions(token)),
});

const mapStateToProps = (state) => ({
  token: state.token.obj.token,
  loading: state.questions.loading,
  questions: state.questions.questions,
  name: state.setUser.name,
  gravatarEmail: state.setUser.email,
});

GameQuestions.propTypes = {
  fetchQuestions: PropTypes.func,
  token: PropTypes.string,
  loading: PropTypes.bool,
  questions: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
