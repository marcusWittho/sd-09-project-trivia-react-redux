import React from 'react';
import { connect } from 'react-redux';
import { string, objectOf } from 'prop-types';
import { fetchQuestions } from '../actions';

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getQuestions: true,
      category: '',
      question: '',
      correctAnswer: '',
      incorrectAnswers: '',
      styleObj: {},
      timer: 30,
      disableBtn: false,
    };

    this.showAnswers = this.showAnswers.bind(this);
    this.tictac = this.tictac.bind(this);
  }

  componentDidUpdate() {
    const { getQuestions } = this.state;
    if (getQuestions) {
      this.setQuestionsToEstate();
    }
  }

  setQuestionsToEstate() {
    const { questions: { results } } = this.props;
    this.setState({
      getQuestions: false,
      category: results[0].category,
      question: results[0].question,
      correctAnswer: results[0].correct_answer,
      incorrectAnswers: results[0].incorrect_answers,
    });
    this.timeOut();
  }

  timeOut() {
    const ONE_SECOND = 1000;
    this.temporizador = setInterval(this.tictac, ONE_SECOND);
  }

  tictac() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState({ timer: timer - 1 });
    }
    if (timer === 0) {
      clearInterval(this.temporizador);
      this.setState({ disableBtn: true });
    }
  }

  showAnswers() {
    this.setState({
      styleObj: {
        correct: {
          border: '3px solid',
          borderColor: 'rgb(6, 240, 15)' },
        incorrect: {
          border: '3px solid',
          borderColor: 'rgb(255, 0, 0)' },
      },
    });
  }

  render() {
    const { loading } = this.props;
    const {
      category,
      question,
      correctAnswer,
      incorrectAnswers,
      styleObj,
      timer,
      disableBtn,
    } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      // <div></div>
      <div>
        <h3>{ timer }</h3>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          style={ styleObj.correct }
          onClick={ this.showAnswers }
          type="button"
          data-testid="correct-answer"
          disabled={ disableBtn }
        >
          { correctAnswer }
        </button>
        {incorrectAnswers && incorrectAnswers.map((incorrectAnswer) => (
          <button
            style={ styleObj.incorrect }
            onClick={ this.showAnswers }
            type="button"
            key={ incorrectAnswer }
            data-testid="wrong-answer"
            disabled={ disableBtn }
          >
            { incorrectAnswer }
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token.token,
  questions: state.loginReducer.questions,
  loading: state.loginReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(fetchQuestions(token)),
});

MainBody.propTypes = {
  loading: string,
  questions: objectOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);
